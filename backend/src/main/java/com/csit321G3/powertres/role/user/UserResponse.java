package com.csit321G3.powertres.role.user;

//usay i receive para idisplay adtos profilepage
public record UserResponse(
        Long userId,
        String role,
        String studentNumber,
        String firstName,
        String lastName,
        String email,
        Integer yearLevel,
        String section,
        String department) {
}