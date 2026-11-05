package com.csit321g3.powertres.estudy.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/** ERD entity "Administrator". One row per Administrator account, linked to its UserProfile by user_id. */
@Entity
@Table(name = "administrators")
public class Administrator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long adminId;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserProfile user;

    @Column(name = "first_name", nullable = false, length = 50)
    private String fName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lName;

    @Column(name = "access_level", nullable = false, length = 30)
    private String accessLevel = "STANDARD";

    protected Administrator() {
    }

    public Administrator(UserProfile user, String fName, String lName) {
        this.user = user;
        this.fName = fName;
        this.lName = lName;

    }

    public Long getAdminId() { return adminId; }
    public UserProfile getUser() { return user; }
    public String getFName() { return fName; }
    public void setFName(String fName) { this.fName = fName; }
    public String getLName() { return lName; }
    public void setLName(String lName) { this.lName = lName; }
    public String getAccessLevel() { return accessLevel; }
    public void setAccessLevel(String accessLevel) { this.accessLevel = accessLevel; }
}
