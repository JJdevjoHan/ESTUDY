package com.csit321G3.powertres.role.user.teacher.entity;

import com.csit321G3.powertres.role.user.UserProfile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "teachers")
public class TeacherEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teacherId;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id")
    private UserProfile user;

    private String department;

    // for JPA
    protected TeacherEntity() {
    }

    public TeacherEntity(UserProfile user) {
        this.user = user;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public UserProfile getUser() {
        return user;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}