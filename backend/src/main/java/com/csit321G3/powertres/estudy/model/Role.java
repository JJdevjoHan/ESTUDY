package com.csit321g3.powertres.estudy.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** ERD entity "Role" (RoleID, RoleName). */
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long roleId;

    @Column(name = "role_name", nullable = false, unique = true, length = 30)
    private String roleName;

    protected Role() {
    }

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public Long getRoleId() { return roleId; }
    public String getRoleName() { return roleName; }
}
