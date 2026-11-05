package com.csit321g3.powertres.estudy.dto;

/** Validation rules used by several request classes. Matches the checks in the React forms. */
public final class ValidationRules {

    public static final String PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d).{8,}$";
    public static final String PASSWORD_MESSAGE = "must be 8+ characters with a letter and a number";

    private ValidationRules() {
    }
}
