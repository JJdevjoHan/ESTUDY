package com.csit321G3.powertres.estudy.exception;

/** Thrown when a disabled account tries to log in. Becomes HTTP 403. */
public class AccountDisabledException extends RuntimeException {

    public AccountDisabledException() {
        super("This account has been disabled. Please contact an administrator.");
    }
}
