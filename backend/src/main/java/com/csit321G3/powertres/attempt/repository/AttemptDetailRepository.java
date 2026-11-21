package com.csit321G3.powertres.attempt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csit321G3.powertres.attempt.entity.AttemptDetailEntity;

public interface AttemptDetailRepository extends JpaRepository<AttemptDetailEntity, Long> {
    List<AttemptDetailEntity> findByAttemptAttemptId(Long attemptId);
    void deleteByAttemptAttemptId(Long attemptId);
}
