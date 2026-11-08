package com.csit321G3.powertres.role.user.administrator.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import com.csit321G3.powertres.role.user.administrator.repository.AdminRepository;
import com.csit321G3.powertres.role.user.administrator.entity.AdminEntity;

public class AdminService {

    @Autowired
    AdminRepository arepo;

    public AdminService() {
        // TODO Auto-generated constructor stub
    }

    // C - Create
    public AdminEntity postAdmin(AdminEntity admin) {
        return arepo.save(admin);
    }

    // R - Read
    public List<AdminEntity> getAllAdmins() {
        return arepo.findAll();
    }

    // U - Update
    public AdminEntity putAdmin(int id, AdminEntity newAdminDetails) {
        AdminEntity admin = arepo.findById(id).get();
        admin.setFname(newAdminDetails.getFname());
        admin.setLname(newAdminDetails.getLname());
        admin.setAccesslevel(newAdminDetails.getAccesslevel());
        return arepo.save(admin);
    }

    // D - Delete
    public String deleteAdmin(int id) {
        arepo.deleteById(id);
        return "Administrator " + id + " is successfully deleted!";
    }
}