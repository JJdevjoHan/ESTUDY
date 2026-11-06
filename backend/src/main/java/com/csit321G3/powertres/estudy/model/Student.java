package com.csit321G3.powertres.estudy.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/** ERD entity "Student". One row per Student account, linked to its UserProfile by user_id. */
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserProfile user;

    @Column(name = "first_name", nullable = false, length = 50)
    private String fName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lName;

    @Column(name = "year_level", length = 30)
    private String yearLevel;

    @Column(length = 30)
    private String section;

    protected Student() {
    }

    public Student(UserProfile user, String fName, String lName) {
        this.user = user;
        this.fName = fName;
        this.lName = lName;

    }

    public Long getStudentId() { return studentId; }
    public UserProfile getUser() { return user; }
    public String getFName() { return fName; }
    public void setFName(String fName) { this.fName = fName; }
    public String getLName() { return lName; }
    public void setLName(String lName) { this.lName = lName; }
    public String getYearLevel() { return yearLevel; }
    public void setYearLevel(String yearLevel) { this.yearLevel = yearLevel; }
    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }
}
