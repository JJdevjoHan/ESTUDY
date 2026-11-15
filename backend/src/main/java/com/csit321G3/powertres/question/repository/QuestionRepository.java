package com.csit321G3.powertres.question.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csit321G3.powertres.question.entity.QuestionEntity;

public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {
    List<QuestionEntity> findBySubject(String subject);
}
