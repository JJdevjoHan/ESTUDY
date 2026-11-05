import { CalendarDays } from 'lucide-react';
import { upcomingActivities } from '../data/studentDashboardData.js';
import styles from './DashboardWidgets.module.css';

export default function UpcomingActivities() {
  return (
    <section className={styles.panel} aria-labelledby="upcoming-heading">
      <div className={styles.panelHeading}>
        <h2 id="upcoming-heading">Upcoming</h2>
        <span className={`${styles.panelIcon} ${styles.panelIconRed}`} aria-hidden="true">
          <CalendarDays size={17} />
        </span>
      </div>
      <ul className={styles.upcomingList}>
        {upcomingActivities.map((activity) => (
          <li className={styles.activityCard} key={`${activity.day}-${activity.title}`}>
            <span className={styles.activityDay}>{activity.day}</span>
            <span className={styles.activityTitle}>{activity.title}</span>
            <span className={styles.activityTime}>{activity.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
