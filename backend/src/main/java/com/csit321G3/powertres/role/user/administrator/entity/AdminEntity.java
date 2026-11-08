package com.csit321G3.powertres.role.user.administrator.entity;

import com.csit321G3.powertres.role.user.UserProfile;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "administrator")
public class AdminEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminid;

    @OneToOne
    @JoinColumn(name = "userid")
    private UserProfile userProfile;

    private String fname;
    private String lname;
    private String accesslevel;

    public AdminEntity() {}

    // Getters and Setters
    public Long getAdminid() { 
        return adminid; 
    }
    
    public void setAdminid(Long adminid) { 
        this.adminid = adminid; 
    }

    public UserProfile getUserProfile() { 
        return userProfile; 
    }
    
    public void setUserProfile(UserProfile userProfile) { 
        this.userProfile = userProfile; 
    }

    public String getFname() { 
        return fname; 
    }
    
    public void setFname(String fname) { 
        this.fname = fname; 
    }

    public String getLname() { 
        return lname; 
    }
    
    public void setLname(String lname) { 
        this.lname = lname; 
    }

    public String getAccesslevel() { 
        return accesslevel; 
    }
    
    public void setAccesslevel(String accesslevel) { 
        this.accesslevel = accesslevel; 
    }
}
