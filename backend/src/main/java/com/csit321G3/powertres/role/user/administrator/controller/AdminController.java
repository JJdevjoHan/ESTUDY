package com.csit321G3.powertres.role.user.administrator.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.csit321G3.powertres.role.user.administrator.entity.AdminEntity;
import com.csit321G3.powertres.role.user.administrator.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    AdminService aserv;

    public AdminController() {
        // TODO Auto-generated constructor stub
    }

    //C-create(POST)
    @PostMapping("/postNewAdmin")
    public AdminEntity postAdmin(@RequestBody AdminEntity admin) {
        return aserv.postAdmin(admin);
    }

    //R-read(GET)
    @GetMapping("/getAllAdmins")
    public List<AdminEntity> getAllAdmins() {
        return aserv.getAllAdmins();
    }

    //U-update(PUT)
    @PutMapping("/putAdmin")
    public AdminEntity putAdmin(@RequestParam int id, @RequestBody AdminEntity newAdminDetails) {
        return aserv.putAdmin(id, newAdminDetails);
    }

    //D-delete(DELETE)
    @DeleteMapping("/deleteAdmin/{id}")
    public String deleteAdmin(@PathVariable int id) {
        return aserv.deleteAdmin(id);
    }
}