package com.csit321G3.powertres.question.dto;

import java.util.List;

public record QuestionResponse(Long id, String topic, String prompt, List<Option> options) {

    public record Option(String id, String text) {
    }
}
