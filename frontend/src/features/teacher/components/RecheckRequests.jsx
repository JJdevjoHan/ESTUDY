import { updateRecheck } from '../store/recheckStore.js';
import styles from './DashboardWidgets.module.css';

export default function RecheckRequests({ requests }) {
  const open = requests.filter((r) => r.status === 'in-review').length;

  const resolve = (id, outcome) => {
    updateRecheck(id, {
      status: 'resolved',
      outcome,
      resolvedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
  };

  const reopen = (id) => {
    updateRecheck(id, { status: 'in-review', outcome: null, note: '', resolvedOn: null });
  };

  return (
    <section id="recheck-queue" className={styles.panel}>
      <div className={styles.panelHead}>
        <h2 className={styles.panelTitle}>Re-check queue</h2>
        <span className={styles.pill} data-status="in-review">
          {open} pending
        </span>
      </div>

      {requests.length === 0 && <p className={styles.itemText}>No re-check requests.</p>}

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
              {req.status === 'resolved' ? (
                <button type="button" className={styles.ghostBtn} onClick={() => reopen(req.id)}>
                  Reopen
                </button>
              ) : (
                <>
                  <button type="button" className={styles.ghostBtn} onClick={() => resolve(req.id, 'approved')}>
                    Approve
                  </button>
                  <button type="button" className={styles.ghostBtn} onClick={() => resolve(req.id, 'declined')}>
                    Decline
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}