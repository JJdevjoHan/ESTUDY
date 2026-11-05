package com.csit321g3.powertres.estudy;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

/** Walks through the User Account and Role-Based Access use cases against the real application. */
@SpringBootTest
@AutoConfigureMockMvc
class AccountAccessIntegrationTest {

    @Autowired
    MockMvc mvc;

    private String json(String... pairs) {
        StringBuilder sb = new StringBuilder("{");
        for (int i = 0; i < pairs.length; i += 2) {
            sb.append(i > 0 ? "," : "").append('"').append(pairs[i]).append("\":\"").append(pairs[i + 1]).append('"');
        }
        return sb.append('}').toString();
    }

    private String register(String role, String name, String email, String schoolId) throws Exception {
        String body = mvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content(json("role", role, "fullName", name, "email", email,
                                "schoolId", schoolId, "password", "Password1")))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.user.role").value(role))
                .andReturn().getResponse().getContentAsString();
        return JsonPath.read(body, "$.token");
    }

    private String login(String identifier, String password) throws Exception {
        String body = mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(json("email", identifier, "password", password)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        return JsonPath.read(body, "$.token");
    }

    @Test
    void registerLoginAndProfile() throws Exception {
        register("student", "Ana Maria Reyes", "ana@school.edu", "2024-0001");
        String token = login("ana@school.edu", "Password1");

        mvc.perform(get("/api/users/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fName").value("Ana Maria"))
                .andExpect(jsonPath("$.lName").value("Reyes"))
                .andExpect(jsonPath("$.password").doesNotExist());

        // the username (school ID) works as the login too
        login("2024-0001", "Password1");

        mvc.perform(put("/api/users/me").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json("fName", "Ana", "lName", "Reyes", "email", "ana@school.edu", "section", "BSIT-2A")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.section").value("BSIT-2A"));
    }

    @Test
    void wrongPasswordDuplicateAndAnonymous() throws Exception {
        register("teacher", "Maria Santos", "maria@school.edu", "T-1001");

        mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(json("email", "maria@school.edu", "password", "WrongPass1")))
                .andExpect(status().isUnauthorized());

        mvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content(json("role", "student", "fullName", "Other Person", "email", "MARIA@school.edu",
                                "schoolId", "S-2", "password", "Password1")))
                .andExpect(status().isConflict());

        mvc.perform(get("/api/users/me")).andExpect(status().isUnauthorized());
    }

    @Test
    void rolesAreSeparated() throws Exception {
        String student = register("student", "Sam Student", "sam@school.edu", "2024-0100");
        String teacher = register("teacher", "Tina Teacher", "tina@school.edu", "T-2000");
        String admin = login("admin@estudy.local", "Admin12345");

        mvc.perform(get("/api/student/home").header("Authorization", "Bearer " + student)).andExpect(status().isOk());
        mvc.perform(get("/api/teacher/home").header("Authorization", "Bearer " + student)).andExpect(status().isForbidden());
        mvc.perform(get("/api/admin/users").header("Authorization", "Bearer " + student)).andExpect(status().isForbidden());
        mvc.perform(get("/api/admin/users").header("Authorization", "Bearer " + teacher)).andExpect(status().isForbidden());
        mvc.perform(get("/api/teacher/home").header("Authorization", "Bearer " + teacher)).andExpect(status().isOk());
        mvc.perform(get("/api/admin/users").header("Authorization", "Bearer " + admin))
                .andExpect(status().isOk());
        mvc.perform(get("/api/admin/roles").header("Authorization", "Bearer " + admin))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3));
    }

    @Test
    void adminManagesAccounts() throws Exception {
        String admin = login("admin@estudy.local", "Admin12345");
        String body = mvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content(json("role", "student", "fullName", "Paolo Cruz", "email", "paolo@school.edu",
                                "schoolId", "2024-0200", "password", "Password1")))
                .andReturn().getResponse().getContentAsString();
        Integer id = JsonPath.read(body, "$.user.id");
        String oldToken = JsonPath.read(body, "$.token");

        // assign role: the old student token now belongs to a teacher
        mvc.perform(put("/api/admin/users/" + id + "/role").header("Authorization", "Bearer " + admin)
                        .contentType(MediaType.APPLICATION_JSON).content(json("role", "teacher")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role").value("teacher"))
                .andExpect(jsonPath("$.fName").value("Paolo"));
        mvc.perform(get("/api/teacher/home").header("Authorization", "Bearer " + oldToken)).andExpect(status().isOk());
        mvc.perform(get("/api/student/home").header("Authorization", "Bearer " + oldToken)).andExpect(status().isForbidden());

        // disable: the token stops working and login is refused
        mvc.perform(put("/api/admin/users/" + id + "/status").header("Authorization", "Bearer " + admin)
                        .contentType(MediaType.APPLICATION_JSON).content("{\"enabled\":false}"))
                .andExpect(status().isOk());
        mvc.perform(get("/api/users/me").header("Authorization", "Bearer " + oldToken)).andExpect(status().isUnauthorized());
        mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(json("email", "paolo@school.edu", "password", "Password1")))
                .andExpect(status().isForbidden());

        mvc.perform(delete("/api/admin/users/" + id).header("Authorization", "Bearer " + admin))
                .andExpect(status().isNoContent());
        mvc.perform(get("/api/admin/users/" + id).header("Authorization", "Bearer " + admin))
                .andExpect(status().isNotFound());
    }
}
