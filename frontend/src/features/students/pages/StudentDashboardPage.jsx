import StudentLayout from '../../../components/layout/StudentLayout/StudentLayout.jsx';
import useCurrentUser from '../../../hooks/useCurrentUser.js';
import DashboardStatCard from '../components/DashboardStatCard.jsx';
import PerformanceSummary from '../components/PerformanceSummary.jsx';
import RecentResults from '../components/RecentResults.jsx';
import UpcomingActivities from '../components/UpcomingActivities.jsx';
import { dashboardStats } from '../data/studentDashboardData.js';
import styles from './StudentDashboardPage.module.css';

export default function StudentDashboardPage() {
  const { firstName } = useCurrentUser();

  return (
    <StudentLayout activeNav="dashboard">
      <div className={styles.dashboard}>
        <header className={styles.welcome}>
          <p className={styles.eyebrow}>Student dashboard</p>
          <h1>Good morning, {firstName}</h1>
          <p className={styles.welcomeText}>
            Track your progress, review recent results, and jump back into your next class or
            practice session.
          </p>
        </header>

        <section className={styles.statsGrid} aria-label="Your learning summary">
          {dashboardStats.map((stat) => (
            <DashboardStatCard key={stat.label} {...stat} />
          ))}
        </section>

        <RecentResults />

        <div className={styles.bottomGrid}>
          <PerformanceSummary />
          <UpcomingActivities />
        </div>
      </div>
    </StudentLayout>
  );
}
