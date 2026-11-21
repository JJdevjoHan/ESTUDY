package com.csit321G3.powertres.auth.dto;

public record LoginRequest(String email, String password, Boolean rememberMe) {
}