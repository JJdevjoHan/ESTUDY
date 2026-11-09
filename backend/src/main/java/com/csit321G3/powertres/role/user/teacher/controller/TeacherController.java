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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.csit321G3.powertres.role.user.teacher.dto.TeacherRequest;
import com.csit321G3.powertres.role.user.teacher.dto.TeacherResponse;
import com.csit321G3.powertres.role.user.teacher.service.TeacherService;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class TeacherController {

    private final TeacherService service;

    public TeacherController(TeacherService service) {
        this.service = service;
    }

    @GetMapping
    public List<TeacherResponse> list() {
        return service.list();
    }

    @GetMapping("/{teacherId}")
    public TeacherResponse get(@PathVariable Long teacherId) {
        return service.get(teacherId);
    }

    @GetMapping("/user/{userId}")
    public TeacherResponse getByUserId(@PathVariable Long userId) {
        return service.getByUserId(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TeacherResponse create(@RequestBody TeacherRequest request) {
        return service.create(request);
    }

    @PutMapping("/{teacherId}")
    public TeacherResponse update(@PathVariable Long teacherId, @RequestBody TeacherRequest request) {
        return service.update(teacherId, request);
    }

    @DeleteMapping("/{teacherId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long teacherId) {
        service.delete(teacherId);
    }
}