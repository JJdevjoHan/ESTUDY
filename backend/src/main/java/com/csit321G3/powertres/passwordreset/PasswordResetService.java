package com.csit321G3.powertres.passwordreset;

import com.csit321G3.powertres.role.user.UserProfile;
import com.csit321G3.powertres.role.user.UserRepository;
import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/** Account recovery: email a one-time reset link, then save the new password. */
@Service
public class PasswordResetService {

    private final UserRepository users;
    private final PasswordResetRepository tokens;
    private final ObjectProvider<JavaMailSender> mailSender; // empty until spring.mail.* is set
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Value("${estudy.frontend-url:http://localhost:5173}")
    private String frontendUrl;

    public PasswordResetService(UserRepository users, PasswordResetRepository tokens,
                                ObjectProvider<JavaMailSender> mailSender) {
        this.users = users;
        this.tokens = tokens;
        this.mailSender = mailSender;
    }

    /** Always succeeds from the caller's view, so nobody can find out which emails have accounts. */
    public void requestReset(String email) {
        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }
        users.findFirstByEmailIgnoreCase(email.trim()).ifPresent(user -> {
            PasswordResetToken t = new PasswordResetToken();
            t.setToken(UUID.randomUUID().toString());
            t.setUser(user);
            t.setExpiresAt(LocalDateTime.now().plusMinutes(15));
            tokens.save(t);
            send(user.getEmail(), frontendUrl + "/reset-password?token=" + t.getToken());
        });
    }

    public void resetPassword(String token, String newPassword) {
        if (newPassword == null || newPassword.length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters");
        }
        PasswordResetToken t = tokens.findByToken(token == null ? "" : token)
                .filter(found -> !found.isUsed() && found.getExpiresAt().isAfter(LocalDateTime.now()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "This reset link is invalid or has expired"));

        UserProfile user = t.getUser();
        user.setPassword(encoder.encode(newPassword));
        users.save(user);
        t.setUsed(true);
        tokens.save(t);
    }

    private void send(String to, String link) {
        JavaMailSender sender = mailSender.getIfAvailable();
        if (sender == null) { // no SMTP set up: print the link so you can still demo it
            System.out.println("PASSWORD RESET LINK for " + to + ": " + link);
            return;
        }
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(to);
        mail.setSubject("EStudy password reset");
        mail.setText("Click this link to set a new password (valid for 15 minutes):\n" + link
                + "\n\nIf you didn't ask for this, ignore this email.");
        sender.send(mail);
    }
}
