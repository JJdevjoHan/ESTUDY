package com.csit321G3.powertres.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "teachers")
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teacherId;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id")
    private UserProfile user;

    private String fName;
    private String lName;
    private String department;

    protected Teacher() { }

    public Teacher(UserProfile user) { this.user = user; }

    public String getFName() { return fName; }
    public void setFName(String fName) { this.fName = fName; }
    public String getLName() { return lName; }
    public void setLName(String lName) { this.lName = lName; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}
