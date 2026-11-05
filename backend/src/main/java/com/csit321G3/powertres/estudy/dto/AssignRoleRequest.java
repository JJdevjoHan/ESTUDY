package com.csit321g3.powertres.estudy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/** PUT /api/admin/users/{id}/role */
public record AssignRoleRequest(

        @NotBlank @Pattern(regexp = "student|teacher|admin", message = "must be 'student', 'teacher' or 'admin'")
        String role
) {
}
