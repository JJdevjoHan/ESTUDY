package com.csit321G3.powertres.role.user.student.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csit321G3.powertres.role.user.UserProfile;
import com.csit321G3.powertres.role.user.student.entity.StudentEntity;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Long> {

    Optional<StudentEntity> findByUser(UserProfile user);
}
