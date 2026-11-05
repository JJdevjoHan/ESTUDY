import styles from './Widgets.module.css';

export default function StatCard({ icon: Icon, value, label, percent, color }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statTop}>
        <span className={styles.statIcon} style={{ background: color }}>
          <Icon size={22} aria-hidden="true" />
        </span>
        <span className={styles.statValue}>{value}</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percent}%`, background: color }} />
      </div>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}