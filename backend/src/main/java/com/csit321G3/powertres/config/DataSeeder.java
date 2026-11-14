package com.csit321G3.powertres.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.csit321G3.powertres.role.entity.RoleEntity;
import com.csit321G3.powertres.role.repository.RoleRepository;

//ang fixed role ky naa jd sya sa database, so if wala pa, i-add nato sya.
@Component
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roles;

    public DataSeeder(RoleRepository roles) {
        this.roles = roles;
    }

    @Override
    public void run(String... args) {
        for (String name : List.of("STUDENT", "TEACHER", "ADMIN")) {
            if (roles.findByRoleName(name).isEmpty()) {
                RoleEntity role = new RoleEntity();
                role.setRoleName(name);
                roles.save(role);
            }
        }
    }
}