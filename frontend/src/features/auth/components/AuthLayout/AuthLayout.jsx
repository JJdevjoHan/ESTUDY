import { ClipboardCheck, Target, TrendingUp } from 'lucide-react';

import estudyLogo from '../../../../assets/images/estudy-logo-white.svg';
import studentsIllustration from '../../../../assets/images/auth-students.png';
import styles from './AuthLayout.module.css';

const FEATURES = [
  { id: 'diagnostic', label: 'Personalized Diagnostic Test', Icon: ClipboardCheck },
  { id: 'gaps', label: 'Pinpoint your learning gaps', Icon: Target },
  { id: 'tracking', label: 'Performance Tracking', Icon: TrendingUp },
];

/**
 * The split screen shared by Login and both Registration pages:
 */
export default function AuthLayout({ children }) {
  return (
    <div className={styles.layout}>
      <aside className={styles.brandPanel}>
        <img src={estudyLogo} alt="EStudy" className={styles.logo} />

        <div className={styles.brandContent}>
          <h2 className={styles.headline}>Bridge the Gap</h2>
          <p className={styles.subline}>
            Diagnose your weak topics and track your progress in one place.
          </p>

          <ul className={styles.featureList}>
            {FEATURES.map(({ id, label, Icon }) => (
              <li key={id} className={styles.feature}>
                <span className={styles.featureIcon}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={studentsIllustration}
          alt=""
          className={styles.illustration}
        />
      </aside>

      <main className={styles.formPanel}>
        <div className={styles.formContainer}>{children}</div>
      </main>
    </div>
  );
}
