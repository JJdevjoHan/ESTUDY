package com.csit321G3.powertres.role.user.Teacher;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.csit321G3.powertres.role.user.UserProfile;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByUser(UserProfile user);
}
