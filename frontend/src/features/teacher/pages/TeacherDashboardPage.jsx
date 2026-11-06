import { Link } from 'react-router-dom';
import { Users, BookOpen, AlertTriangle, FileSearch } from 'lucide-react';
import * as authService from '../../auth/services/authService.js';
import TeacherLayout from '../components/TeacherLayout.jsx';
import StatCard from '../components/StatCard.jsx';
import EarlyWarningFlags from '../components/EarlyWarningFlags.jsx';
import RecheckRequests from '../components/RecheckRequests.jsx';
import PerformanceChart from '../components/PerformanceChart.jsx';
import RecentUpdates from '../components/RecentUpdates.jsx';
import { useRechecks } from '../store/recheckStore.js';
import { TEACHER_ROUTES } from '../routes/teacherPaths.js';
import {
  SUBJECT_NAMES,
  subjects,
  students,
  earlyWarningFlags,
  performanceGroups,
  recentUpdates,
} from '../data/teacherMockData.js';
import styles from './TeacherDashboardPage.module.css';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

export default function TeacherDashboardPage() {
  const user = authService.getCurrentUser?.() ?? null;
  const firstName = (user?.fullName || user?.name || 'Teacher').split(' ')[0];

  const rechecks = useRechecks();
  const openRechecks = rechecks.filter((r) => r.status === 'in-review').length;

  const stats = [
    { key: 'students', icon: Users, value: students.length, label: 'Total Students', color: '#eb7f31' },
    { key: 'subjects', icon: BookOpen, value: subjects.length, label: 'Active Subjects', color: '#d98a00' },
    { key: 'flags', icon: AlertTriangle, value: earlyWarningFlags.length, label: 'Early Warning Flags', color: '#e45742' },
    { key: 'rechecks', icon: FileSearch, value: openRechecks, label: 'Re-check Requests', color: '#972828' },
  ];

  return (
    <TeacherLayout activeKey="dashboard" title="DASHBOARD">
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.heroEyebrow}>Your class at a glance</p>
          <h2 className={styles.heroTitle}>
            {getGreeting()}, {firstName}
          </h2>
          <p className={styles.heroSub}>
            You have {plural(openRechecks, 're-check request')} waiting and{' '}
            {plural(earlyWarningFlags.length, 'early warning flag')} that need your attention.
          </p>
          <div className={styles.heroActions}>
            <Link to={TEACHER_ROUTES.REQUESTS} className={styles.heroPrimary}>
              Review requests
            </Link>
            <Link to={TEACHER_ROUTES.SUBJECTS} className={styles.heroGhost}>
              View students
            </Link>
          </div>
        </div>

        <div className={styles.heroStats}>
          {stats.map(({ key, ...rest }) => (
            <StatCard key={key} {...rest} />
          ))}
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.column}>
          <EarlyWarningFlags flags={earlyWarningFlags} />
          <PerformanceChart subjects={SUBJECT_NAMES} groups={performanceGroups} />
        </div>
        <div className={styles.column}>
          <RecheckRequests requests={rechecks} />
          <RecentUpdates updates={recentUpdates} />
        </div>
      </div>
    </TeacherLayout>
  );
}