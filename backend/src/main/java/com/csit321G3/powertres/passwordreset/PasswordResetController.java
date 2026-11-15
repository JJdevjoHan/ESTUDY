package com.csit321G3.powertres.passwordreset;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000"})
public class PasswordResetController {

    private final PasswordResetService service;

    public PasswordResetController(PasswordResetService service) {
        this.service = service;
    }

  
    @PostMapping("/verify-recovery")
    public Map<String, String> verifyRecovery(@RequestBody Map<String, String> body) {
        String token = service.verifyDetails(body.get("email"), body.get("schoolId"), body.get("fullName"));
        return Map.of("token", token);
    }

   
    @PostMapping("/reset-password")
    public Map<String, String> resetPassword(@RequestBody Map<String, String> body) {
        service.resetPassword(body.get("token"), body.get("email"), body.get("schoolId"), body.get("newPassword"));
        return Map.of("message", "Password updated. You can now log in.");
    }

   
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> handle(ResponseStatusException e) {
        return ResponseEntity.status(e.getStatusCode()).body(Map.of("message", e.getReason()));
    }
}
