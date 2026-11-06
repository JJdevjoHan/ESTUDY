package com.csit321G3.powertres.estudy.repository;

import com.csit321G3.powertres.estudy.model.Student;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByUser_UserId(Long userId);
}
