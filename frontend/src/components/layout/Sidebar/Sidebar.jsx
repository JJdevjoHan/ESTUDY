import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/paths.js';
import styles from './Sidebar.module.css';

// Items without a `to` are pages you haven't built yet. They render as plain text.
const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', to: ROUTES.DASHBOARD_STUDENT },
  { key: 'performance', label: 'My Performance' },
  { key: 'scores', label: 'Scores' },
  { key: 'testHub', label: 'Test Hub', to: ROUTES.DIAGNOSTIC },
  { key: 'warnings', label: 'Warnings' },
  { key: 'profile', label: 'Profile', to: ROUTES.PRFOILE},
  { key: 'settings', label: 'Settings'},
  { key: 'logout', label: 'Log out' , to: ROUTES.LOGOUT},
];

export default function Sidebar({ locked = false, activeKey = 'testHub' }) {
  return (
    <aside className={styles.sidebar}>
      {locked && (
        <p className={styles.notice}>
          Finish your diagnostic test to unlock the rest of EStudy
        </p>
      )}

      <nav className={styles.nav} aria-label="Student navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === activeKey;
          const isLink = Boolean(item.to) && !locked;
          const className = [
            styles.item,
            isActive && styles.active,
            !isActive && !isLink && styles.dimmed,
          ]
            .filter(Boolean)
            .join(' ');

          if (isLink) {
            return (
              <Link key={item.key} to={item.to} className={className}>
                {item.label}
              </Link>
            );
          }

          return (
            <span
              key={item.key}
              className={className}
              aria-current={isActive ? 'page' : undefined}
              aria-disabled={!isActive}
            >
              {item.label}
            </span>
          );
        })}
      </nav>
    </aside>
  );
}
