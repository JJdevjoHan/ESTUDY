package com.csit321G3.powertres.estudy.security;

import com.csit321G3.powertres.estudy.model.UserProfile;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.time.Duration;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/** Creates and reads the login tokens (JWT). The token only carries the user id; the role is re-read from the database. */
@Service
public class JwtService {

    private final SecretKey key;
    private final Duration normalLifetime;
    private final Duration rememberMeLifetime;

    public JwtService(@Value("${app.jwt.secret}") String base64Secret,
                      @Value("${app.jwt.expiration-minutes:60}") long expirationMinutes,
                      @Value("${app.jwt.remember-me-days:7}") long rememberMeDays) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(base64Secret));
        this.normalLifetime = Duration.ofMinutes(expirationMinutes);
        this.rememberMeLifetime = Duration.ofDays(rememberMeDays);
    }

    public Duration lifetime(boolean rememberMe) {
        return rememberMe ? rememberMeLifetime : normalLifetime;
    }

    public String generateToken(UserProfile user, boolean rememberMe) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + lifetime(rememberMe).toMillis());
        return Jwts.builder()
                .subject(String.valueOf(user.getUserId()))
                .claim("role", user.getRole().getRoleName())
                .issuedAt(now)
                .expiration(expiry)
                .signWith(key)
                .compact();
    }

    /** Returns the user id inside a valid token. Throws JwtException / IllegalArgumentException if invalid or expired. */
    public Long extractUserId(String token) {
        Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
        try {
            return Long.valueOf(claims.getSubject());
        } catch (NumberFormatException ex) {
            throw new JwtException("Invalid token subject");
        }
    }
}
