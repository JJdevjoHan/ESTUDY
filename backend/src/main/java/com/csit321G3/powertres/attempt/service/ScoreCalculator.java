package com.csit321G3.powertres.attempt.service;

import java.math.BigDecimal;
import java.math.RoundingMode;

// The one formula: score = correct / total x 100, rounded to 2 decimals.
public final class ScoreCalculator {

    private ScoreCalculator() {
    }

    public static double percent(int correct, int total) {
        if (total <= 0) {
            return 0.0;
        }
        return BigDecimal.valueOf(correct * 100.0 / total)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
