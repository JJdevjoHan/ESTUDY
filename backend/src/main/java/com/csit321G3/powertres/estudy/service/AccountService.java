package com.csit321g3.powertres.estudy.service;

import com.csit321g3.powertres.estudy.dto.ChangePasswordRequest;
import com.csit321g3.powertres.estudy.dto.RoleResponse;
import com.csit321g3.powertres.estudy.dto.UpdateAccountRequest;
import com.csit321g3.powertres.estudy.dto.UserResponse;
import com.csit321g3.powertres.estudy.exception.BadRequestException;
import com.csit321g3.powertres.estudy.exception.DuplicateResourceException;
import com.csit321g3.powertres.estudy.exception.InvalidCredentialsException;
import com.csit321g3.powertres.estudy.exception.ResourceNotFoundException;
import com.csit321g3.powertres.estudy.model.Administrator;
import com.csit321g3.powertres.estudy.model.Role;
import com.csit321g3.powertres.estudy.model.RoleNames;
import com.csit321g3.powertres.estudy.model.Student;
import com.csit321g3.powertres.estudy.model.Teacher;
import com.csit321g3.powertres.estudy.model.UserProfile;
import com.csit321g3.powertres.estudy.repository.AdministratorRepository;
import com.csit321g3.powertres.estudy.repository.RoleRepository;
import com.csit321g3.powertres.estudy.repository.StudentRepository;
import com.csit321g3.powertres.estudy.repository.TeacherRepository;
import com.csit321g3.powertres.estudy.repository.UserProfileRepository;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * All the account rules in one place: create, read, update, change password, enable/disable,
 * assign role, delete. Controllers call this; they contain no rules themselves.
 */
@Service
public class AccountService {

