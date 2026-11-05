package com.csit321g3.powertres.estudy.security;

/** Who is making the current request. Available in controllers with @AuthenticationPrincipal AuthUser me. */
public record AuthUser(Long id, String role) {
}
