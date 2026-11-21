package com.csit321G3.powertres.passwordreset;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.csit321G3.powertres.role.user.UserProfile;
import com.csit321G3.powertres.role.user.UserRepository;
import com.csit321G3.powertres.role.user.student.entity.StudentEntity;
import com.csit321G3.powertres.role.user.student.repository.StudentRepository;
import com.csit321G3.powertres.role.user.teacher.entity.TeacherEntity;
import com.csit321G3.powertres.role.user.teacher.repository.TeacherRepository;

/**
 * Account recovery in two steps:
 * 1) verifyDetails: email + school ID + full name must ALL match one account -> a one-time token.
 * 2) resetPassword: the token + a new password -> the password is changed.
 */
@Service
public class PasswordResetService {

    private static final int MAX_FAILED_TRIES = 5;
    private static final int LOCK_MINUTES = 15;
    private static final int TOKEN_MINUTES = 10;

    private final UserRepository users;
    private final StudentRepository students;
    private final TeacherRepository teachers;
    private final PasswordResetRepository tokens;
    private final PasswordEncoder encoder;

   
    private final Map<String, FailedTries> failures = new HashMap<>();

    public PasswordResetService(UserRepository users, StudentRepository students,
                                TeacherRepository teachers, PasswordResetRepository tokens,
                                PasswordEncoder encoder) {
        this.users = users;
        this.students = students;
        this.teachers = teachers;
        this.tokens = tokens;
        this.encoder = encoder;
    }

    /** Returns a one-time token if the three details match. Always the same error if not. */
    public synchronized String verifyDetails(String email, String schoolId, String fullName) {
        if (isBlank(email) || isBlank(schoolId) || isBlank(fullName)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email, ID and full name are required");
        }
        String key = schoolId.trim().toLowerCase();
        checkNotLocked(key);

        UserProfile user = users.findByEmail(email.trim().toLowerCase()).orElse(null);
        boolean matches = user != null
                && schoolId.trim().equalsIgnoreCase(user.getUsername())
                && normalize(fullName).equals(normalize(fullNameOf(user)));

        if (!matches) {
            recordFailure(key);
           
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The details don't match our records");
        }

        failures.remove(key);
        PasswordResetToken t = new PasswordResetToken();
        t.setToken(UUID.randomUUID().toString());
        t.setUser(user);
        t.setExpiresAt(LocalDateTime.now().plusMinutes(TOKEN_MINUTES));
        tokens.save(t);
        return t.getToken();
    }

  
    public synchronized void resetPassword(String token, String email, String schoolId, String newPassword) {
        if (isBlank(email) || isBlank(schoolId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and ID are required");
        }
        if (newPassword == null || newPassword.length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters");
        }
        String key = schoolId.trim().toLowerCase();
        checkNotLocked(key);

        PasswordResetToken t = tokens.findByToken(token == null ? "" : token)
                .filter(found -> !found.isUsed() && found.getExpiresAt().isAfter(LocalDateTime.now()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "This reset session is invalid or has expired. Please start again."));

        UserProfile user = t.getUser();
        boolean sameAccount = email.trim().equalsIgnoreCase(user.getEmail())
                && schoolId.trim().equalsIgnoreCase(user.getUsername());
        if (!sameAccount) {
            recordFailure(key);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The details don't match our records");
        }

        failures.remove(key);
        user.setPassword(encoder.encode(newPassword));
        users.save(user);
        t.setUsed(true); 
        tokens.save(t);
    }


    private String fullNameOf(UserProfile user) {
        StudentEntity s = students.findByUser(user).orElse(null);
        if (s != null) {
            return nz(s.getFirstName()) + " " + nz(s.getLastName());
        }
        TeacherEntity t = teachers.findByUser(user).orElse(null);
        if (t != null) {
            return nz(t.getFirstName()) + " " + nz(t.getLastName());
        }
        return "";
    }

    private String nz(String value) {
        return value == null ? "" : value;
    }

   
    private String normalize(String name) {
        return name.trim().replaceAll("\\s+", " ").toLowerCase();
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private void checkNotLocked(String key) {
        FailedTries f = failures.get(key);
        if (f == null) {
            return;
        }
        if (f.lockedUntil != null && f.lockedUntil.isAfter(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS,
                    "Too many failed tries. Please try again in " + LOCK_MINUTES + " minutes.");
        }
        if (f.lockedUntil != null) {
            failures.remove(key);   
        }
    }

    private void recordFailure(String key) {
        FailedTries f = failures.computeIfAbsent(key, k -> new FailedTries());
        f.count++;
        if (f.count >= MAX_FAILED_TRIES) {
            f.lockedUntil = LocalDateTime.now().plusMinutes(LOCK_MINUTES);
        }
    }

    private static class FailedTries {
        int count;
        LocalDateTime lockedUntil;
    }
}
