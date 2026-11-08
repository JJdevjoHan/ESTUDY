package com.csit321G3.powertres.role.user.teacher.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csit321G3.powertres.role.user.UserProfile;
import com.csit321G3.powertres.role.user.teacher.entity.TeacherEntity;

@Repository
public interface TeacherRepository extends JpaRepository<TeacherEntity, Long> {

    Optional<TeacherEntity> findByUser(UserProfile user);
}