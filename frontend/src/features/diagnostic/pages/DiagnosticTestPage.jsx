import StudentLayout from '../../../components/layout/StudentLayout/StudentLayout.jsx';
import QuestionCard from '../components/QuestionCard/QuestionCard.jsx';
import QuestionNavigator from '../components/QuestionNavigator/QuestionNavigator.jsx';
import TestControls from '../components/TestControls/TestControls.jsx';
import TestTimer from '../components/TestTimer/TestTimer.jsx';
import useDiagnosticTest from '../hooks/useDiagnosticTest.js';
import { DIAGNOSTIC_SUBJECT } from '../services/diagnosticService.js';
import styles from './DiagnosticTestPage.module.css';

export default function DiagnosticTestPage() {
  const test = useDiagnosticTest();

  const handleSubmit = () => {
    const unanswered = test.total - test.answeredCount;
    const message =
      unanswered > 0
        ? `You still have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}. Submit anyway?`
        : 'Submit your diagnostic test?';

    if (window.confirm(message)) test.submit();
  };

  if (test.isLoading) {
    return (
      <StudentLayout sidebarLocked>
        <p role="status">Loading your test…</p>
      </StudentLayout>
    );
  }

  if (test.loadError || !test.currentQuestion) {
    return (
      <StudentLayout sidebarLocked>
        <p role="alert" className={styles.error}>
          {test.loadError || 'No questions are available right now. Try again later.'}
        </p>
      </StudentLayout>
    );
  }

  const progressPercent = ((test.currentIndex + 1) / test.total) * 100;

  return (
    <StudentLayout sidebarLocked>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1>Personalized Diagnostic Test</h1>
          <p>
            {DIAGNOSTIC_SUBJECT}, adaptive difficulty. Question {test.currentIndex + 1} of{' '}
            {test.total}
          </p>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={test.total}
            aria-valuenow={test.currentIndex + 1}
            aria-label="Test progress"
          >
            <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <TestTimer secondsLeft={test.timeLeft} />
      </div>

      <div className={styles.grid}>
        <section className={styles.questionPanel}>
          <QuestionCard
            key={test.currentQuestion.id}
            question={test.currentQuestion}
            selectedOptionId={test.selectedOptionId}
            onSelect={test.selectAnswer}
          />
          <TestControls
            isFirst={test.isFirst}
            isLast={test.isLast}
            isFlagged={test.isCurrentFlagged}
            onPrevious={test.goPrevious}
            onNext={test.goNext}
            onToggleFlag={test.toggleFlag}
          />
        </section>

        <aside className={styles.sidePanel}>
          <QuestionNavigator
            questions={test.questions}
            currentIndex={test.currentIndex}
            answers={test.answers}
            flagged={test.flagged}
            onSelect={test.goTo}
          />

          <div className={styles.howItWorks}>
            <h2>How this works</h2>
            <p>
              Questions adjust to your answers. Flag a question to come back to it, and use the
              navigator to jump between questions. Your answers are saved as you go.
            </p>
          </div>

          {test.submitError && (
            <p role="alert" className={styles.error}>
              {test.submitError}
            </p>
          )}

          <button
            type="button"
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={test.isSubmitting}
          >
            {test.isSubmitting ? 'Submitting…' : 'Submit test'}
          </button>
        </aside>
      </div>
    </StudentLayout>
  );
}
