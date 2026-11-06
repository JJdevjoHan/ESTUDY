package com.csit321G3.powertres.estudy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Update a profile. Used by PUT /api/users/me and PUT /api/admin/users/{id}.
 * Optional fields left out (null) keep their current value.
 * "username" and "accessLevel" are only applied when an admin sends the request.
 */
public record UpdateAccountRequest(

        @NotBlank @Size(max = 50)
        String fName,

        @Size(max = 50)
        String lName,

        @NotBlank @Email @Size(max = 150)
        String email,

        @Size(max = 50)
        String username,

        @Size(max = 30)
        String yearLevel,

        @Size(max = 30)
        String section,

        @Size(max = 100)
        String department,

        @Size(max = 30)
        String accessLevel
) {
}
