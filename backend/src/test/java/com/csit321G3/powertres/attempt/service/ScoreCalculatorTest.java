package com.csit321G3.powertres.attempt.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class ScoreCalculatorTest {

    @Test
    void allCorrectIsHundred() {
        assertEquals(100.0, ScoreCalculator.percent(10, 10));
    }

    @Test
    void sevenOutOfTenIsSeventy() {
        assertEquals(70.0, ScoreCalculator.percent(7, 10));
    }

    @Test
    void roundsToTwoDecimals() {
        assertEquals(66.67, ScoreCalculator.percent(2, 3));
    }

    @Test
    void noQuestionsIsZeroNotCrash() {
        assertEquals(0.0, ScoreCalculator.percent(0, 0));
    }
}
