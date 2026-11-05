package com.csit321g3.powertres.estudy.repository;

import com.csit321g3.powertres.estudy.model.Teacher;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    Optional<Teacher> findByUser_UserId(Long userId);
}
