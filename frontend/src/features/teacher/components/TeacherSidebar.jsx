import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  ListChecks,
  Settings,
  User,
} from 'lucide-react';
import { ROUTES } from '../../../routes/paths.js';
import styles from './TeacherSidebar.module.css';
import estudyLogo from '../../../assets/images/estudy-logo-white.svg';
import { TEACHER_ROUTES } from '../routes/teacherPaths.js';

// Items without a `to` are pages that are not built yet. They show dimmed.
const MAIN_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: ROUTES.DASHBOARD_TEACHER },
  { key: 'subjects', label: 'Subjects (Students)', icon: Users, to: TEACHER_ROUTES.SUBJECTS },
  { key: 'assessment', label: 'Assessment Maker', icon: ClipboardList },
  { key: 'requests', label: 'Request Queue', icon: ListChecks, to: TEACHER_ROUTES.REQUESTS },
  { key: 'system', label: 'System Settings', icon: Settings },
];

const BOTTOM_ITEMS = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'settings', label: 'Settings', icon: Settings },
];

function NavItem({ item, activeKey }) {
  const Icon = item.icon;
  const isActive = item.key === activeKey;
  const className = [styles.item, isActive && styles.active, !isActive && !item.to && styles.dimmed]
    .filter(Boolean)
    .join(' ');

  if (item.to) {
    return (
      <Link to={item.to} className={className} aria-current={isActive ? 'page' : undefined}>
        <Icon size={18} aria-hidden="true" />
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <span className={className} aria-disabled="true">
      <Icon size={18} aria-hidden="true" />
      <span>{item.label}</span>
    </span>
  );
}

export default function TeacherSidebar({ fullName, role = 'Instructor', activeKey = 'dashboard' }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
  <img src={estudyLogo} alt="EStudy" className={styles.logo} />
</div>

      <nav className={styles.nav} aria-label="Teacher navigation">
        {MAIN_ITEMS.map((item) => (
          <NavItem key={item.key} item={item} activeKey={activeKey} />
        ))}
      </nav>

      <div className={styles.bottom}>
        {BOTTOM_ITEMS.map((item) => (
          <NavItem key={item.key} item={item} activeKey={activeKey} />
        ))}
        <div className={styles.userCard}>
          <span className={styles.avatar} aria-hidden="true">{fullName.charAt(0)}</span>
          <div>
            <p className={styles.userName}>{fullName}</p>
            <p className={styles.userRole}>{role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}