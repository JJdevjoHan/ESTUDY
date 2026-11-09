package com.csit321G3.powertres.role.user.student;

import com.csit321G3.powertres.role.user.UserProfile;
import jakarta.persistence.*;

@Entity
@Table(name = "student")
public class StudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentID;

    @OneToOne
    @JoinColumn(name = "userID")
    private UserProfile userProfile;

    private String fName;
    private String lName;
    private String yearLevel;
    private String section;

    public StudentEntity() 
    {
        //default
    }

    public Long getStudentID() 
    {
        return studentID;
    }
    public void setStudentID(Long studentID) 
    { 
        this.studentID = studentID; 
    }

    public UserProfile getUserProfile() 
    { 
        return userProfile; 
    }
    public void setUserProfile(UserProfile userProfile) 
    { 
        this.userProfile = userProfile; 
    }

    public String getFName() 
    { 
        return fName; 
    }
    public void setFName(String fName) 
    { 
        this.fName = fName; 
    }

    public String getLName() 
    { 
        return lName; 
    }
    public void setLName(String lName) 
    { 
        this.lName = lName; 
    }

    public String getYearLevel() 
    { 
        return yearLevel; 
    }
    public void setYearLevel(String yearLevel) 
    { 
        this.yearLevel = yearLevel; 
    }

    public String getSection() 
    { 
        return section; 
    }
    public void setSection(String section) 
    { 
        this.section = section; 
    }
}