package com.csit321G3.powertres.role.user;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userv;

    @GetMapping("/getAllUsers")
    public List<UserProfile> getAllUsers() {
        return userv.getAllUsers();
    }

    //hashed pass
    @PostMapping("/postNewUser")
    public UserProfile postNewUser(@RequestBody UserProfile userProfile) {
        return userv.saveUser(userProfile);
    }

    @PutMapping("/putUser")
    public UserProfile putUser(@RequestParam Long id, @RequestBody UserProfile usernewDetails) {
        return userv.putUser(id, usernewDetails);
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable Long id) {
        return userv.deleteUser(id);
    }

    //reused for the profilepage

    @GetMapping("/getProfile/{id}")
    public UserResponse getProfile(@PathVariable Long id) {
        return userv.getProfile(id);
    }

    @PutMapping("/putProfile/{id}")
    public UserResponse putProfile(@PathVariable Long id, @RequestBody UserRequest request) {
        return userv.updateProfile(id, request);
    }

    @PutMapping("/changePassword/{id}")
    public Map<String, String> changePassword(@PathVariable Long id, @RequestBody UserRequest request) {
        userv.changePassword(id, request);
        return Map.of("message", "Password updated");
    }
}