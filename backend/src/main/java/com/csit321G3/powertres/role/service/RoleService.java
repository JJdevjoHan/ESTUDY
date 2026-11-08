package com.csit321G3.powertres.role.service;

import com.csit321G3.powertres.role.entity.RoleEntity;
import com.csit321G3.powertres.role.repository.RoleRepository;
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

    public List<RoleEntity> list() {
        return roles.findAll();
    }

    public RoleEntity get(Long id) {
        return roles.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));
    }

    public RoleEntity create(String roleName) {
        String name = clean(roleName);
        if (roles.findByRoleName(name).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Role already exists");
        }
        RoleEntity role = new RoleEntity();
        role.setRoleName(name);
        return roles.save(role);
    }

    public RoleEntity update(Long id, String roleName) {
        RoleEntity role = get(id);
        String name = clean(roleName);
        if (roles.findByRoleName(name).filter(r -> !r.getRoleId().equals(id)).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Role already exists");
        }
        role.setRoleName(name);
        return roles.save(role);
    }

    public void delete(Long id) {
        RoleEntity role = get(id);
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
