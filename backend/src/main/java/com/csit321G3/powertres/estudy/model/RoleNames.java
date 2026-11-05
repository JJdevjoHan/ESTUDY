package com.csit321g3.powertres.estudy.model;

/** The three roles of EStudy. Stored in the roles table and used by Spring Security as ROLE_STUDENT etc. */
public final class RoleNames {

    public static final String STUDENT = "STUDENT";
    public static final String TEACHER = "TEACHER";
    public static final String ADMIN = "ADMIN";

    private RoleNames() {
    }

    public static boolean isValid(String name) {
        return STUDENT.equals(name) || TEACHER.equals(name) || ADMIN.equals(name);
    }
}
