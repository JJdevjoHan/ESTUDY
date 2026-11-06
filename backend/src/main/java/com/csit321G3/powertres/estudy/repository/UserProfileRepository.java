package com.csit321G3.powertres.estudy.repository;

import com.csit321G3.powertres.estudy.model.Role;
import com.csit321G3.powertres.estudy.model.UserProfile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByEmail(String email);

    Optional<UserProfile> findByUsername(String username);

    long countByRole(Role role);

    long countByRoleAndEnabledTrue(Role role);
}
