import styles from './DashboardWidgets.module.css';

export default function RecentUpdates({ updates }) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHead}>
        <h2 className={styles.panelTitle}>Recent updates</h2>
      </div>

      <ul className={styles.list}>
        {updates.map((item) => (
          <li key={item.id} className={styles.item}>
            <span className={styles.ring} style={{ '--v': item.avgScore }}>
              <span className={styles.ringInner}>{item.avgScore}%</span>
            </span>
            <div className={styles.itemBody}>
              <p className={styles.itemTitle}>{item.activity}</p>
              <p className={styles.itemText}>
                {item.className} · {item.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}