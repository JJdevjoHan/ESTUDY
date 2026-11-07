import styles from './DashboardWidgets.module.css';

export default function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div className={styles.statTile}>
      <span className={styles.statIcon} style={{ color }}>
        <Icon size={22} aria-hidden="true" />
      </span>
      <div>
        <p className={styles.statValue}>{value}</p>
        <p className={styles.statLabel}>{label}</p>
      </div>
    </div>
  );
}