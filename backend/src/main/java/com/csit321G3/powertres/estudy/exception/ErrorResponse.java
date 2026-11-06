package com.csit321G3.powertres.estudy.exception;

/** Every error is sent as { "message": "..." }, which is what the React forms display. */
public record ErrorResponse(String message) {
}
