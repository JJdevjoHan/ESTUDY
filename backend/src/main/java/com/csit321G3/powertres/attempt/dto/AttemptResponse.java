package com.csit321G3.powertres.attempt.dto;

import java.time.LocalDateTime;
import java.util.Map;

public record AttemptResponse(
        Long attemptId,
        String subject,
        int correct,
        int total,
        double score,
        String status,
        LocalDateTime dateTaken,
        Map<String, TopicScore> byTopic) {

    public record TopicScore(int correct, int total, double score) {
    }
}
