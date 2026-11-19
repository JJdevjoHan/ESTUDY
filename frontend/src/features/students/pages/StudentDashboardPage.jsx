import { useEffect, useState } from 'react';
import StudentLayout from '../../../components/layout/StudentLayout/StudentLayout.jsx';
import useCurrentUser from '../../../hooks/useCurrentUser.js';
import DashboardStatCard from '../components/DashboardStatCard.jsx';
import PerformanceSummary from '../components/PerformanceSummary.jsx';
import RecentResults from '../components/RecentResults.jsx';
import StudentProfileSummary from '../components/StudentProfileSummary.jsx';
import {
  getDashboardStats,
  getRecentResults,
  getSubjectPerformance,
} from '../data/studentDashboardData.js';
import { getStudentDashboard } from '../services/studentDashboardService.js';
import styles from './StudentDashboardPage.module.css';

export default function StudentDashboardPage() {
  const { firstName, user } = useCurrentUser();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    getStudentDashboard(user?.userId, { signal: controller.signal })
      .then(setDashboard)
      .catch((loadError) => {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message);
        }
      });

    return () => controller.abort();
  }, [user?.userId]);

  const student = dashboard?.student;
  const attempts = dashboard?.attempts ?? [];
  const displayName = student?.firstName || firstName;
  const dashboardStats = student ? getDashboardStats(student, attempts) : [];

  return (
    <StudentLayout activeNav="dashboard">
      <div className={styles.dashboard}>
        <header className={styles.welcome}>
          <p className={styles.eyebrow}>Student dashboard</p>
          <h1>Welcome, {displayName}</h1>
          <p className={styles.welcomeText}>
            Review your student profile and assessment results from your learning history.
          </p>
        </header>

        {error ? (
          <p role="alert">{error}</p>
        ) : !dashboard ? (
          <p role="status">Loading your student dashboard…</p>
        ) : (
          <>
            <section className={styles.statsGrid} aria-label="Your student summary">
              {dashboardStats.map((stat) => (
                <DashboardStatCard key={stat.label} {...stat} />
              ))}
            </section>

            <RecentResults results={getRecentResults(attempts)} />

            <div className={styles.bottomGrid}>
              <PerformanceSummary performance={getSubjectPerformance(attempts)} />
              <StudentProfileSummary student={student} schoolId={user?.studentNumber} />
            </div>
          </>
        )}
      </div>
    </StudentLayout>
  );
}
