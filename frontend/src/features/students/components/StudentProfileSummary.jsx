import { UserRound } from 'lucide-react';
import styles from './DashboardWidgets.module.css';

export default function StudentProfileSummary({ student, schoolId }) {
  const details = [
    { label: 'School ID', value: schoolId || 'Not set' },
    { label: 'Student record ID', value: student.studentId },
    { label: 'Year level', value: student.yearLevel ? `Year ${student.yearLevel}` : 'Not set' },
    { label: 'Section', value: student.section || 'Not set' },
  ];

  return (
    <section className={styles.panel} aria-labelledby="student-profile-heading">
      <div className={styles.panelHeading}>
        <h2 id="student-profile-heading">Student profile</h2>
        <span className={`${styles.panelIcon} ${styles.panelIconBlue}`} aria-hidden="true">
          <UserRound size={17} />
        </span>
      </div>
      <dl className={styles.studentDetails}>
        {details.map(({ label, value }) => (
          <div className={styles.studentDetail} key={label}>
            <dt className={styles.studentDetailLabel}>{label}</dt>
            <dd className={styles.studentDetailValue}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
