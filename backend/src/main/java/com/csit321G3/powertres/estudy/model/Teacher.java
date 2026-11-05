package com.csit321G3.powertres.estudy.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/** ERD entity "Teacher". One row per Teacher account, linked to its UserProfile by user_id. */
@Entity
@Table(name = "teachers")
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    private Long teacherId;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserProfile user;

    @Column(name = "first_name", nullable = false, length = 50)
    private String fName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lName;

    @Column(length = 100)
    private String department;

    protected Teacher() {
    }

    public Teacher(UserProfile user, String fName, String lName) {
        this.user = user;
        this.fName = fName;
        this.lName = lName;

    }

    public Long getTeacherId() { return teacherId; }
    public UserProfile getUser() { return user; }
    public String getFName() { return fName; }
    public void setFName(String fName) { this.fName = fName; }
    public String getLName() { return lName; }
    public void setLName(String lName) { this.lName = lName; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}
