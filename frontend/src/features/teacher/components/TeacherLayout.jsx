import * as authService from '../../auth/services/authService.js';
import TeacherSidebar from './TeacherSidebar.jsx';
import TeacherTopbar from './TeacherTopbar.jsx';
import styles from './TeacherLayout.module.css';

export default function TeacherLayout({ activeKey, title, children }) {
  const user = authService.getCurrentUser?.() ?? null;
  const fullName = user?.fullName || user?.name || 'Teacher';

  return (
    <div className={styles.shell}>
      <TeacherSidebar fullName={fullName} activeKey={activeKey} />
      <div className={styles.main}>
        <TeacherTopbar title={title} fullName={fullName} />
        {children}
      </div>
    </div>
  );
}