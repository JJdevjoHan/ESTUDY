package com.csit321G3.powertres.role.user.teacher.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.csit321G3.powertres.role.user.teacher.dto.TeacherRequest;
import com.csit321G3.powertres.role.user.teacher.dto.TeacherResponse;
import com.csit321G3.powertres.role.user.teacher.service.TeacherService;

@RestController
@RequestMapping("/api/teacher")
@CrossOrigin(origins = { "http://localhost:3000" })
public class TeacherController {

    private final TeacherService service;

    public TeacherController(TeacherService service) {
        this.service = service;
    }

    // C - create (POST)
    @PostMapping("/newPostTeacher")
    @ResponseStatus(HttpStatus.CREATED)
    public TeacherResponse newPostTeacher(@RequestBody TeacherRequest request) {
        return service.create(request);
    }

    // R - read (GET)
    @GetMapping("/getAllTeacher")
    public List<TeacherResponse> getAllTeacher() {
        return service.list();
    }

    @GetMapping("/getTeacher/{teacherId}")
    public TeacherResponse getTeacher(@PathVariable Long teacherId) {
        return service.get(teacherId);
    }

    @GetMapping("/getTeacherByUser/{userId}")
    public TeacherResponse getTeacherByUser(@PathVariable Long userId) {
        return service.getByUserId(userId);
    }

    //update (PUT)
    @PutMapping("/putTeacher")
    public TeacherResponse putTeacher(@RequestParam Long teacherId, @RequestBody TeacherRequest request) {
        return service.update(teacherId, request);
    }

    //delete (DELETE)
    @DeleteMapping("/deleteTeacher/{teacherId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTeacher(@PathVariable Long teacherId) {
        service.delete(teacherId);
    }
}