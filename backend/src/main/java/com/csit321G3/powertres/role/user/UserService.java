package com.csit321G3.powertres.role.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.csit321G3.powertres.role.user.administrator.entity.AdminEntity;
import com.csit321G3.powertres.role.user.administrator.repository.AdminRepository;
import com.csit321G3.powertres.role.user.student.entity.StudentEntity;
import com.csit321G3.powertres.role.user.student.repository.StudentRepository;
import com.csit321G3.powertres.role.user.teacher.entity.TeacherEntity;
import com.csit321G3.powertres.role.user.teacher.repository.TeacherRepository;

@Service
public class UserService {

    @Autowired
    UserRepository urepo;

    @Autowired
    StudentRepository srepo;

    @Autowired
    TeacherRepository trepo;

    @Autowired
    AdminRepository arepo;

    @Autowired
    PasswordEncoder encoder;

    // R - Read
    public List<UserProfile> getAllUsers() {
        return urepo.findAll();
    }

    // C - Create (CHANGED: the password is hashed before it is saved)
    public UserProfile saveUser(UserProfile userProfile) {
        if (userProfile.getPassword() != null && !userProfile.getPassword().isBlank()) {
            userProfile.setPassword(encoder.encode(userProfile.getPassword()));
        }
        return urepo.save(userProfile);
    }

    // U - Update
    public UserProfile putUser(Long id, UserProfile newUserDetails) {
        UserProfile user = findUser(id);
        user.setUsername(newUserDetails.getUsername());
        user.setEmail(newUserDetails.getEmail());
        // CHANGED: only replace the password when a new one is sent, and hash it
        if (newUserDetails.getPassword() != null && !newUserDetails.getPassword().isBlank()) {
            user.setPassword(encoder.encode(newUserDetails.getPassword()));
        }
        return urepo.save(user);
    }

    // D - Delete
    public String deleteUser(Long id) {
        urepo.deleteById(id);
        return "User " + id + " is successfully deleted!";
    }
    //profilepage reused

    @Transactional(readOnly = true)
    public UserResponse getProfile(Long id) {
        return toResponse(findUser(id));
    }

    /** Only the fields that are sent are updated. */
    @Transactional
    public UserResponse updateProfile(Long id, UserRequest req) {
        if (req == null) {
            throw bad("Request body is required");
        }

        UserProfile user = findUser(id);

        if (!isBlank(req.getEmail())) {
            String email = req.getEmail().trim().toLowerCase();
            if (!email.equals(user.getEmail()) && urepo.existsByEmail(email)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
            }
            user.setEmail(email);
            urepo.save(user);
        }

        switch (roleOf(user)) {
            case "student" -> {
                StudentEntity student = srepo.findByUser(user)
                        .orElseThrow(() -> notFound("Student record not found"));
                if (!isBlank(req.getFirstName())) {
                    student.setFirstName(req.getFirstName().trim());
                }
                if (req.getLastName() != null) {
                    student.setLastName(req.getLastName().trim());
                }
                if (req.getYearLevel() != null) {
                    if (req.getYearLevel() <= 0) {
                        throw bad("yearLevel must be greater than zero");
                    }
                    student.setYearLevel(req.getYearLevel());
                }
                if (req.getSection() != null) {
                    student.setSection(blankToNull(req.getSection()));
                }
                srepo.save(student);
            }
            case "teacher" -> {
                TeacherEntity teacher = trepo.findByUser(user)
                        .orElseThrow(() -> notFound("Teacher record not found"));
                if (!isBlank(req.getFirstName())) {
                    teacher.setFirstName(req.getFirstName().trim());
                }
                if (req.getLastName() != null) {
                    teacher.setLastName(req.getLastName().trim());
                }
                if (req.getDepartment() != null) {
                    teacher.setDepartment(blankToNull(req.getDepartment()));
                }
                trepo.save(teacher);
            }
            case "admin" -> {
                AdminEntity admin = arepo.findByUser(user)
                        .orElseThrow(() -> notFound("Administrator record not found"));
                if (!isBlank(req.getFirstName())) {
                    admin.setFname(req.getFirstName().trim());
                }
                if (req.getLastName() != null) {
                    admin.setLname(req.getLastName().trim());
                }
                arepo.save(admin);
            }
            default -> throw bad("This account has no role");
        }

        return toResponse(user);
    }

    @Transactional
    public void changePassword(Long id, UserRequest req) {
        if (req == null || isBlank(req.getCurrentPassword()) || isBlank(req.getNewPassword())) {
            throw bad("currentPassword and newPassword are required");
        }
        if (req.getNewPassword().length() < 8) {
            throw bad("New password must be at least 8 characters");
        }

        UserProfile user = findUser(id);
        if (user.getPassword() == null || !encoder.matches(req.getCurrentPassword(), user.getPassword())) {
            throw bad("Current password is incorrect");
        }

        user.setPassword(encoder.encode(req.getNewPassword()));
        urepo.save(user);
    }

    // ---------------------------------------------------------------
    // helpers
    // ---------------------------------------------------------------

    private UserResponse toResponse(UserProfile user) {
        String role = roleOf(user);
        String first = "";
        String last = "";
        Integer year = null;
        String section = null;
        String department = null;

        switch (role) {
            case "student" -> {
                StudentEntity s = srepo.findByUser(user).orElse(null);
                if (s != null) {
                    first = s.getFirstName();
                    last = s.getLastName();
                    year = s.getYearLevel();
                    section = s.getSection();
                }
            }
            case "teacher" -> {
                TeacherEntity t = trepo.findByUser(user).orElse(null);
                if (t != null) {
                    first = t.getFirstName() == null ? "" : t.getFirstName();
                    last = t.getLastName() == null ? "" : t.getLastName();
                    department = t.getDepartment();
                }
            }
            case "admin" -> {
                AdminEntity a = arepo.findByUser(user).orElse(null);
                if (a != null) {
                    first = a.getFname() == null ? "" : a.getFname();
                    last = a.getLname() == null ? "" : a.getLname();
                }
            }
            default -> {
            }
        }

        return new UserResponse(user.getUserID(), role, user.getUsername(), first, last,
                user.getEmail(), year, section, department);
    }

    private UserProfile findUser(Long id) {
        return urepo.findById(id).orElseThrow(() -> notFound("User not found"));
    }

    private String roleOf(UserProfile user) {
        return user.getRole() == null ? "" : user.getRole().getRoleName().toLowerCase();
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private String blankToNull(String value) {
        return isBlank(value) ? null : value.trim();
    }

    private ResponseStatusException bad(String message) {
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
    }

    private ResponseStatusException notFound(String message) {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, message);
    }
}