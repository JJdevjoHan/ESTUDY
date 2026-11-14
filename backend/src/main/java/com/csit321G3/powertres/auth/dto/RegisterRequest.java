package com.csit321G3.powertres.auth.dto;

// matches what frontend/src/features/auth/services/authService.js sends
public record RegisterRequest(
        String role,
        String fullName,
        String email,
        String schoolId,
        String password) {
}