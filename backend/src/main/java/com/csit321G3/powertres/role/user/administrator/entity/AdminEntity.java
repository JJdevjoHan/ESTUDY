package com.csit321G3.powertres.role.user.administrator.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "administrator")
public class AdminEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int adminid;
    private int userid;
    private String fname;
    private String lname;
    private String accesslevel;

    public AdminEntity() {
    }

    // Setters
    public void setAdminid(int adminid) {
        this.adminid = adminid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public void setAccesslevel(String accesslevel) {
        this.accesslevel = accesslevel;
    }

    // Getters
    public int getAdminid() {
        return adminid;
    }

    public int getUserid() {
        return userid;
    }

    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }

    public String getAccesslevel() {
        return accesslevel;
    }
}