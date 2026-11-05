package com.csit321G3.powertres.estudy.exception;

/** Thrown on a wrong email/ID or password. Becomes HTTP 401. */
public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException() {
        super("Invalid email/ID or password.");
    }

    public InvalidCredentialsException(String message) {
        super(message);
    }
}
