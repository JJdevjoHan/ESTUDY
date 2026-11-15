package com.csit321G3.powertres.question.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.csit321G3.powertres.question.entity.QuestionEntity;
import com.csit321G3.powertres.question.repository.QuestionRepository;

@RestController
@RequestMapping("/api/question")
@CrossOrigin(origins = {"http://localhost:3000"})
public class QuestionController {

    private final QuestionRepository questions;

    public QuestionController(QuestionRepository questions) {
        this.questions = questions;
    }

    @PostMapping("/postNewQuestion")
    @ResponseStatus(HttpStatus.CREATED)
    public QuestionEntity postNewQuestion(@RequestBody QuestionEntity question) {
        return questions.save(question);
    }

    @GetMapping("/getAllQuestions")
    public List<QuestionEntity> getAllQuestions() {
        return questions.findAll();
    }
}
