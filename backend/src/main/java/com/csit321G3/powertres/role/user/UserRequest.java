package com.csit321G3.powertres.role.user;

public class UserRequest {
    private String username;
    private String email;
    private String password;
    private String roleType;

    public String getUsername() 
    { return username; 

    }
    public void setUsername(String username) 
    { 
        this.username = username; 
    }

    public String getEmail() 
    { 
        return email; 
    }
    public void setEmail(String email) 
    { 
        this.email = email; 
    }

    public String getPassword() 
    { 
        return password; 
    }
    public void setPassword(String password) 
    { 
        this.password = password; 
    }

    public String getRoleType() 
    { 
        return roleType; 
    }
    public void setRoleType(String roleType) 
    { this.roleType = roleType; 
        
    }
}
