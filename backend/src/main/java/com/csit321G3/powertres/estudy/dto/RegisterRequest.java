package com.csit321G3.powertres.estudy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/** JSON body for POST /api/auth/register (what the React registration form sends). Admins cannot self-register. */
public record RegisterRequest(

        @NotBlank @Pattern(regexp = "student|teacher", message = "must be 'student' or 'teacher'")
        String role,

        @NotBlank @Size(max = 100)
        String fullName,

        @NotBlank @Email @Size(max = 150)
        String email,

        @NotBlank @Size(max = 50)
        String schoolId,

        @NotBlank @Pattern(regexp = ValidationRules.PASSWORD_REGEX, message = ValidationRules.PASSWORD_MESSAGE)
        String password
) {
}
