import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TeacherLayout from '../components/TeacherLayout.jsx';
import { subjects, students, earlyWarningFlags } from '../data/teacherMockData.js';
import { useRechecks } from '../store/recheckStore.js';
import { getAverage, getStatus, STATUS_LABELS } from '../utils/studentUtils.js';
import { TEACHER_ROUTES } from '../routes/teacherPaths.js';
import widgets from '../components/Widgets.module.css';
import styles from './StudentProfilePage.module.css';

const BADGE = {
  'on-track': widgets.good,
  'needs-attention': widgets.caution,
  'at-risk': widgets.critical,
};

const FLAG_LABELS = { critical: 'Critical', warning: 'Warning', caution: 'Caution' };

export default function StudentProfilePage() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const allRequests = useRechecks();
  const student = students.find((s) => s.id === studentId);

  const backButton = (
    <button type="button" className={styles.back} onClick={() => navigate(TEACHER_ROUTES.SUBJECTS)}>
      <ArrowLeft size={16} aria-hidden="true" />
      Back to students
    </button>
  );

  if (!student) {
    return (
      <TeacherLayout activeKey="subjects" title="STUDENT PROFILE">
        {backButton}
        <section className={widgets.card}>
          <p className={styles.muted}>This student was not found.</p>
        </section>
      </TeacherLayout>
    );
  }

  const average = getAverage(student.scores);
  const status = getStatus(average);
  const subjectRows = subjects.filter((s) => s.id in student.scores);
  const flags = earlyWarningFlags.filter((f) => f.studentId === student.id);
  const requests = allRequests.filter((r) => r.studentId === student.id);

  return (
    <TeacherLayout activeKey="subjects" title="STUDENT PROFILE">
      {backButton}

      <section className={`${widgets.card} ${styles.headerCard}`}>
        <span className={styles.avatar} aria-hidden="true">{student.name.charAt(0)}</span>
        <div className={styles.headerInfo}>
          <h2 className={styles.name}>{student.name}</h2>
          <p className={styles.email}>{student.email}</p>
          <span className={`${widgets.badge} ${BADGE[status]}`}>{STATUS_LABELS[status]}</span>
        </div>
        <div className={styles.facts}>
          <div>
            <p className={styles.factLabel}>Average</p>
            <p className={styles.factValue}>{average}%</p>
          </div>
          <div>
            <p className={styles.factLabel}>Engagement</p>
            <p className={styles.factValue}>{student.engagement}</p>
          </div>
          <div>
            <p className={styles.factLabel}>Last active</p>
            <p className={styles.factValue}>{student.lastActive}</p>
          </div>
        </div>
      </section>

      <div className={styles.grid}>
        <section className={widgets.card}>
          <h2 className={widgets.cardTitle}>Performance per Subject</h2>
          {subjectRows.map((subject) => (
            <div key={subject.id} className={styles.subjectRow}>
              <div className={styles.rowTop}>
                <span>{subject.name}</span>
                <span>{student.scores[subject.id]}%</span>
              </div>
              <div className={styles.track}>
                <div className={styles.fill} style={{ width: `${student.scores[subject.id]}%` }} />
              </div>
            </div>
          ))}
        </section>

        <section className={widgets.card}>
          <h2 className={widgets.cardTitle}>Early Warning Flags</h2>
          {flags.length === 0 ? (
            <p className={styles.muted}>No flags for this student.</p>
          ) : (
            <ul className={styles.list}>
              {flags.map((flag) => (
                <li key={flag.id} className={styles.listItem}>
                  <span>
                    <strong>{flag.subject}</strong> · {flag.reason}
                  </span>
                  <span className={`${widgets.badge} ${widgets[flag.type]}`}>
                    {FLAG_LABELS[flag.type]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={widgets.card}>
          <h2 className={widgets.cardTitle}>Re-check Requests</h2>
          {requests.length === 0 ? (
            <p className={styles.muted}>No re-check requests.</p>
          ) : (
            <ul className={styles.list}>
              {requests.map((req) => (
                <li key={req.id} className={styles.listItem}>
                  <span>
                    <strong>{req.activity}</strong> · {req.question} · {req.date}
                  </span>
                  <span
                    className={`${widgets.badge} ${
                      req.status === 'resolved' ? widgets.resolved : widgets.inReview
                    }`}
                  >
                    {req.status === 'resolved' ? 'Resolved' : 'In Review'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </TeacherLayout>
  );
}