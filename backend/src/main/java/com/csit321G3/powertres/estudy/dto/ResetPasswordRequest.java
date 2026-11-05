package com.csit321G3.powertres.estudy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/** PUT /api/admin/users/{id}/password: an admin sets a new password for someone who forgot theirs. */
public record ResetPasswordRequest(

        @NotBlank @Pattern(regexp = ValidationRules.PASSWORD_REGEX, message = ValidationRules.PASSWORD_MESSAGE)
        String newPassword
) {
}
