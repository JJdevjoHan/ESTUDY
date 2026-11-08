package com.csit321G3.powertres.role.user.administrator.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.csit321G3.powertres.role.user.administrator.entity.AdminEntity;
import com.csit321G3.powertres.role.user.administrator.service.AdminService;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/admin/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    AdminService aserv;

    public AdminController() {
        // TODO Auto-generated constructor stub
    }

    // C - Create
    @PostMapping("/postNewAdmin")
    public AdminEntity postAdmin(@RequestBody AdminEntity admin) {
        return aserv.postAdmin(admin);
    }

    // R - Read
    @GetMapping("/getAllAdmins")
    public List<AdminEntity> getAllAdmins() {
        return aserv.getAllAdmins();
    }

    // U - Update
    @PutMapping("/putAdmin")
    public AdminEntity putAdmin(@RequestParam int id, @RequestBody AdminEntity newAdminDetails) {
        return aserv.putAdmin(id, newAdminDetails);
    }

    // D - Delete
    @DeleteMapping("/deleteAdmin/{id}")
    public String deleteAdmin(@PathVariable int id) {
        return aserv.deleteAdmin(id);
    }
}