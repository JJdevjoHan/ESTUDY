package com.csit321G3.powertres.question.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Holds the correct answer on the server, so the score can't be faked from the browser.
@Entity
@Table(name = "question")
public class QuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String subject;   // e.g. "Mathematics"

    @Column(nullable = false)
    private String topic;     // subtopic, e.g. "Algebra: linear equations"

    @Column(nullable = false, length = 1000)
    private String text;

    @Column(nullable = false)
    private String correctOption;  // e.g. "b"

    public QuestionEntity() {
    }

    public Long getQuestionId() { return questionId; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public String getCorrectOption() { return correctOption; }
    public void setCorrectOption(String correctOption) { this.correctOption = correctOption; }
}
