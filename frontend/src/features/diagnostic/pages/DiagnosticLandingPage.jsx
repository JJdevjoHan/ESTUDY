import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../../components/layout/StudentLayout/StudentLayout.jsx';
import useCurrentUser from '../../../hooks/useCurrentUser.js';
import { ROUTES } from '../../../routes/paths.js';
import { DIAGNOSTIC_MINUTES, QUESTION_COUNT } from '../services/diagnosticService.js';
import styles from './DiagnosticLandingPage.module.css';



export default function DiagnosticLandingPage() {
  const navigate = useNavigate();
  const { firstName } = useCurrentUser();

  const handleStartTest = () => {
    navigate(ROUTES.DIAGNOSTIC_TEST);
  };

  return (
    <StudentLayout sidebarLocked>
      <section className={styles.heroCard}>
        <div className={styles.heroText}>
          <p className={styles.heroTag}>Welcome to EStudy</p>
          <h1>Hi {firstName}, let’s find your starting point</h1>
          <p>
            Before you explore your dashboard, take a short diagnostic test. It shows which
            topics you’ve mastered and which need work, so EStudy can build your personal
            learning path.
          </p>
        </div>

        <div className={styles.timerCircle}>
          <span className={styles.timerNumber}>{DIAGNOSTIC_MINUTES}</span>
          <span className={styles.timerLabel}>minutes</span>
        </div>
      </section>

      <div className={styles.detailsGrid}>
        <section className={styles.infoCard}>
          <h2>What to expect</h2>
          <ol className={styles.expectationList}>
            <li>
              <span className={styles.bulletNumber}>1</span>
              <div>
                <strong>Answer {QUESTION_COUNT} questions.</strong> They get easier or harder
                depending on your answers.
              </div>
            </li>
            <li>
              <span className={styles.bulletNumber}>2</span>
              <div>
                <strong>Get your results.</strong> See your strengths and weak topics per
                subject.
              </div>
            </li>
            <li>
              <span className={styles.bulletNumber}>3</span>
              <div>
                <strong>Start learning.</strong> Your dashboard unlocks with a personalized plan.
              </div>
            </li>
          </ol>
          <p className={styles.disclaimerText}>
            This is not graded, but your teacher can see the results to catch gaps early.
          </p>
        </section>

        <section className={styles.infoCard}>
          <h2>Before you begin</h2>
          <ol className={styles.instructionsList}>
            <li>Be authentic and honest in answering.</li>
            <li>Find a quiet place to answer the test.</li>
            <li>Keep scratch paper nearby.</li>
            <li>You can flag questions and return to them.</li>
            <li>The timer starts after you press Start.</li>
          </ol>
          <p className={styles.requiredTag}>Required for first-time users only</p>
        </section>
      </div>

      <div className={styles.actionContainer}>
        <button type="button" className={styles.startButton} onClick={handleStartTest}>
          Start diagnostic test
        </button>
      </div>
    </StudentLayout>
  );
}
