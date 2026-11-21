import { Link, Navigate, useLocation } from 'react-router-dom';
import StudentLayout from '../../../components/layout/StudentLayout/StudentLayout.jsx';
import useCurrentUser from '../../../hooks/useCurrentUser.js';
import { ROUTES } from '../../../routes/paths.js';
import styles from './DiagnosticResultsPage.module.css';

// Percentage for one topic (same formula the backend uses: correct / total x 100).
const percent = (correct, total) => (total ? Math.round((correct / total) * 10000) / 100 : 0);

export default function DiagnosticResultsPage() {
  const { user } = useCurrentUser();
  // The test page passes the result here when it navigates.
  const { state } = useLocation();
  const result = state?.result;

  // Opened directly (no result, e.g. after a refresh): send the student back to the hub.
  if (!result) return <Navigate to={ROUTES.DIAGNOSTIC} replace />;

  const { correct, total, score, byTopic } = result;
  const topics = Object.entries(byTopic);

  return (
    <StudentLayout sidebarLocked={!user?.hasCompletedDiagnostic}>
      <section className={styles.scoreCard}>
        <div>
          <p className={styles.tag}>Diagnostic results</p>
          <h1>You scored {score}%</h1>
          <p>
            {correct} out of {total} questions correct.
          </p>
        </div>
        <div className={styles.circle}>
          <span className={styles.circleNumber}>{Math.round(score)}</span>
          <span className={styles.circleLabel}>percent</span>
        </div>
      </section>

      <section className={styles.topicCard}>
        <h2>Score by topic</h2>
        <ul className={styles.topicList}>
          {topics.map(([topic, t]) => {
            const topicScore = percent(t.correct, t.total);
            return (
              <li key={topic}>
                <div className={styles.topicRow}>
                  <span>{topic}</span>
                  <strong>
                    {t.correct}/{t.total} · {topicScore}%
                  </strong>
                </div>
                <div
                  className={styles.bar}
                  role="progressbar"
                  aria-valuenow={topicScore}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${topic} score`}
                >
                  <div className={styles.barFill} style={{ width: `${topicScore}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <Link to={ROUTES.DASHBOARD_STUDENT} className={styles.continueLink}>
        Continue to my dashboard
      </Link>
    </StudentLayout>
  );
}
