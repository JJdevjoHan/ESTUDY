package com.csit321G3.powertres.attempt.dto;

import java.util.Map;

public class AttemptRequest {
    private Long studentId;
    private String subject;
    private Map<Long, String> answers;   

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public Map<Long, String> getAnswers() { return answers; }
    public void setAnswers(Map<Long, String> answers) { this.answers = answers; }
}
