package com.csit321g3.powertres.estudy.security;

import com.csit321g3.powertres.estudy.repository.UserProfileRepository;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Runs before every request. If it finds a valid "Authorization: Bearer <token>" it marks the request as
 * logged in, with the role taken from the database (so role changes and disabled accounts apply immediately).
 * A missing or bad token just leaves the request anonymous; SecurityConfig then answers 401 where login is needed.
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String PREFIX = "Bearer ";

    private final JwtService jwtService;
    private final UserProfileRepository userRepository;

    public JwtAuthenticationFilter(JwtService jwtService, UserProfileRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith(PREFIX)) {
            try {
                Long userId = jwtService.extractUserId(header.substring(PREFIX.length()).trim());
                userRepository.findById(userId).filter(user -> user.isEnabled()).ifPresent(user -> {
                    String role = user.getRole().getRoleName();
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            new AuthUser(user.getUserId(), role), null,
                            List.of(new SimpleGrantedAuthority("ROLE_" + role)));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                });
            } catch (JwtException | IllegalArgumentException ex) {
                // invalid or expired token: stay anonymous
            }
        }
        chain.doFilter(request, response);
    }
}
