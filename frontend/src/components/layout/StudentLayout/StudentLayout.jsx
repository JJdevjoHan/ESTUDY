import useCurrentUser from '../../../hooks/useCurrentUser.js';
import Navbar from '../Navbar/Navbar.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import styles from './StudentLayout.module.css';

/**
 * Shared shell for every student page: red header + orange sidebar.
 * Pass `sidebarLocked` while the diagnostic test is still pending.
 */
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
        <Sidebar locked={sidebarLocked} activeKey={activeNav} />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