    private final UserProfileRepository userRepository;
    private final RoleRepository roleRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final AdministratorRepository administratorRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountService(UserProfileRepository userRepository,
                          RoleRepository roleRepository,
                          StudentRepository studentRepository,
                          TeacherRepository teacherRepository,
                          AdministratorRepository administratorRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.administratorRepository = administratorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ------------------------------------------------------------------ create

    /** Creates the UserProfile and the matching Student / Teacher / Administrator row. roleName: STUDENT, TEACHER or ADMIN. */
    @Transactional
    public UserProfile create(String roleName, String fName, String lName, String email,
                              String username, String rawPassword) {
        String role = normalizeRole(roleName);
        String cleanEmail = normalizeEmail(email);
        String cleanUsername = username.trim();

        if (userRepository.findByEmail(cleanEmail).isPresent()) {
            throw new DuplicateResourceException("Email '" + cleanEmail + "' is already registered.");
        }
        if (userRepository.findByUsername(cleanUsername).isPresent()) {
            throw new DuplicateResourceException("ID '" + cleanUsername + "' is already registered.");
        }

        UserProfile user = userRepository.save(new UserProfile(
                cleanUsername, cleanEmail, passwordEncoder.encode(rawPassword), findRole(role)));
        createRoleProfile(user, fName.trim(), lName == null ? "" : lName.trim());
        return user;
    }

    // -------------------------------------------------------------------- read

    @Transactional(readOnly = true)
    public UserResponse toResponse(UserProfile user) {
        String role = user.getRole().getRoleName();
        Long id = user.getUserId();
        if (RoleNames.STUDENT.equals(role)) {
            return UserResponse.of(user, studentRepository.findByUser_UserId(id).orElseThrow(this::missingProfile));
        }
        if (RoleNames.TEACHER.equals(role)) {
            return UserResponse.of(user, teacherRepository.findByUser_UserId(id).orElseThrow(this::missingProfile));
        }
        return UserResponse.of(user, administratorRepository.findByUser_UserId(id).orElseThrow(this::missingProfile));
    }

    @Transactional(readOnly = true)
    public UserResponse get(Long userId) {
        return toResponse(find(userId));
    }

    /** All accounts, or only one role when roleFilter is given (student / teacher / admin). */
    @Transactional(readOnly = true)
    public List<UserResponse> list(String roleFilter) {
        String filter = roleFilter == null || roleFilter.isBlank() ? null : normalizeRole(roleFilter);
        List<UserResponse> result = new ArrayList<>();
        if (filter == null || RoleNames.STUDENT.equals(filter)) {
            studentRepository.findAll().forEach(s -> result.add(UserResponse.of(s.getUser(), s)));
        }
        if (filter == null || RoleNames.TEACHER.equals(filter)) {
            teacherRepository.findAll().forEach(t -> result.add(UserResponse.of(t.getUser(), t)));
        }
        if (filter == null || RoleNames.ADMIN.equals(filter)) {
            administratorRepository.findAll().forEach(a -> result.add(UserResponse.of(a.getUser(), a)));
        }
        result.sort(Comparator.comparing(UserResponse::id));
        return result;
    }

    @Transactional(readOnly = true)
    public List<RoleResponse> listRoles() {
        return roleRepository.findAll().stream()
                .map(role -> new RoleResponse(role.getRoleId(), role.getRoleName(), userRepository.countByRole(role)))
                .toList();
    }

    // ------------------------------------------------------------------ update

    /** asAdmin = true also allows changing username and accessLevel. */
    @Transactional
    public UserResponse updateProfile(Long userId, UpdateAccountRequest request, boolean asAdmin) {
        UserProfile user = find(userId);

        String email = normalizeEmail(request.email());
        userRepository.findByEmail(email).ifPresent(other -> {
            if (!other.getUserId().equals(userId)) {
                throw new DuplicateResourceException("Email '" + email + "' is already registered.");
            }
        });
        user.setEmail(email);

        if (asAdmin && request.username() != null && !request.username().isBlank()) {
            String username = request.username().trim();
            userRepository.findByUsername(username).ifPresent(other -> {
                if (!other.getUserId().equals(userId)) {
                    throw new DuplicateResourceException("ID '" + username + "' is already registered.");
                }
            });
            user.setUsername(username);
        }
        userRepository.save(user);

        String fName = request.fName().trim();
        String lName = request.lName() == null ? "" : request.lName().trim();
        String role = user.getRole().getRoleName();

        if (RoleNames.STUDENT.equals(role)) {
            Student student = studentRepository.findByUser_UserId(userId).orElseThrow(this::missingProfile);
            student.setFName(fName);
            student.setLName(lName);
            if (request.yearLevel() != null) student.setYearLevel(request.yearLevel().trim());
            if (request.section() != null) student.setSection(request.section().trim());
            studentRepository.save(student);
        } else if (RoleNames.TEACHER.equals(role)) {
            Teacher teacher = teacherRepository.findByUser_UserId(userId).orElseThrow(this::missingProfile);
            teacher.setFName(fName);
            teacher.setLName(lName);
            if (request.department() != null) teacher.setDepartment(request.department().trim());
            teacherRepository.save(teacher);
        } else {
            Administrator admin = administratorRepository.findByUser_UserId(userId).orElseThrow(this::missingProfile);
            admin.setFName(fName);
            admin.setLName(lName);
            if (asAdmin && request.accessLevel() != null && !request.accessLevel().isBlank()) {
                admin.setAccessLevel(request.accessLevel().trim().toUpperCase(Locale.ROOT));
            }
            administratorRepository.save(admin);
        }
        return toResponse(user);
    }

    @Transactional
    public void changePassword(Long userId, ChangePasswordRequest request) {
        UserProfile user = find(userId);
        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Your current password is incorrect.");
        }
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void resetPassword(Long userId, String newPassword) {
        UserProfile user = find(userId);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // ------------------------------------------------------- admin-only actions

    @Transactional
    public UserResponse setEnabled(Long targetId, boolean enabled, Long actingAdminId) {
        if (!enabled && targetId.equals(actingAdminId)) {
            throw new BadRequestException("You cannot disable your own account.");
        }
        UserProfile user = find(targetId);
        user.setEnabled(enabled);
        userRepository.save(user);
        return toResponse(user);
    }

    /** Moves the account to another role. The names carry over; role-specific fields (section, department...) start empty. */
    @Transactional
    public UserResponse assignRole(Long targetId, String roleName, Long actingAdminId) {
        String newRole = normalizeRole(roleName);
        UserProfile user = find(targetId);
        if (user.getRole().getRoleName().equals(newRole)) {
            return toResponse(user);
        }
        if (targetId.equals(actingAdminId)) {
            throw new BadRequestException("You cannot change your own role.");
        }

        UserResponse before = toResponse(user);
        removeRoleProfile(targetId);
        user.setRole(findRole(newRole));
        userRepository.save(user);
        createRoleProfile(user, before.fName(), before.lName());
        return toResponse(user);
    }

    /** Deletes the account. If other tables (quizzes, attempts...) still point to it, the database refuses: disable instead. */
    @Transactional
    public void delete(Long targetId, Long actingAdminId) {
        if (targetId.equals(actingAdminId)) {
            throw new BadRequestException("You cannot delete your own account.");
        }
        UserProfile user = find(targetId);
        removeRoleProfile(targetId);
        userRepository.delete(user);
    }

    // ----------------------------------------------------------------- helpers

    private UserProfile find(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Account with id " + userId + " was not found."));
    }

    private Role findRole(String roleName) {
        return roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new IllegalStateException("Role " + roleName + " is missing from the roles table."));
    }

    private void createRoleProfile(UserProfile user, String fName, String lName) {
        String role = user.getRole().getRoleName();
        if (RoleNames.STUDENT.equals(role)) {
            studentRepository.save(new Student(user, fName, lName));
        } else if (RoleNames.TEACHER.equals(role)) {
            teacherRepository.save(new Teacher(user, fName, lName));
        } else {
            administratorRepository.save(new Administrator(user, fName, lName));
        }
    }

    private void removeRoleProfile(Long userId) {
        studentRepository.findByUser_UserId(userId).ifPresent(studentRepository::delete);
        teacherRepository.findByUser_UserId(userId).ifPresent(teacherRepository::delete);
        administratorRepository.findByUser_UserId(userId).ifPresent(administratorRepository::delete);
        studentRepository.flush();
    }

    private IllegalStateException missingProfile() {
        return new IllegalStateException("Account has no matching Student/Teacher/Administrator row.");
    }

    private String normalizeRole(String roleName) {
        String role = roleName == null ? "" : roleName.trim().toUpperCase(Locale.ROOT);
        if (!RoleNames.isValid(role)) {
            throw new BadRequestException("Role must be student, teacher or admin.");
        }
        return role;
    }

    public static String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
