package com.csit321G3.powertres.auth.dto;

//mag match sa unsay eexpect sa frontend, so that the frontend can easily parse the response.
public record AuthResponse(UserInfo user) {

    public record UserInfo(
            Long userId,
            String role,
            String fullName,
            String email,
            String studentNumber,
            Integer year,
            boolean hasCompletedDiagnostic) {
    }
}