package com.csit321G3.powertres.role.user.teacher;

import com.csit321G3.powertres.role.user.UserProfile;
import jakarta.persistence.*;
@Entity
@Table(name = "teacher")
public class TeacherEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private Long teacherID;
    @OneToOne
    @JoinColumn(name = "userID")
    
    private UserProfile userProfile;
    private String fName;
    private String lName;
    private String department;
    
    public TeacherEntity() {}
    
    public Long getTeacherID() 
    {
        return teacherID;
    }
    public void setTeacherID(Long teacherID) {
        this.teacherID = teacherID;
    }
    
    public UserProfile getUserProfile() {
        return userProfile;
    }
    
    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public String getFName() {
        return fName;
    }

    public void setFName(String fName) {
        this.fName = fName;
    }

    public String getLName() {
        return lName;
    }

    public void setLName(String lName) {
        this.lName = lName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
    this.department = department;
    }
}
