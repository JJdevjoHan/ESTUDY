import { Users, BookOpen, AlertTriangle, FileSearch } from 'lucide-react';
import * as authService from '../../auth/services/authService.js';
import TeacherSidebar from '../components/TeacherSidebar.jsx';
import TeacherTopbar from '../components/TeacherTopbar.jsx';
import StatCard from '../components/StatCard.jsx';
import EarlyWarningFlags from '../components/EarlyWarningFlags.jsx';
import RecheckRequests from '../components/RecheckRequests.jsx';
import PerformanceChart from '../components/PerformanceChart.jsx';
import RecentUpdates from '../components/RecentUpdates.jsx';
import {
  SUBJECT_NAMES,
  earlyWarningFlags,
  recheckRequests,
  performanceGroups,
  recentUpdates,
} from '../data/teacherMockData.js';
import styles from './TeacherDashboardPage.module.css';

export default function TeacherDashboardPage() {
  const user = authService.getCurrentUser?.() ?? null;
  const fullName = user?.fullName || user?.name || 'Teacher';

  const openRechecks = recheckRequests.filter((r) => r.status === 'in-review').length;

  const stats = [
    { key: 'students', icon: Users, value: 60, label: 'Total Students', percent: 75, color: '#eb7f31' },
    { key: 'subjects', icon: BookOpen, value: SUBJECT_NAMES.length, label: 'Active Subjects', percent: 60, color: '#fcad38' },
    { key: 'flags', icon: AlertTriangle, value: earlyWarningFlags.length, label: 'Early Warning Flags', percent: 70, color: '#e45742' },
    { key: 'rechecks', icon: FileSearch, value: openRechecks, label: 'Re-check Requests', percent: 100, color: '#972828' },
  ];

  return (
    <div className={styles.shell}>
      <TeacherSidebar fullName={fullName} />

      <div className={styles.main}>
        <TeacherTopbar fullName={fullName} />

        <section className={styles.overview}>
          <h2 className={styles.overviewTitle}>Performance Overview</h2>
          <div className={styles.stats}>
            {stats.map(({ key, ...rest }) => (
              <StatCard key={key} {...rest} />
            ))}
          </div>
        </section>

        <div className={styles.grid}>
          <EarlyWarningFlags flags={earlyWarningFlags} />
          <RecheckRequests requests={recheckRequests} />
          <PerformanceChart subjects={SUBJECT_NAMES} groups={performanceGroups} />
          <RecentUpdates updates={recentUpdates} />
        </div>
      </div>
    </div>
  );
}