import { useNavigate } from 'react-router-dom';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { studentProfilePath } from '../routes/teacherPaths.js';
import styles from './DashboardWidgets.module.css';

const FLAG_LABELS = { critical: 'Critical', warning: 'Warning', caution: 'Caution' };

export default function EarlyWarningFlags({ flags }) {
  const navigate = useNavigate();

  return (
    <section className={styles.panel}>
      <div className={styles.panelHead}>
        <h2 className={styles.panelTitle}>Needs attention</h2>
        <span className={styles.count}>{flags.length}</span>
      </div>

      <ul className={styles.list}>
        {flags.map((flag) => {
          const Icon = flag.type === 'critical' ? AlertCircle : AlertTriangle;
          return (
            <li key={flag.id} className={styles.item} data-type={flag.type}>
              <span className={styles.avatar} aria-hidden="true">{flag.student.charAt(0)}</span>
              <div className={styles.itemBody}>
                <p className={styles.itemTitle}>
                  {flag.student} · {flag.subject}
                </p>
                <p className={styles.itemText}>{flag.reason}</p>
              </div>
              <div className={styles.itemSide}>
                <span className={styles.pill} data-type={flag.type}>
                  <Icon size={12} aria-hidden="true" />
                  {FLAG_LABELS[flag.type]}
                </span>
                <button
                  type="button"
                  className={styles.ghostBtn}
                  onClick={() => navigate(studentProfilePath(flag.studentId))}
                >
                  View
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}