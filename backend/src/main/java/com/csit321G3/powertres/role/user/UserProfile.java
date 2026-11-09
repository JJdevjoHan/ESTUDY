package com.csit321G3.powertres.role.user;

import com.csit321G3.powertres.role.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String fName;
    private String lName;

    @Column(nullable = false, unique = true)
    private String email;

    /** The school ID (e.g. 2024-0001). */
    @Column(nullable = false, unique = true)
    private String username;

    /** BCrypt hash, never the real password. */
    @Column(nullable = false)
    private String password;

    @ManyToOne(optional = false)
    private Role role;

    public Long getUserId() { return userId; }
    public String getFName() { return fName; }
    public void setFName(String fName) { this.fName = fName; }
    public String getLName() { return lName; }
    public void setLName(String lName) { this.lName = lName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
