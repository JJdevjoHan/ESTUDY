package com.csit321G3.powertres.attempt.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.csit321G3.powertres.attempt.dto.AttemptRequest;
import com.csit321G3.powertres.attempt.dto.AttemptResponse;
import com.csit321G3.powertres.attempt.service.AttemptService;

@RestController
@RequestMapping("/api/attempt")
@CrossOrigin(origins = {"http://localhost:3000"})
public class AttemptController {

    private final AttemptService service;

    public AttemptController(AttemptService service) {
        this.service = service;
    }

    @PostMapping("/postNewAttempt")
    @ResponseStatus(HttpStatus.CREATED)
    public AttemptResponse postNewAttempt(@RequestBody AttemptRequest request) {
        return service.submit(request);
    }

    @GetMapping("/getAllAttempts")
    public List<AttemptResponse> getAllAttempts() {
        return service.list();
    }

    @GetMapping("/getStudentAttempts/{studentId}")
    public List<AttemptResponse> getStudentAttempts(@PathVariable Long studentId) {
        return service.listForStudent(studentId);
    }

    @GetMapping("/getAttempt/{attemptId}")
    public AttemptResponse getAttempt(@PathVariable Long attemptId) {
        return service.get(attemptId);
    }

    @DeleteMapping("/deleteAttempt/{attemptId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAttempt(@PathVariable Long attemptId) {
        service.delete(attemptId);
    }
}
