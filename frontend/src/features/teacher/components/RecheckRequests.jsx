import { useNavigate } from 'react-router-dom';
import { TEACHER_ROUTES } from '../routes/teacherPaths.js';
import styles from './DashboardWidgets.module.css';

export default function RecheckRequests({ requests }) {
  const navigate = useNavigate();
  const open = requests.filter((r) => r.status === 'in-review').length;

  return (
    <section className={styles.panel}>
      <div className={styles.panelHead}>
        <h2 className={styles.panelTitle}>Re-check queue</h2>
        <button
          type="button"
          className={styles.panelLink}
          onClick={() => navigate(TEACHER_ROUTES.REQUESTS)}
        >
          Open queue ({open})
        </button>
      </div>

      <ul className={styles.list}>
        {requests.map((req) => (
          <li key={req.id} className={styles.item} data-status={req.status}>
            <span className={`${styles.avatar} ${styles.avatarSoft}`} aria-hidden="true">
              {req.student.charAt(0)}
            </span>
            <div className={styles.itemBody}>
              <p className={styles.itemTitle}>
                {req.activity} · {req.question}
              </p>
              <p className={styles.itemText}>
                {req.student} · {req.date}
              </p>
            </div>
            <div className={styles.itemSide}>
              <span className={styles.pill} data-status={req.status}>
                {req.status === 'resolved' ? 'Resolved' : 'In Review'}
              </span>
              <button
                type="button"
                className={styles.ghostBtn}
                onClick={() => navigate(TEACHER_ROUTES.REQUESTS)}
              >
                {req.status === 'resolved' ? 'Open' : 'Review'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}