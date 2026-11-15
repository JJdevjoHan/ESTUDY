package com.csit321G3.powertres.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.csit321G3.powertres.question.entity.QuestionEntity;
import com.csit321G3.powertres.question.repository.QuestionRepository;

@Component
public class QuestionSeeder implements CommandLineRunner {

    private final QuestionRepository questions;

    public QuestionSeeder(QuestionRepository questions) {
        this.questions = questions;
    }

    @Override
    public void run(String... args) {
        if (questions.count() > 0) {
            return;  
        }

        add("Algebra: linear equations", "Solve for x: 3(x - 4) + 5 = 2x + 7", "b",
                "x = 10", "x = 14", "x = 16", "x = 18");
        add("Algebra: linear equations", "Solve for x: 2x + 6 = 20", "b",
                "x = 5", "x = 7", "x = 8", "x = 10");
        add("Algebra: factoring", "Factor completely: x² - 9", "b",
                "(x - 3)²", "(x - 3)(x + 3)", "(x + 9)(x - 1)", "(x - 9)(x + 1)");
        add("Algebra: quadratic equations", "What are the solutions of x² - 5x + 6 = 0?", "b",
                "x = 1 and x = 6", "x = 2 and x = 3", "x = -2 and x = -3", "x = 5 and x = 1");
        add("Arithmetic: fractions", "What is 3/4 + 1/6?", "b",
                "4/10", "11/12", "3/8", "5/6");
        add("Geometry: area", "What is the area of a circle with radius 5? Use π = 3.14.", "b",
                "31.4", "78.5", "15.7", "25");
        add("Algebra: exponents", "Simplify: (2x³)²", "c",
                "2x⁶", "4x⁵", "4x⁶", "2x⁵");
        add("Trigonometry: special angles", "What is sin 30°?", "a",
                "1/2", "√3/2", "1", "√2/2");
        add("Statistics: mean", "What is the mean of 2, 5, 6, 9 and 13?", "b",
                "6", "7", "8", "9");
        add("Algebra: systems of equations", "If x + y = 10 and x - y = 2, what is x?", "c",
                "x = 4", "x = 5", "x = 6", "x = 8");
    }

    private void add(String topic, String text, String correct,
                     String a, String b, String c, String d) {
        QuestionEntity q = new QuestionEntity();
        q.setSubject("Mathematics");
        q.setTopic(topic);
        q.setText(text);
        q.setCorrectOption(correct);
        q.setOptionA(a);
        q.setOptionB(b);
        q.setOptionC(c);
        q.setOptionD(d);
        questions.save(q);
    }
}