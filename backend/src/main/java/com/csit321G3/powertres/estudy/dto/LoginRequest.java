package com.csit321G3.powertres.estudy.dto;

import jakarta.validation.constraints.NotBlank;

/** JSON body for POST /api/auth/login. "email" may also hold the username (school ID). */
public record LoginRequest(

        @NotBlank
        String email,

        @NotBlank
        String password,

        Boolean rememberMe
) {
}
