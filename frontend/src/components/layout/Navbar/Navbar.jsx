import styles from './Navbar.module.css';

export default function Navbar({ fullName, details }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <span className={styles.logoBox} aria-hidden="true">E</span>
        <span className={styles.logoText}>EStudy</span>
      </div>

      <div className={styles.user}>
        <span className={styles.userName}>{fullName}</span>
        {details && <span className={styles.userDetails}>{details}</span>}
      </div>
    </header>
  );
}
