import { Search, MessageSquare, Bell } from 'lucide-react';
import styles from './TeacherTopbar.module.css';

export default function TeacherTopbar({ title = 'DASHBOARD', fullName }) {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className={styles.topbar}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.right}>
        <div className={styles.welcome}>
          <p className={styles.welcomeName}>Welcome {fullName}</p>
          <p className={styles.date}>Current date: {today}</p>
        </div>

        <label className={styles.search}>
          <Search size={16} aria-hidden="true" />
          <input type="search" placeholder="Search" aria-label="Search" />
        </label>

        <button type="button" className={styles.iconBtn} aria-label="Messages">
          <MessageSquare size={20} />
          <span className={styles.dot} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Notifications">
          <Bell size={20} />
          <span className={styles.dot} />
        </button>
      </div>
    </header>
  );
}