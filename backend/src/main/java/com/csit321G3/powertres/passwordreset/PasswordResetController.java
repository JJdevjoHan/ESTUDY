package com.csit321G3.powertres.passwordreset;

import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class PasswordResetController {

    private final PasswordResetService service;

    public PasswordResetController(PasswordResetService service) {
        this.service = service;
    }

    @PostMapping("/forgot-password")
    public Map<String, String> forgot(@RequestBody Map<String, String> body) {
        service.requestReset(body.get("email"));
        return Map.of("message", "If that email has an account, a reset link was sent.");
    }

    @PostMapping("/reset-password")
    public Map<String, String> reset(@RequestBody Map<String, String> body) {
        service.resetPassword(body.get("token"), body.get("newPassword"));
        return Map.of("message", "Password updated. You can now log in.");
    }
}
