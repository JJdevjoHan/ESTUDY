package com.csit321G3.powertres.attempt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csit321G3.powertres.attempt.entity.AttemptEntity;

public interface AttemptRepository extends JpaRepository<AttemptEntity, Long> {
    List<AttemptEntity> findByStudentStudentIdOrderByDateTakenDesc(Long studentId);
}
