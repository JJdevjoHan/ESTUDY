package com.csit321G3.powertres.role.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.csit321G3.powertres.role.user.UserProfile;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<UserProfile> getAllUsers() {
        return userRepository.findAll();
    }

    public UserProfile saveUser(UserProfile userProfile) 
    {
        return userRepository.save(userProfile);
    }
}