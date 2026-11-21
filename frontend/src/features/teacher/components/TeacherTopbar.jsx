import { CalendarDays } from 'lucide-react';
import styles from './TeacherTopbar.module.css';

export default function TeacherTopbar({ title = 'DASHBOARD' }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className={styles.topbar}>
      <div>
        <p className={styles.eyebrow}>Teacher workspace</p>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.right}>
        <span className={styles.dateChip}>
          <CalendarDays size={15} aria-hidden="true" />
          {today}
        </span>
      </div>
    </header>
  );
}