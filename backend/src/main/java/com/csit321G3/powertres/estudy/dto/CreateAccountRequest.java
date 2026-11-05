package com.csit321G3.powertres.estudy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/** Admin creates any account, including other admins (POST /api/admin/users). */
public record CreateAccountRequest(

        @NotBlank @Pattern(regexp = "student|teacher|admin", message = "must be 'student', 'teacher' or 'admin'")
        String role,

        @NotBlank @Size(max = 50)
        String fName,

        @Size(max = 50)
        String lName,

        @NotBlank @Email @Size(max = 150)
        String email,

        @NotBlank @Size(max = 50)
        String username,

        @NotBlank @Pattern(regexp = ValidationRules.PASSWORD_REGEX, message = ValidationRules.PASSWORD_MESSAGE)
        String password
) {
}
