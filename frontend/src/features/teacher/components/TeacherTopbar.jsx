import { Search, MessageSquare, Bell, CalendarDays } from 'lucide-react';
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

        <label className={styles.search}>
          <Search size={16} aria-hidden="true" />
          <input type="search" placeholder="Search" aria-label="Search" />
        </label>

        <button type="button" className={styles.iconBtn} aria-label="Messages">
          <MessageSquare size={18} />
          <span className={styles.dot} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Notifications">
          <Bell size={18} />
          <span className={styles.dot} />
        </button>
      </div>
    </header>
  );
}