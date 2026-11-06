package com.csit321G3.powertres.estudy.controller;

import com.csit321G3.powertres.estudy.dto.AuthResponse;
import com.csit321G3.powertres.estudy.dto.LoginRequest;
import com.csit321G3.powertres.estudy.dto.RegisterRequest;
import com.csit321G3.powertres.estudy.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/** Public endpoints (no token needed) plus logout. */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    /**
     * Tokens are stateless, so "logging out" means the client throws its token away.
     * This endpoint exists so the frontend has one call to make (and a place to add a token blacklist later).
     */
    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout() {
        // nothing to do on the server for now
    }
}
