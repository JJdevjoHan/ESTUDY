package com.csit321g3.powertres.estudy.exception;

/** Thrown when an id does not exist. Becomes HTTP 404. */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
