import styles from './Widgets.module.css';

export default function RecentUpdates({ updates }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Recent Updates Overview</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Date</th>
              <th>Class</th>
              <th>Avg. Score</th>
            </tr>
          </thead>
          <tbody>
            {updates.map((item) => (
              <tr key={item.id}>
                <td>{item.activity}</td>
                <td>{item.date}</td>
                <td>{item.className}</td>
                <td>
                  <div className={styles.scoreTrack}>
                    <div className={styles.scoreFill} style={{ width: `${item.avgScore}%` }}>
                      {item.avgScore}%
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}