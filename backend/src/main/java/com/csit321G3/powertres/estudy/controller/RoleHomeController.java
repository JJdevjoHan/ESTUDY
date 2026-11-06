package com.csit321G3.powertres.estudy.controller;

import com.csit321G3.powertres.estudy.dto.UserResponse;
import com.csit321G3.powertres.estudy.security.AuthUser;
import com.csit321G3.powertres.estudy.service.AccountService;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * "Open student/teacher/admin home" from the activity diagram. Each URL is locked to its role in SecurityConfig,
 * so these double as a live example of role-based access. Teammates: put your feature's endpoints under
 * /api/student/..., /api/teacher/... or /api/admin/... and they are protected automatically.
 */
@RestController
public class RoleHomeController {

    private final AccountService accountService;

    public RoleHomeController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/api/student/home")
    public Map<String, Object> studentHome(@AuthenticationPrincipal AuthUser me) {
        return home(me, "Student");
    }

    @GetMapping("/api/teacher/home")
    public Map<String, Object> teacherHome(@AuthenticationPrincipal AuthUser me) {
        return home(me, "Teacher");
    }

    @GetMapping("/api/admin/home")
    public Map<String, Object> adminHome(@AuthenticationPrincipal AuthUser me) {
        return home(me, "Admin");
    }

    private Map<String, Object> home(AuthUser me, String label) {
        UserResponse user = accountService.get(me.id());
        return Map.of("role", user.role(), "message", "Welcome to the " + label + " home, " + user.fullName() + "!");
    }
}
