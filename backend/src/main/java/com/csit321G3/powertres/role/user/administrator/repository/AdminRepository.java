package com.csit321G3.powertres.role.user.administrator.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csit321G3.powertres.role.user.administrator.entity.AdminEntity;

public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {
}