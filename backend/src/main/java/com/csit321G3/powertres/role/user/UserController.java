package com.csit321G3.powertres.role.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    
    UserService userService;

    @GetMapping("/getAllUsers")
    public List<UserProfile> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/postNewUser")
    public UserProfile postNewUser(@RequestBody UserProfile userProfile) {
        return userService.saveUser(userProfile);
    }
}