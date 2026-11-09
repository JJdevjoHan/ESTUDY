package com.csit321G3.powertres.role.user.student.controller;

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

import com.csit321G3.powertres.role.user.student.dto.StudentRequest;
import com.csit321G3.powertres.role.user.student.dto.StudentResponse;
import com.csit321G3.powertres.role.user.student.service.StudentService;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = { "http://localhost:3000" })
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping("/newPostStudent")
    @ResponseStatus(HttpStatus.CREATED)
    public StudentResponse newPostStudent(@RequestBody StudentRequest request) {
        return service.create(request);
    }

    @GetMapping("/getAllStudent")
    public List<StudentResponse> getAllStudent() {
        return service.list();
    }

    @GetMapping("/getStudent/{studentId}")
    public StudentResponse getStudent(@PathVariable Long studentId) {
        return service.get(studentId);
    }

    @GetMapping("/getStudentByUser/{userId}")
    public StudentResponse getStudentByUser(@PathVariable Long userId) {
        return service.getByUserId(userId);
    }

    @PutMapping("/putStudent")
    public StudentResponse putStudent(
            @RequestParam Long studentId,
            @RequestBody StudentRequest request) {
        return service.update(studentId, request);
    }

    @DeleteMapping("/deleteStudent/{studentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStudent(@PathVariable Long studentId) {
        service.delete(studentId);
    }
}
