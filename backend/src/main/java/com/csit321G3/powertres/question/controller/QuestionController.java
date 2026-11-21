package com.csit321G3.powertres.question.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.csit321G3.powertres.question.dto.QuestionResponse;
import com.csit321G3.powertres.question.dto.QuestionResponse.Option;
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

    // For the test page: questions of one subject, WITHOUT the correct answers.
    @GetMapping("/getQuestionsBySubject/{subject}")
    public List<QuestionResponse> getQuestionsBySubject(@PathVariable String subject) {
        return questions.findBySubject(subject).stream()
                .map(q -> new QuestionResponse(q.getQuestionId(), q.getTopic(), q.getText(), List.of(
                        new Option("a", q.getOptionA()),
                        new Option("b", q.getOptionB()),
                        new Option("c", q.getOptionC()),
                        new Option("d", q.getOptionD()))))
                .toList();
    }
}
