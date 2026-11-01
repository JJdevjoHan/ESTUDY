import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/paths.js';
import {
  DIAGNOSTIC_MINUTES,
  getQuestions,
  submitDiagnostic,
} from '../services/diagnosticService.js';

/** Holds all the state for the diagnostic test so the page stays small. */
export default function useDiagnosticTest() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: optionId }
  const [flagged, setFlagged] = useState({}); // { questionId: true }
  const [timeLeft, setTimeLeft] = useState(DIAGNOSTIC_MINUTES * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Refs let the timer's auto-submit read the latest answers without stale closures.
  const answersRef = useRef(answers);
  const submittedRef = useRef(false);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // Load questions
  useEffect(() => {
    let cancelled = false;

    getQuestions()
      .then((data) => {
        if (!cancelled) setQuestions(data);
      })
      .catch((error) => {
        if (!cancelled) setLoadError(error.message || 'Could not load the test. Refresh to try again.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const submit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitDiagnostic(answersRef.current);
      navigate(ROUTES.DIAGNOSTIC_RESULTS, { replace: true });
    } catch (error) {
      submittedRef.current = false;
      setSubmitError(error.message || 'Could not submit your test. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate]);

  // Countdown starts once the questions are ready
  useEffect(() => {
    if (isLoading || loadError) return undefined;

    const id = setInterval(() => {
      setTimeLeft((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => clearInterval(id);
  }, [isLoading, loadError]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (!isLoading && !loadError && timeLeft === 0) submit();
  }, [timeLeft, isLoading, loadError, submit]);

  const total = questions.length;
  const currentQuestion = questions[currentIndex] ?? null;

  const selectAnswer = useCallback(
    (optionId) => {
      if (!currentQuestion) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
    },
    [currentQuestion]
  );

  const toggleFlag = useCallback(() => {
    if (!currentQuestion) return;
    setFlagged((prev) => {
      const next = { ...prev };
      if (next[currentQuestion.id]) delete next[currentQuestion.id];
      else next[currentQuestion.id] = true;
      return next;
    });
  }, [currentQuestion]);

  const goTo = useCallback(
    (index) => {
      if (index >= 0 && index < total) setCurrentIndex(index);
    },
    [total]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
  const goPrevious = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

  return {
    questions,
    currentQuestion,
    currentIndex,
    total,
    answers,
    flagged,
    selectedOptionId: currentQuestion ? answers[currentQuestion.id] : undefined,
    isCurrentFlagged: currentQuestion ? Boolean(flagged[currentQuestion.id]) : false,
    answeredCount: Object.keys(answers).length,
    isFirst: currentIndex === 0,
    isLast: total > 0 && currentIndex === total - 1,
    timeLeft,
    isLoading,
    loadError,
    isSubmitting,
    submitError,
    selectAnswer,
    toggleFlag,
    goTo,
    goNext,
    goPrevious,
    submit,
  };
}
