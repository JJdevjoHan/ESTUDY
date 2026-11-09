package com.csit321G3.powertres.role.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


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

    @GetMapping("/putUser")
    public UserProfile putUser(@RequestBody Long id, @RequestParam UserProfile usernewDetails) {
        return userv.putUser(id, usernewDetails);
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable Long id){
        return userv.deleteUser(id);
    } 

}