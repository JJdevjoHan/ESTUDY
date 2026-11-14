import { STUDENT_NAV } from '../../../features/students/data/studentNav.js';
import useCurrentUser from '../../../hooks/useCurrentUser.js';
import Navbar from '../Navbar/Navbar.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import styles from './StudentLayout.module.css';

export default function StudentLayout({
  children,
  sidebarLocked = false,
  activeNav = 'testHub',
}) {
  const { fullName, details } = useCurrentUser();

  return (
    <div className={styles.shell}>
      <Navbar fullName={fullName} details={details} />
      <div className={styles.body}>
        <Sidebar
          theme="student"
          side="right" //from left to right hahaha
          items={STUDENT_NAV.main}
          bottomItems={STUDENT_NAV.bottom}
          activeKey={activeNav}
          locked={sidebarLocked}
          lockedMessage="Finish your diagnostic test to unlock the rest of EStudy"
          user={{ fullName, roleLabel: 'Student' }}
          label="Student navigation"
        />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}