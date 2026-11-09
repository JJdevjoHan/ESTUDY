package com.csit321G3.powertres.role.user;

/** The JSON the client sends. Any field can be left out when updating. */
public record UserRequest(
        String fName,
        String lName,
        String email,
        String username,
        String password,
        String role,
        String yearLevel,
        String section,
        String department,
        String accessLevel) {
}
