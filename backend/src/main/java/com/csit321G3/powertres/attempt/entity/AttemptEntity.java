package com.csit321G3.powertres.attempt.entity;

import java.time.LocalDateTime;

import com.csit321G3.powertres.role.user.student.entity.StudentEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "assessment_attempt")
public class AttemptEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attemptId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @Column(nullable = false)
    private String subject;

    private int correct;
    private int total;

    @Column(nullable = false)
    private double score;          // percentage, 0 - 100

    @Column(nullable = false)
    private String status;         // "Completed" or "Incomplete"

    private LocalDateTime dateTaken = LocalDateTime.now();

    protected AttemptEntity() {
    }

    public AttemptEntity(StudentEntity student, String subject, int correct, int total,
                         double score, String status) {
        this.student = student;
        this.subject = subject;
        this.correct = correct;
        this.total = total;
        this.score = score;
        this.status = status;
    }

    public Long getAttemptId() { return attemptId; }
    public StudentEntity getStudent() { return student; }
    public String getSubject() { return subject; }
    public int getCorrect() { return correct; }
    public int getTotal() { return total; }
    public double getScore() { return score; }
    public String getStatus() { return status; }
    public LocalDateTime getDateTaken() { return dateTaken; }
}
