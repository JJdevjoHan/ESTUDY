package com.csit321G3.powertres.estudy.dto;

import com.csit321G3.powertres.estudy.model.Administrator;
import com.csit321G3.powertres.estudy.model.Student;
import com.csit321G3.powertres.estudy.model.Teacher;
import com.csit321G3.powertres.estudy.model.UserProfile;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.Locale;

/**
 * What the API sends back about an account. The password hash is never included.
 * Fields that do not apply to the role (for example "section" on a teacher) are left out of the JSON.
 * "schoolId" is the same value as "username" (kept so the React app's field name keeps working).
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserResponse(
        Long id,
        String role,
        String username,
        String schoolId,
        String fName,
        String lName,
        String fullName,
        String email,
        boolean enabled,
        String yearLevel,
        String section,
        String department,
        String accessLevel,
        LocalDateTime createdAt
) {

    public static UserResponse of(UserProfile u, Student s) {
        return build(u, s.getFName(), s.getLName(), s.getYearLevel(), s.getSection(), null, null);
    }

    public static UserResponse of(UserProfile u, Teacher t) {
        return build(u, t.getFName(), t.getLName(), null, null, t.getDepartment(), null);
    }

    public static UserResponse of(UserProfile u, Administrator a) {
        return build(u, a.getFName(), a.getLName(), null, null, null, a.getAccessLevel());
    }

    private static UserResponse build(UserProfile u, String fName, String lName, String yearLevel,
                                      String section, String department, String accessLevel) {
        String fullName = (fName + " " + lName).trim();
        return new UserResponse(
                u.getUserId(),
                u.getRole().getRoleName().toLowerCase(Locale.ROOT),
                u.getUsername(),
                u.getUsername(),
                fName,
                lName,
                fullName,
                u.getEmail(),
                u.isEnabled(),
                yearLevel,
                section,
                department,
                accessLevel,
                u.getCreatedAt());
    }
}
