package com.csit321G3.powertres.role.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "roles")
public class RoleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;

    @Column(nullable = false, unique = true)
    private String roleName;

    //for jpa default constructor
    public RoleEntity() 
    {
        //default
    }

    public Long getRoleId() 
    { return roleId; 
        
    }
    
    //setter for roleId
    public void setRoleId(Long roleId) 
    { 
        this.roleId = roleId; 
    }

    public String getRoleName() 
    { 
        return roleName; 
    }

    public void setRoleName(String roleName) 
    { 
        this.roleName = roleName; 
    }
}