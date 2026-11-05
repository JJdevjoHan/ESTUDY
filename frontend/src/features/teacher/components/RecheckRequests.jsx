import styles from './Widgets.module.css';

const STATUS = {
  'in-review': { label: 'In Review', className: styles.inReview },
  resolved: { label: 'Resolved', className: styles.resolved },
};

export default function RecheckRequests({ requests }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}> Re-check Requests</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Activity</th>
              <th>Date</th>
              <th>Question #</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => {
              const status = STATUS[req.status];
              return (
                <tr key={req.id}>
                  <td>{req.student}</td>
                  <td>{req.activity}</td>
                  <td>{req.date}</td>
                  <td>{req.question}</td>
                  <td>
                    <span className={`${styles.badge} ${status.className}`}>{status.label}</span>
                  </td>
                  <td>
                    <button type="button" className={styles.viewBtn}>View Profile</button>
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