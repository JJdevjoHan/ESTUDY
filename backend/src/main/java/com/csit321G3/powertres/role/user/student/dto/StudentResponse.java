package com.csit321G3.powertres.role.user.student.dto;

public record StudentResponse(
        Long studentId,
        Long userId,
        String firstName,
        String lastName,
        Integer yearLevel,
        String section) {
}
