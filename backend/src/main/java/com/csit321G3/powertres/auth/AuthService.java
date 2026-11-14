package com.csit321G3.powertres.auth;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.csit321G3.powertres.auth.dto.AuthResponse;
import com.csit321G3.powertres.auth.dto.AuthResponse.UserInfo;
import com.csit321G3.powertres.auth.dto.LoginRequest;
import com.csit321G3.powertres.auth.dto.RegisterRequest;
import com.csit321G3.powertres.role.entity.RoleEntity;
import com.csit321G3.powertres.role.repository.RoleRepository;
import com.csit321G3.powertres.role.user.UserProfile;
import com.csit321G3.powertres.role.user.UserRepository;
import com.csit321G3.powertres.role.user.administrator.entity.AdminEntity;
import com.csit321G3.powertres.role.user.administrator.repository.AdminRepository;
import com.csit321G3.powertres.role.user.student.entity.StudentEntity;
import com.csit321G3.powertres.role.user.student.repository.StudentRepository;
import com.csit321G3.powertres.role.user.teacher.entity.TeacherEntity;
import com.csit321G3.powertres.role.user.teacher.repository.TeacherRepository;

@Service
public class AuthService {

    private final UserRepository users;
    private final RoleRepository roles;
    private final StudentRepository students;
    private final TeacherRepository teachers;
    private final AdminRepository admins;
    private final PasswordEncoder encoder;

    public AuthService(UserRepository users, RoleRepository roles, StudentRepository students,
            TeacherRepository teachers, AdminRepository admins, PasswordEncoder encoder) {
        this.users = users;
        this.roles = roles;
        this.students = students;
        this.teachers = teachers;
        this.admins = admins;
        this.encoder = encoder;
    }

    /**
     * Creates the UserProfile and exactly ONE role row (student OR teacher).
     * Admins are never self-registered.
     */
    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (req == null) {
            throw bad("Request body is required");
        }
        requireText(req.role(), "role");
        requireText(req.fullName(), "fullName");
        requireText(req.email(), "email");
        requireText(req.schoolId(), "schoolId");
        requireText(req.password(), "password");

        String roleName = req.role().trim().toUpperCase();
        if (!roleName.equals("STUDENT") && !roleName.equals("TEACHER")) {
            throw bad("Role must be student or teacher");
        }

        String email = req.email().trim().toLowerCase();
        String schoolId = req.schoolId().trim();

        if (users.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }
        if (users.existsByUsername(schoolId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "That ID is already registered");
        }

        RoleEntity role = roles.findByRoleName(roleName).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, "Role " + roleName + " is missing from the database"));

        UserProfile user = new UserProfile();
        user.setUsername(schoolId);
        user.setEmail(email);
        user.setPassword(encoder.encode(req.password()));
        user.setRole(role);
        user = users.save(user);

        String[] name = splitName(req.fullName());
        if (roleName.equals("STUDENT")) {
            StudentEntity student = new StudentEntity(user);
            student.setFirstName(name[0]);
            student.setLastName(name[1]);
            students.save(student);
        } else {
            TeacherEntity teacher = new TeacherEntity(user);
            teacher.setFirstName(name[0]);
            teacher.setLastName(name[1]);
            teachers.save(teacher);
        }

        return buildResponse(user);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest req) {
        if (req == null || isBlank(req.email()) || isBlank(req.password())) {
            throw bad("Email and password are required");
        }
        UserProfile user = users.findByEmail(req.email().trim().toLowerCase())
                .orElseThrow(this::invalidLogin);
        if (user.getPassword() == null || !encoder.matches(req.password(), user.getPassword())) {
            throw invalidLogin();
        }
        return buildResponse(user);
    }

    private AuthResponse buildResponse(UserProfile user) {
        String role = user.getRole() == null ? "" : user.getRole().getRoleName().toLowerCase();
        String fullName = user.getUsername();
        Integer year = null;

        switch (role) {
            case "student" -> {
                StudentEntity s = students.findByUser(user).orElse(null);
                if (s != null) {
                    fullName = (s.getFirstName() + " " + s.getLastName()).trim();
                    year = s.getYearLevel();
                }
            }
            case "teacher" -> {
                TeacherEntity t = teachers.findByUser(user).orElse(null);
                if (t != null) {
                    fullName = ((t.getFirstName() == null ? "" : t.getFirstName()) + " "
                            + (t.getLastName() == null ? "" : t.getLastName())).trim();
                }
            }
            case "admin" -> {
                AdminEntity a = admins.findByUser(user).orElse(null);
                if (a != null) {
                    fullName = (a.getFname() + " " + a.getLname()).trim();
                }
            }
            default -> {
            }
        }

        // TODO: once AssessmentAttempt exists, set this from the student's completed diagnostic attempt
        boolean hasCompletedDiagnostic = false;

        return new AuthResponse(new UserInfo(user.getUserID(), role, fullName, user.getEmail(),
                user.getUsername(), year, hasCompletedDiagnostic));
    }

    private String[] splitName(String fullName) {
        String trimmed = fullName.trim();
        int cut = trimmed.lastIndexOf(' ');
        if (cut < 0) {
            return new String[] { trimmed, "" };
        }
        return new String[] { trimmed.substring(0, cut).trim(), trimmed.substring(cut + 1).trim() };
    }

    private ResponseStatusException invalidLogin() {
        return new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    private ResponseStatusException bad(String message) {
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
    }

    private void requireText(String value, String field) {
        if (isBlank(value)) {
            throw bad(field + " is required");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}