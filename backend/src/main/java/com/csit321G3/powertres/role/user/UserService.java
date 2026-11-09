package com.csit321G3.powertres.role.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.csit321G3.powertres.role.user.UserProfile;
import com.csit321G3.powertres.role.user.administrator.entity.AdminEntity;

import java.nio.LongBuffer;
import java.util.List;
import java.util.concurrent.atomic.LongAccumulator;

@Service
public class UserService {

    @Autowired
    UserRepository urepo;

    public List<UserProfile> getAllUsers() {
        return urepo.findAll();
    }

    public UserProfile saveUser(UserProfile userProfile) 
    {
        return urepo.save(userProfile);
    }

    // U - Update
    public UserProfile putUser(Long id, UserProfile newUserDetails) {
        UserProfile user = urepo.findById(id).
        orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        //user.setUserID(newUserDetails.getUserID());
        user.setUsername(newUserDetails.getUsername());
        user.setEmail(newUserDetails.getEmail());
        user.setPassword(newUserDetails.getPassword());
        //user.setCreatedAt(newUserDetails.getCreatedAt());

        return urepo.save(user);
    }

    // D - Delete
    public String deleteUser(Long id) {
        urepo.deleteById(id);
        return "User " + id + " is successfully deleted!";
    }
}