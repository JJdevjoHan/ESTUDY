package com.csit321G3.powertres.role.user;

import java.util.List;

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
}