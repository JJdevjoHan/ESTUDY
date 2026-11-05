package com.csit321G3.powertres.estudy.service;

import com.csit321G3.powertres.estudy.dto.AuthResponse;
import com.csit321G3.powertres.estudy.dto.LoginRequest;
import com.csit321G3.powertres.estudy.dto.RegisterRequest;
import com.csit321G3.powertres.estudy.exception.AccountDisabledException;
import com.csit321G3.powertres.estudy.exception.InvalidCredentialsException;
import com.csit321G3.powertres.estudy.model.UserProfile;
import com.csit321G3.powertres.estudy.repository.UserProfileRepository;
import com.csit321G3.powertres.estudy.security.JwtService;
import java.util.Locale;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Register and log in. Admin accounts are created by an admin (POST /api/admin/users) or by the startup seed. */
@Service
public class AuthService {

    private final AccountService accountService;
    private final UserProfileRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(AccountService accountService,
                       UserProfileRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.accountService = accountService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String[] name = splitFullName(request.fullName());
        UserProfile user = accountService.create(
                request.role(), name[0], name[1], request.email(), request.schoolId(), request.password());
        return issueToken(user, false);
    }

    /** "email" may be the email address or the username (school ID). */
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String identifier = request.email().trim();
        UserProfile user = userRepository.findByEmail(identifier.toLowerCase(Locale.ROOT))
                .or(() -> userRepository.findByUsername(identifier))
                .filter(candidate -> passwordEncoder.matches(request.password(), candidate.getPassword()))
                .orElseThrow(InvalidCredentialsException::new);

        if (!user.isEnabled()) {
            throw new AccountDisabledException();
        }
        return issueToken(user, Boolean.TRUE.equals(request.rememberMe()));
    }

    private AuthResponse issueToken(UserProfile user, boolean rememberMe) {
        return AuthResponse.of(
                accountService.toResponse(user),
                jwtService.generateToken(user, rememberMe),
                jwtService.lifetime(rememberMe).toSeconds());
    }

    /** The registration form has one "full name" box; the ERD has first and last name. Split at the last space. */
    static String[] splitFullName(String fullName) {
        String name = fullName.trim().replaceAll("\\s+", " ");
        int cut = name.lastIndexOf(' ');
        return cut < 0 ? new String[] {name, ""} : new String[] {name.substring(0, cut), name.substring(cut + 1)};
    }
}
