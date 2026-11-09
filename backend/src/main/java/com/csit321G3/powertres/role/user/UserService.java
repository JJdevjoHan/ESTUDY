package com.csit321G3.powertres.role.user;

import com.csit321G3.powertres.role.Role;
import com.csit321G3.powertres.role.RoleRepository;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

/**
 * The rules for accounts: unique email and school ID, password hashing, and keeping the
 * Student / Teacher / Administrator row in step with the role. The controller calls this.
 */
@Service
public class UserService {

    private final UserRepository users;
    private final StudentRepository students;
    private final TeacherRepository teachers;
    private final AdministratorRepository admins;
    private final RoleRepository roles;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository users, StudentRepository students, TeacherRepository teachers,
                       AdministratorRepository admins, RoleRepository roles) {
        this.users = users;
        this.students = students;
        this.teachers = teachers;
        this.admins = admins;
        this.roles = roles;
    }

    // ---------- READ ----------

    public List<Map<String, Object>> list(String role) {
        List<UserProfile> found = role == null ? users.findAll() : users.findByRoleRoleName(role.trim().toUpperCase());
        return found.stream().map(this::view).toList();
    }

    public Map<String, Object> get(Long id) {
        return view(find(id));
    }

    // ---------- CREATE ----------

    @Transactional
    public Map<String, Object> create(UserRequest r) {
        require(r.fName(), "fName");
        require(r.lName(), "lName");
        require(r.email(), "email");
        require(r.username(), "username");
        require(r.password(), "password");
        if (users.findByEmailIgnoreCase(r.email().trim()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }
        if (users.findByUsername(r.username().trim()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "School ID is already registered");
        }
        UserProfile u = new UserProfile();
        u.setFName(r.fName().trim());
        u.setLName(r.lName().trim());
        u.setEmail(r.email().trim());
        u.setUsername(r.username().trim());
        u.setPassword(encoder.encode(r.password()));
        u.setRole(findRole(r.role()));
        users.save(u);
        saveDetails(u, r);
        return view(u);
    }

    // ---------- UPDATE ----------

    @Transactional
    public Map<String, Object> update(Long id, UserRequest r) {
        UserProfile u = find(id);
        if (has(r.fName())) u.setFName(r.fName().trim());
        if (has(r.lName())) u.setLName(r.lName().trim());
        if (has(r.email()) && !r.email().trim().equalsIgnoreCase(u.getEmail())) {
            if (users.findByEmailIgnoreCase(r.email().trim()).isPresent()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
            }
            u.setEmail(r.email().trim());
        }
        if (has(r.username()) && !r.username().trim().equals(u.getUsername())) {
            if (users.findByUsername(r.username().trim()).isPresent()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "School ID is already registered");
            }
            u.setUsername(r.username().trim());
        }
        if (has(r.password())) u.setPassword(encoder.encode(r.password()));
        if (has(r.role())) u.setRole(findRole(r.role()));
        users.save(u);
        saveDetails(u, r);
        return view(u);
    }

    // ---------- DELETE ----------

    @Transactional
    public void delete(Long id) {
        UserProfile u = find(id);
        students.findByUser(u).ifPresent(students::delete);
        teachers.findByUser(u).ifPresent(teachers::delete);
        admins.findByUser(u).ifPresent(admins::delete);
        users.delete(u);
    }

    // ---------- LOGIN (used by the React login page) ----------

    public Map<String, Object> login(String who, String password) { // who = the email OR the school ID
        if (!has(who) || !has(password)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password are required");
        }
        UserProfile u = users.findByEmailIgnoreCase(who.trim())
                .or(() -> users.findByUsername(who.trim()))
                .orElse(null);
        if (u == null || !encoder.matches(password, u.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("user", view(u));
        return result;
    }

    // ---------- helpers ----------

    private UserProfile find(Long id) {
        return users.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private boolean has(String s) {
        return s != null && !s.isBlank();
    }

    private void require(String value, String field) {
        if (!has(value)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, field + " is required");
        }
    }

    /** STUDENT, TEACHER and ADMIN are created automatically the first time they are used. */
    private Role findRole(String name) {
        require(name, "role");
        String n = name.trim().toUpperCase();
        return roles.findByRoleName(n).orElseGet(() -> {
            if (n.equals("STUDENT") || n.equals("TEACHER") || n.equals("ADMIN")) {
                Role role = new Role();
                role.setRoleName(n);
                return roles.save(role);
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown role: " + n);
        });
    }

    /** Keeps the Student / Teacher / Administrator row in step with the account's role. */
    private void saveDetails(UserProfile u, UserRequest r) {
        String role = u.getRole().getRoleName();
        if (!role.equals("STUDENT")) students.findByUser(u).ifPresent(students::delete);
        if (!role.equals("TEACHER")) teachers.findByUser(u).ifPresent(teachers::delete);
        if (!role.equals("ADMIN")) admins.findByUser(u).ifPresent(admins::delete);

        if (role.equals("STUDENT")) {
            Student s = students.findByUser(u).orElseGet(() -> new Student(u));
            if (r.yearLevel() != null) s.setYearLevel(r.yearLevel());
            if (r.section() != null) s.setSection(r.section());
            students.save(s);
        } else if (role.equals("TEACHER")) {
            Teacher t = teachers.findByUser(u).orElseGet(() -> new Teacher(u));
            if (r.department() != null) t.setDepartment(r.department());
            teachers.save(t);
        } else if (role.equals("ADMIN")) {
            Administrator a = admins.findByUser(u).orElseGet(() -> new Administrator(u));
            if (r.accessLevel() != null) a.setAccessLevel(r.accessLevel());
            admins.save(a);
        }
    }

    /** What we send back as JSON (never includes the password). */
    private Map<String, Object> view(UserProfile u) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", u.getUserId());
        m.put("fName", u.getFName());
        m.put("lName", u.getLName());
        m.put("fullName", u.getFName() + " " + u.getLName());
        m.put("email", u.getEmail());
        m.put("username", u.getUsername());
        m.put("role", u.getRole().getRoleName().toLowerCase());
        students.findByUser(u).ifPresent(s -> {
            m.put("yearLevel", s.getYearLevel());
            m.put("section", s.getSection());
        });
        teachers.findByUser(u).ifPresent(t -> m.put("department", t.getDepartment()));
        admins.findByUser(u).ifPresent(a -> m.put("accessLevel", a.getAccessLevel()));
        return m;
    }
}
