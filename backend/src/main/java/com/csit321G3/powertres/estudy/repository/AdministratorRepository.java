package com.csit321G3.powertres.estudy.repository;

import com.csit321G3.powertres.estudy.model.Administrator;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministratorRepository extends JpaRepository<Administrator, Long> {

    Optional<Administrator> findByUser_UserId(Long userId);
}
