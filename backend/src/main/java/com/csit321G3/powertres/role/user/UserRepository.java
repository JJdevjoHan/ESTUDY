package com.csit321G3.powertres.role.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;     

@Repository
public interface UserRepository extends JpaRepository<UserProfile, Long> {
     Optional<UserProfile> findFirstByEmailIgnoreCase(String email);  
}