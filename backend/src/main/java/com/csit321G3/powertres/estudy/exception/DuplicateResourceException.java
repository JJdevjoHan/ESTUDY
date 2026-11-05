package com.csit321g3.powertres.estudy.exception;

/** Thrown when an email or school ID is already taken. Becomes HTTP 409. */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}
