import { Users, BookOpen, AlertTriangle, FileSearch } from 'lucide-react';
import TeacherLayout from '../components/TeacherLayout.jsx';
import StatCard from '../components/StatCard.jsx';
import EarlyWarningFlags from '../components/EarlyWarningFlags.jsx';
import RecheckRequests from '../components/RecheckRequests.jsx';
import PerformanceChart from '../components/PerformanceChart.jsx';
import RecentUpdates from '../components/RecentUpdates.jsx';
import { useRechecks } from '../store/recheckStore.js';
import {
  SUBJECT_NAMES,
  subjects,
  students,
  earlyWarningFlags,
  performanceGroups,
  recentUpdates,
} from '../data/teacherMockData.js';
import styles from './TeacherDashboardPage.module.css';

export default function TeacherDashboardPage() {
  const rechecks = useRechecks();
  const openRechecks = rechecks.filter((r) => r.status === 'in-review').length;

  const stats = [
    { key: 'students', icon: Users, value: students.length, label: 'Total Students', percent: 75, color: '#eb7f31' },
    { key: 'subjects', icon: BookOpen, value: subjects.length, label: 'Active Subjects', percent: 60, color: '#fcad38' },
    { key: 'flags', icon: AlertTriangle, value: earlyWarningFlags.length, label: 'Early Warning Flags', percent: 70, color: '#e45742' },
    { key: 'rechecks', icon: FileSearch, value: openRechecks, label: 'Re-check Requests', percent: 100, color: '#972828' },
  ];

  return (
    <TeacherLayout activeKey="dashboard" title="DASHBOARD">
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
        <RecheckRequests requests={rechecks} />
        <PerformanceChart subjects={SUBJECT_NAMES} groups={performanceGroups} />
        <RecentUpdates updates={recentUpdates} />
      </div>
    </TeacherLayout>
  );
}