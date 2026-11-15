import { useEffect, useState } from 'react';

import Button from '../../../components/common/Button/Button.jsx';
import PasswordField from '../../../components/common/PasswordField/PasswordField.jsx';
import TextField from '../../../components/common/TextField/TextField.jsx';
import StudentLayout from '../../../components/layout/StudentLayout/StudentLayout.jsx';
import useForm from '../../../hooks/useForm.js';
import { ROLES } from '../../auth/constants/roles.js';
import * as authService from '../../auth/services/authService.js';
import TeacherLayout from '../../teacher/components/TeacherLayout.jsx';
import * as profileService from '../services/profileService.js';
import styles from './ProfilePage.module.css';

//same page ra tnan
function Shell({ role, children }) {
  if (role === ROLES.TEACHER) {
    return (
      <TeacherLayout activeKey="profile" title="PROFILE">
        {children}
      </TeacherLayout>
    );
  }
  return <StudentLayout activeNav="profile">{children}</StudentLayout>;
}

//profile details
function InfoRow({ label, value }) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoKey}>{label}</span>
      <span className={styles.infoVal}>{value || '—'}</span>
    </div>
  );
}

function detailRows(profile, isTeacher) {
  const common = [
    [isTeacher ? 'Teacher ID' : 'Student ID', profile.studentNumber],
    ['First name', profile.firstName],
    ['Last name', profile.lastName],
    ['Email', profile.email],
  ];
  return isTeacher
    ? [...common, ['Department', profile.department]]
    : [...common, ['Year level', profile.yearLevel], ['Section', profile.section]];
}

// LEFT card: only the details that sign-up did not ask for.
function EditCard({ profile, isTeacher, onSaved }) {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      yearLevel: profile.yearLevel ?? '',
      section: profile.section ?? '',
      department: profile.department ?? '',
    },
    validate: (v) => {
      const year = Number(v.yearLevel);
      const badYear = !isTeacher && v.yearLevel !== '' && (!Number.isInteger(year) || year < 1);
      return { yearLevel: badYear ? 'Enter a whole number, 1 or higher' : '' };
    },
  });

  const save = async (v) => {
    setIsSaving(true);
    setError('');
    setMessage('');
    try {
      const payload = isTeacher
        ? { department: v.department.trim() }
        : {
            yearLevel: v.yearLevel === '' ? null : Number(v.yearLevel),
            section: v.section.trim(),
          };
      const updated = await profileService.updateProfile(payload);
      onSaved(updated); // the details card on the right now shows the new values
      setMessage('Profile saved.');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className={styles.card} aria-labelledby="edit-profile">
      <h2 id="edit-profile" className={styles.cardLabel}>Edit profile</h2>
      <p className={styles.helper}>
        Fill in the details that were not part of sign-up. Your name, email and ID were set when you registered.
      </p>

      {message && <p className={styles.success} role="status">{message}</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit(save)} noValidate>
        {isTeacher ? (
          <TextField
            id="department"
            name="department"
            label="Department"
            placeholder="e.g. College of Computer Studies"
            maxLength={100}
            value={values.department}
            onChange={handleChange}
          />
        ) : (
          <>
            <TextField
              id="yearLevel"
              name="yearLevel"
              type="number"
              min="1"
              max="8"
              label="Year level"
              placeholder="e.g. 3"
              value={values.yearLevel}
              onChange={handleChange}
              error={errors.yearLevel}
            />
            <TextField
              id="section"
              name="section"
              label="Section"
              placeholder="e.g. G3"
              maxLength={20}
              value={values.section}
              onChange={handleChange}
            />
          </>
        )}

        <Button type="submit" isLoading={isSaving}>Save changes</Button>
      </form>
    </section>
  );
}

//change pass
function PasswordCard() {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    validate: (v) => ({
      currentPassword: v.currentPassword ? '' : 'Enter your current password',
      newPassword:
        v.newPassword.length < 8
          ? 'Use at least 8 characters'
          : v.newPassword === v.currentPassword
            ? 'Choose a different password from the current one'
            : '',
      confirmPassword: v.confirmPassword === v.newPassword ? '' : 'Passwords do not match',
    }),
  });

  //useForm ky walay reset
  const clearFields = () => {
    ['currentPassword', 'newPassword', 'confirmPassword'].forEach((name) =>
      handleChange({ target: { name, type: 'text', value: '' } })
    );
  };

  const save = async (v) => {
    setIsSaving(true);
    setError('');
    setMessage('');
    try {
      await profileService.changePassword({
        currentPassword: v.currentPassword,
        newPassword: v.newPassword,
      });
      setMessage('Password updated.');
      clearFields();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className={styles.card} aria-labelledby="change-password">
      <h2 id="change-password" className={styles.cardLabel}>Change password</h2>
      <p className={styles.helper}>Use at least 8 characters.</p>

      {message && <p className={styles.success} role="status">{message}</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit(save)} noValidate>
        <PasswordField
          id="currentPassword"
          name="currentPassword"
          label="Current password"
          autoComplete="current-password"
          value={values.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
        />
        <PasswordField
          id="newPassword"
          name="newPassword"
          label="New password"
          autoComplete="new-password"
          value={values.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm new password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button type="submit" isLoading={isSaving}>Update password</Button>
      </form>
    </section>
  );
}

export default function ProfilePage() {
  const role = authService.getCurrentUser?.()?.role;
  const isTeacher = role === ROLES.TEACHER;

  const [profile, setProfile] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let cancelled = false;
    profileService
      .getProfile()
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch((e) => {
        if (!cancelled) setLoadError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Shell role={role}>
      <div className={styles.page}>
        {loadError && <p className={styles.error} role="alert">{loadError}</p>}
        {!profile && !loadError && <p className={styles.muted}>Loading…</p>}

        {profile && (
          <>
            <header className={styles.header}>
              <h1 className={styles.title}>Welcome, {profile.firstName || 'there'}.</h1>
              <p className={styles.subtitle}>{profile.email}</p>
            </header>

            <div className={styles.grid}>
              {/*pikas ky ang change pass pd*/}
              <div className={styles.column}>
                {/* ang setProfile ky e refresh niya ang entire array */}
                <EditCard profile={profile} isTeacher={isTeacher} onSaved={setProfile} />
                <PasswordCard />
              </div>

              {/*right sya na display*/}
              <section className={styles.card} aria-labelledby="profile-details">
                <h2 id="profile-details" className={styles.cardLabel}>Profile details</h2>
                {detailRows(profile, isTeacher).map(([label, value]) => (
                  <InfoRow key={label} label={label} value={value} />
                ))}
              </section>
            </div>
          </>
        )}
      </div>
    </Shell>
  );
}