package com.csit321G3.powertres.role.controller;

import com.csit321G3.powertres.role.entity.RoleEntity;
import com.csit321G3.powertres.role.service.RoleService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/** URLs for roles. Send JSON like { "roleName": "Coordinator" }. */
@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService service;

    public RoleController(RoleService service) {
        this.service = service;
    }

    @GetMapping
    public List<RoleEntity> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public RoleEntity get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoleEntity create(@RequestBody RoleEntity body) {
        return service.create(body.getRoleName());
    }

    @PutMapping("/{id}")
    public RoleEntity update(@PathVariable Long id, @RequestBody RoleEntity body) {
        return service.update(id, body.getRoleName());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
