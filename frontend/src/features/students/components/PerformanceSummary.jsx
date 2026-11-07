import { ChartNoAxesColumnIncreasing } from 'lucide-react';
import { subjectPerformance } from '../data/studentDashboardData.js';
import styles from './DashboardWidgets.module.css';

export default function PerformanceSummary() {
  return (
    <section className={styles.panel} aria-labelledby="performance-heading">
      <div className={styles.panelHeading}>
        <div>
          <h2 id="performance-heading">Performance</h2>
          <p>Your strongest subjects this week</p>
        </div>
        <span className={`${styles.panelIcon} ${styles.panelIconBlue}`} aria-hidden="true">
          <ChartNoAxesColumnIncreasing size={17} />
        </span>
      </div>
      <ul className={styles.performanceList}>
        {subjectPerformance.map((item) => (
          <li className={styles.performanceItem} key={item.subject}>
            <div className={styles.performanceLabel}>
              <span>{item.subject}</span>
              <span>{item.score}%</span>
            </div>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label={`${item.subject} performance`}
              aria-valuenow={item.score}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span
                className={`${styles.progressFill} ${styles[item.tone]}`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
