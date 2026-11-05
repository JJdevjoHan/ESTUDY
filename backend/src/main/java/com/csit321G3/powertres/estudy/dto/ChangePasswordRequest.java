package com.csit321G3.powertres.estudy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/** PUT /api/users/me/password */
public record ChangePasswordRequest(

        @NotBlank
        String currentPassword,

        @NotBlank @Pattern(regexp = ValidationRules.PASSWORD_REGEX, message = ValidationRules.PASSWORD_MESSAGE)
        String newPassword
) {
}
