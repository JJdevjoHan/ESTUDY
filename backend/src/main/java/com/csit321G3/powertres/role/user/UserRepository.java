package com.csit321G3.powertres.role.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}