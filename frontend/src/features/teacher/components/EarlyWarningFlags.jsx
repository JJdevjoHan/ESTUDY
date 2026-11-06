import { useNavigate } from 'react-router-dom';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { studentProfilePath } from '../routes/teacherPaths.js';
import styles from './Widgets.module.css';

const FLAG_LABELS = { critical: 'Critical', warning: 'Warning', caution: 'Caution' };

export default function EarlyWarningFlags({ flags }) {
  const navigate = useNavigate();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Attention Items: Early Warning Flags</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Flag Type</th>
              <th>Flag Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flags.map((flag) => {
              const Icon = flag.type === 'critical' ? AlertCircle : AlertTriangle;
              return (
                <tr key={flag.id}>
                  <td>{flag.student}</td>
                  <td>{flag.subject}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[flag.type]}`}>
                      <Icon size={12} aria-hidden="true" />
                      {FLAG_LABELS[flag.type]}
                    </span>
                  </td>
                  <td>{flag.reason}</td>
                  <td>
                    <button
                       type="button"
                         className={styles.viewBtn}
                        onClick={() => navigate(studentProfilePath(flag.studentId))}
                        >
                      View Profile
                  </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}