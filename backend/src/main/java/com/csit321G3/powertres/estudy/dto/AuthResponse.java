package com.csit321G3.powertres.estudy.dto;

/** Login/register result. Send the token back as "Authorization: Bearer <token>" on every later request. */
public record AuthResponse(UserResponse user, String token, String tokenType, long expiresInSeconds) {

    public static AuthResponse of(UserResponse user, String token, long expiresInSeconds) {
        return new AuthResponse(user, token, "Bearer", expiresInSeconds);
    }
}
