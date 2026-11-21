package com.csit321G3.powertres.attempt.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.csit321G3.powertres.attempt.dto.AttemptRequest;
import com.csit321G3.powertres.attempt.dto.AttemptResponse;
import com.csit321G3.powertres.attempt.dto.AttemptResponse.TopicScore;
import com.csit321G3.powertres.attempt.entity.AttemptDetailEntity;
import com.csit321G3.powertres.attempt.entity.AttemptEntity;
import com.csit321G3.powertres.attempt.repository.AttemptDetailRepository;
import com.csit321G3.powertres.attempt.repository.AttemptRepository;
import com.csit321G3.powertres.question.entity.QuestionEntity;
import com.csit321G3.powertres.question.repository.QuestionRepository;
import com.csit321G3.powertres.role.user.UserProfile;
import com.csit321G3.powertres.role.user.UserRepository;
import com.csit321G3.powertres.role.user.student.entity.StudentEntity;
import com.csit321G3.powertres.role.user.student.repository.StudentRepository;

@Service
public class AttemptService {

    private final AttemptRepository attempts;
    private final AttemptDetailRepository details;
    private final QuestionRepository questions;
    private final StudentRepository students;
    private final UserRepository users;

    public AttemptService(AttemptRepository attempts, AttemptDetailRepository details,
                          QuestionRepository questions, StudentRepository students, UserRepository users) {
        this.attempts = attempts;
        this.details = details;
        this.questions = questions;
        this.students = students;
        this.users = users;
    }

    @Transactional
    public AttemptResponse submit(AttemptRequest req) {
        if (req.getSubject() == null || (req.getStudentId() == null && req.getUserId() == null)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "subject and either studentId or userId are required");
        }
        StudentEntity student = findStudent(req);
        List<QuestionEntity> subjectQuestions = questions.findBySubject(req.getSubject());
        if (subjectQuestions.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No questions for this subject");
        }
        Map<Long, String> answers = req.getAnswers() == null ? Map.of() : req.getAnswers();

        int correct = 0;
        boolean allAnswered = true;
        // topic -> {correct, total}
        Map<String, int[]> topicCounts = new LinkedHashMap<>();
        // (question, isCorrect) kept so details can be saved after the attempt has an id
        Map<QuestionEntity, Boolean> results = new LinkedHashMap<>();

        for (QuestionEntity q : subjectQuestions) {
            String chosen = answers.get(q.getQuestionId());
            if (chosen == null || chosen.isBlank()) {
                allAnswered = false;
            }
            boolean isCorrect = chosen != null && chosen.equalsIgnoreCase(q.getCorrectOption());
            if (isCorrect) {
                correct++;
            }
            int[] counts = topicCounts.computeIfAbsent(q.getTopic(), t -> new int[2]);
            counts[1]++;
            if (isCorrect) {
                counts[0]++;
            }
            results.put(q, isCorrect);
        }

        int total = subjectQuestions.size();
        double score = ScoreCalculator.percent(correct, total);
        String status = allAnswered ? "Completed" : "Incomplete";

        AttemptEntity attempt = attempts.save(
                new AttemptEntity(student, req.getSubject(), correct, total, score, status));
        results.forEach((q, ok) ->
                details.save(new AttemptDetailEntity(attempt, q.getQuestionId(), q.getTopic(), ok)));

        Map<String, TopicScore> byTopic = new LinkedHashMap<>();
        topicCounts.forEach((topic, c) ->
                byTopic.put(topic, new TopicScore(c[0], c[1], ScoreCalculator.percent(c[0], c[1]))));
        return toResponse(attempt, byTopic);
    }

    // The frontend knows the logged-in userId; Postman can send studentId directly.
    private StudentEntity findStudent(AttemptRequest req) {
        if (req.getStudentId() != null) {
            return students.findById(req.getStudentId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
        }
        UserProfile user = users.findById(req.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return students.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "This user is not a student"));
    }

    public List<AttemptResponse> list() {
        return attempts.findAll().stream().map(a -> toResponse(a, byTopicOf(a))).toList();
    }

    public List<AttemptResponse> listForStudent(Long studentId) {
        return attempts.findByStudentStudentIdOrderByDateTakenDesc(studentId)
                .stream().map(a -> toResponse(a, byTopicOf(a))).toList();
    }

    public AttemptResponse get(Long attemptId) {
        AttemptEntity a = attempts.findById(attemptId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attempt not found"));
        return toResponse(a, byTopicOf(a));
    }

    @Transactional
    public void delete(Long attemptId) {
        if (!attempts.existsById(attemptId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Attempt not found");
        }
        details.deleteByAttemptAttemptId(attemptId);
        attempts.deleteById(attemptId);
    }

    // Rebuilds the per-topic breakdown from the saved detail rows.
    private Map<String, TopicScore> byTopicOf(AttemptEntity attempt) {
        Map<String, int[]> counts = new LinkedHashMap<>();
        for (AttemptDetailEntity d : details.findByAttemptAttemptId(attempt.getAttemptId())) {
            int[] c = counts.computeIfAbsent(d.getTopic(), t -> new int[2]);
            c[1]++;
            if (d.isCorrect()) {
                c[0]++;
            }
        }
        Map<String, TopicScore> out = new LinkedHashMap<>();
        counts.forEach((t, c) -> out.put(t, new TopicScore(c[0], c[1], ScoreCalculator.percent(c[0], c[1]))));
        return out;
    }

    private AttemptResponse toResponse(AttemptEntity a, Map<String, TopicScore> byTopic) {
        return new AttemptResponse(a.getAttemptId(), a.getSubject(), a.getCorrect(), a.getTotal(),
                a.getScore(), a.getStatus(), a.getDateTaken(), byTopic);
    }
}
