package com.csit321G3.powertres.role.user;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByEmailIgnoreCase(String email);
    Optional<UserProfile> findByUsername(String username);
    List<UserProfile> findByRoleRoleName(String roleName);
}
