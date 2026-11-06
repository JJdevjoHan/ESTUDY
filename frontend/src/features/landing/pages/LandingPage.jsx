import {
  ArrowRight,
  ClipboardCheck,
  Target,
  TrendingUp,
} from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

import estudyLogoColor from '../../../assets/images/estudy-logo.svg';
import estudyLogoWhite from '../../../assets/images/estudy-logo-white.svg';
import studentsIllustration from '../../../assets/images/auth-students.png';
import { ROUTES, registerPath } from '../../../routes/paths.js';
import { ROLES } from '../../auth/constants/roles.js';
import styles from './LandingPage.module.css';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
];

const FEATURES = [
  {
    id: 'diagnostic',
    Icon: ClipboardCheck,
    title: 'Personalized Diagnostic Test',
    text: 'Baseline assessments mapped to your subjects and sub-topics show where you stand from day one.',
  },
  {
    id: 'gaps',
    Icon: Target,
    title: 'Pinpoint your learning gaps',
    text: 'See exactly which sub-topics need attention, not just one overall score.',
  },
  {
    id: 'tracking',
    Icon: TrendingUp,
    title: 'Performance Tracking',
    text: 'Quizzes, activities and exams come together in trend graphs for every subject.',
  },
];

const STEPS = [
  { id: 1, title: 'Create your account', text: 'Join as a student or a teacher in under a minute.' },
  { id: 2, title: 'Take your diagnostic test', text: 'Answer a short assessment built around your subjects.' },
  { id: 3, title: 'Review your dashboard', text: 'Spot weak topics early and watch your scores improve.' },
];

// Thin wavy lines in the hero background (purely decorative).
function ContourLines() {
  return (
    <svg className={styles.contours} viewBox="0 0 640 300" fill="none" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => (
        <path
          key={index}
          d="M-20 90 C 120 -10, 210 190, 340 110 S 540 30, 660 150"
          transform={`translate(0 ${index * 13})`}
          stroke="currentColor"
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

/**
 * The public landing page. It is also the "layout" for the Log in / Sign up routes:
 * <Outlet /> is where the popup card (LoginPage / RegisterPage) is drawn on top of it.
 */
export default function LandingPage() {
  return (
    <div className={styles.page}>
      {/* ---------- Hero ---------- */}
      <header id="home" className={styles.hero}>
        <div className={styles.decor} aria-hidden="true">
          <span className={styles.band} />
          <span className={styles.glow} />
          <span className={`${styles.ring} ${styles.ringLarge}`} />
          <span className={`${styles.ring} ${styles.ringSmall}`} />
          <span className={`${styles.ring} ${styles.ringThin}`} />
          <ContourLines />
        </div>

        <nav className={styles.nav} aria-label="Main">
          <Link to={ROUTES.HOME} className={styles.logoLink} aria-label="EStudy home">
            <img src={estudyLogoWhite} alt="EStudy" className={styles.logo} />
          </Link>

          <ul className={styles.navLinks}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>

          <div className={styles.navActions}>
            <Link to={ROUTES.LOGIN} className={styles.navLogin}>
              Log in
            </Link>
            <Link to={registerPath(ROLES.STUDENT)} className={styles.navSignup}>
              Sign up
            </Link>
          </div>
        </nav>

        <div className={styles.heroBody}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>Personalized diagnostic learning</span>
            <h1 className={styles.headline}>
              Bridge the Gap
              <span className={styles.headlineSoft}>in your learning.</span>
            </h1>
            <p className={styles.lead}>
              Diagnose your weak topics and track your progress in one place.
            </p>

            <div className={styles.cta}>
              <Link to={registerPath(ROLES.STUDENT)} className={styles.ctaPrimary}>
                Get started
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to={ROUTES.LOGIN} className={styles.ctaSecondary}>
                Log in
              </Link>
            </div>
            <p className={styles.audience}>Made for students and teachers.</p>
          </div>

          <div className={styles.visual}>
            <span className={styles.disc} aria-hidden="true" />
            <span className={`${styles.chip} ${styles.chipTop}`} aria-hidden="true">
              <Target size={16} /> Pinpoint your learning gaps
            </span>
            <span className={`${styles.chip} ${styles.chipBottom}`} aria-hidden="true">
              <TrendingUp size={16} /> Performance Tracking
            </span>
            <img src={studentsIllustration} alt="Students studying together" className={styles.students} />
          </div>
        </div>
      </header>

      <main>
        {/* ---------- Features ---------- */}
        <section id="features" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>Features</span>
            <h2 className={styles.sectionTitle}>One place to find the gap</h2>
            <p className={styles.sectionText}>
              EStudy turns assessment results into a clear picture of what to focus on next.
            </p>
          </div>

          <ul className={styles.cards}>
            {FEATURES.map(({ id, Icon, title, text }) => (
              <li key={id} className={styles.card}>
                <span className={styles.cardIcon}>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardText}>{text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- How it works ---------- */}
        <section id="how-it-works" className={`${styles.section} ${styles.sectionTint}`}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>How it works</span>
            <h2 className={styles.sectionTitle}>Three simple steps</h2>
          </div>

          <ol className={styles.steps}>
            {STEPS.map(({ id, title, text }) => (
              <li key={id} className={styles.step}>
                <span className={styles.stepNumber}>{id}</span>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardText}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Final call to action ---------- */}
        <section className={styles.finalCta}>
          <h2 className={styles.finalTitle}>Ready to find your gaps?</h2>
          <Link to={registerPath(ROLES.STUDENT)} className={styles.ctaPrimary}>
            Create your account
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <img src={estudyLogoColor} alt="EStudy" className={styles.footerLogo} />
        <p>&copy; 2026 EStudy. All rights reserved.</p>
      </footer>

      {/* The Log in / Sign up popup appears here when the URL is /login or /register/... */}
      <Outlet />
    </div>
  );
}
