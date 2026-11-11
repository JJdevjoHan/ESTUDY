import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Button from '../../../components/common/Button/Button.jsx';
import PasswordField from '../../../components/common/PasswordField/PasswordField.jsx';
import useForm from '../../../hooks/useForm.js';
import { ROUTES } from '../../../routes/paths.js';
import AuthModal from '../components/AuthModal/AuthModal.jsx';
import * as authService from '../services/authService.js';
import { validateResetPassword } from '../utils/validators.js';
import styles from './AuthPage.module.css';


export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isDone, setIsDone] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { password: '', confirmPassword: '' },
    validate: validateResetPassword,
  });

  const submitNewPassword = async (formValues) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await authService.resetPassword({ token, password: formValues.password });
      setIsDone(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <AuthModal>
        <header className={styles.header}>
          <h1 id="auth-title" className={styles.title}>Link not valid</h1>
          <p className={styles.subtitle}>
            This reset link is missing or has expired. Request a new one to continue.
          </p>
        </header>
        <p className={styles.footer}>
          <Link to={ROUTES.FORGOT_PASSWORD}>Request a new link</Link>
        </p>
      </AuthModal>
    );
  }

  if (isDone) {
    return (
      <AuthModal>
        <header className={styles.header}>
          <h1 id="auth-title" className={styles.title}>Password updated</h1>
          <p className={styles.subtitle}>You can now log in with your new password.</p>
        </header>
        <p className={styles.footer}>
          <Link to={ROUTES.LOGIN}>Back to log in</Link>
        </p>
      </AuthModal>
    );
  }

  return (
    <AuthModal>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Account recovery</span>
        <h1 id="auth-title" className={styles.title}>Set a new password</h1>
        <p className={styles.subtitle}>Choose a password you haven&apos;t used before.</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(submitNewPassword)} noValidate>
        {submitError && (
          <p className={styles.formError} role="alert">{submitError}</p>
        )}

        <PasswordField
          id="password"
          name="password"
          label="New password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm new password"
          placeholder="Re-enter your new password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button type="submit" isLoading={isSubmitting} icon={<ArrowRight size={18} />}>
          Reset password
        </Button>
      </form>
    </AuthModal>
  );
}
