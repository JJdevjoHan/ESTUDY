package com.csit321G3.powertres.role;

import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/** The rules for roles. The controller calls this; this calls the repository. */
@Service
public class RoleService {

    private final RoleRepository roles;

    public RoleService(RoleRepository roles) {
        this.roles = roles;
    }

    public List<Role> list() {
        return roles.findAll();
    }

    public Role get(Long id) {
        return roles.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));
    }

    public Role create(String roleName) {
        String name = clean(roleName);
        if (roles.findByRoleName(name).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Role already exists");
        }
        Role role = new Role();
        role.setRoleName(name);
        return roles.save(role);
    }

    public Role update(Long id, String roleName) {
        Role role = get(id);
        String name = clean(roleName);
        if (roles.findByRoleName(name).filter(r -> !r.getRoleId().equals(id)).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Role already exists");
        }
        role.setRoleName(name);
        return roles.save(role);
    }

    public void delete(Long id) {
        Role role = get(id);
        try {
            roles.delete(role);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Role is still used by an account");
        }
    }

    private String clean(String name) {
        if (name == null || name.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "roleName is required");
        }
        return name.trim().toUpperCase();
    }
}
