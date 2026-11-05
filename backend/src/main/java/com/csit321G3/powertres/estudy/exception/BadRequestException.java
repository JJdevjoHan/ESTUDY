package com.csit321g3.powertres.estudy.exception;

/** A request that is well-formed but not allowed (for example, an admin changing their own role). Becomes HTTP 400. */
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}
