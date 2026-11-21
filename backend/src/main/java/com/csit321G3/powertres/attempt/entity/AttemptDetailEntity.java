package com.csit321G3.powertres.attempt.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

// One row per question answered in an attempt (the ERD's AssessmentDetail).
@Entity
@Table(name = "assessment_detail")
public class AttemptDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long detailId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "attempt_id", nullable = false)
    private AttemptEntity attempt;

    private Long questionId;
    private String topic;
    private boolean isCorrect;

    protected AttemptDetailEntity() {
    }

    public AttemptDetailEntity(AttemptEntity attempt, Long questionId, String topic, boolean isCorrect) {
        this.attempt = attempt;
        this.questionId = questionId;
        this.topic = topic;
        this.isCorrect = isCorrect;
    }

    public Long getDetailId() { return detailId; }
    public Long getQuestionId() { return questionId; }
    public String getTopic() { return topic; }
    public boolean isCorrect() { return isCorrect; }
}
