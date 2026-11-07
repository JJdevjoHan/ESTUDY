import { Award, BookOpen, Flame } from 'lucide-react';
import styles from './DashboardWidgets.module.css';

const STAT_ICONS = {
  award: Award,
  book: BookOpen,
  streak: Flame,
};

export default function DashboardStatCard({ label, value, detail, icon, tone }) {
  const Icon = STAT_ICONS[icon];

  return (
    <article className={styles.statCard}>
      <div className={styles.statTopline}>
        <span>{label}</span>
        <span className={`${styles.statIcon} ${styles[tone]}`} aria-hidden="true">
          <Icon size={16} />
        </span>
      </div>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statDetail}>{detail}</p>
    </article>
  );
}
