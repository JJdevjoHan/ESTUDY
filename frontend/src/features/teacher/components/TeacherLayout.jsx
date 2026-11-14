import estudyLogo from '../../../assets/images/estudy-logo-white.svg';
import Sidebar from '../../../components/layout/Sidebar/Sidebar.jsx';
import * as authService from '../../auth/services/authService.js';
import { TEACHER_NAV } from '../data/teacherNav.js';
import TeacherTopbar from './TeacherTopbar.jsx';
import styles from './TeacherLayout.module.css';

export default function TeacherLayout({ activeKey = 'dashboard', title, children }) {
  const user = authService.getCurrentUser?.() ?? null;
  const fullName = user?.fullName || user?.name || 'Teacher';

  return (
    <div className={styles.shell}>
      <Sidebar
        theme="teacher"
        side="right"
        logo={estudyLogo}
        items={TEACHER_NAV.main}
        bottomItems={TEACHER_NAV.bottom}
        activeKey={activeKey}
        user={{ fullName, roleLabel: 'Instructor' }}
        label="Teacher navigation"
      />
      <div className={styles.main}>
        <TeacherTopbar title={title} fullName={fullName} />
        {children}
      </div>
    </div>
  );
}