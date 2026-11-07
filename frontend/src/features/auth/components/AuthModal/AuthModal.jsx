import { GraduationCap, Sparkle, X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import estudyIcon from '../../../../assets/images/estudy-icon.svg';
import { ROUTES } from '../../../../routes/paths.js';
import styles from './AuthModal.module.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';


export default function AuthModal({ children }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const close = useCallback(() => navigate(ROUTES.HOME), [navigate]);

  useEffect(() => {
    
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cardRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
     
      if (event.key === 'Tab' && cardRef.current) {
        const items = [...cardRef.current.querySelectorAll(FOCUSABLE)];
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={cardRef}
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        tabIndex={-1}
      >
        <div className={styles.banner} aria-hidden="true">
          <span className={styles.moon}>
            <GraduationCap size={46} strokeWidth={1.8} />
          </span>
          <span className={`${styles.dot} ${styles.dotA}`} />
          <span className={`${styles.dot} ${styles.dotB}`} />
          <span className={`${styles.dot} ${styles.dotC}`} />
          <span className={styles.ring} />
          <Sparkle className={styles.sparkle} size={22} fill="currentColor" />
          <img src={estudyIcon} alt="" className={styles.icon} />
          <svg
            className={styles.hill}
            viewBox="0 0 440 60"
            preserveAspectRatio="none"
          >
            <path d="M0 60 V38 C 110 -6, 330 -6, 440 38 V60 Z" fill="#ffffff" />
          </svg>
        </div>

        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label="Close"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
