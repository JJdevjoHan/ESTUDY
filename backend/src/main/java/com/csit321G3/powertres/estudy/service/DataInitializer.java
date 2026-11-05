package com.csit321g3.powertres.estudy.service;

import com.csit321g3.powertres.estudy.model.Role;
import com.csit321g3.powertres.estudy.model.RoleNames;
import com.csit321g3.powertres.estudy.repository.RoleRepository;
import com.csit321g3.powertres.estudy.repository.UserProfileRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Runs once at startup: makes sure the three roles exist, and creates the first admin if there is none
 * (nobody can register as admin, so without this nobody could ever manage accounts).
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;
    private final UserProfileRepository userRepository;
    private final AccountService accountService;

    @Value("${app.seed-admin.enabled:true}")
    private boolean seedAdmin;
    @Value("${app.seed-admin.email:admin@estudy.local}")
    private String adminEmail;
    @Value("${app.seed-admin.username:ADMIN-001}")
    private String adminUsername;
    @Value("${app.seed-admin.password:Admin12345}")
    private String adminPassword;

    public DataInitializer(RoleRepository roleRepository, UserProfileRepository userRepository,
                           AccountService accountService) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.accountService = accountService;
    }

    @Override
    @Transactional
    public void run(String... args) {
        for (String name : List.of(RoleNames.STUDENT, RoleNames.TEACHER, RoleNames.ADMIN)) {
            if (roleRepository.findByRoleName(name).isEmpty()) {
                roleRepository.save(new Role(name));
            }
        }

        Role adminRole = roleRepository.findByRoleName(RoleNames.ADMIN).orElseThrow();
        if (seedAdmin && userRepository.countByRole(adminRole) == 0) {
            accountService.create(RoleNames.ADMIN, "System", "Admin", adminEmail, adminUsername, adminPassword);
            log.warn("Created the first admin account: {} / {}. Change this password before deploying!",
                    adminEmail, adminUsername);
        }
    }
}
