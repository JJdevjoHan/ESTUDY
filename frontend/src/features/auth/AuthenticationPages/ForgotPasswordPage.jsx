import { ArrowRight, MailCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../components/common/Button/Button.jsx';
import TextField from '../../../components/common/TextField/TextField.jsx';
import useForm from '../../../hooks/useForm.js';
import { ROUTES } from '../../../routes/paths.js';
import AuthModal from '../components/AuthModal/AuthModal.jsx';
import * as authService from '../services/authService.js';
import { validateForgotPassword } from '../utils/validators.js';
import styles from './AuthPage.module.css';


export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [sentTo, setSentTo] = useState('');

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: '' },
    validate: validateForgotPassword,
  });

  const submitEmail = async (formValues) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await authService.requestPasswordReset(formValues);
      setSentTo(formValues.email.trim());
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sentTo) {
    return (
      <AuthModal>
        <header className={styles.header}>
          <MailCheck size={36} aria-hidden="true" />
          <h1 id="auth-title" className={styles.title}>Check your email</h1>
          <p className={styles.subtitle}>
            If an account exists for <strong>{sentTo}</strong>, we sent a link to reset
            your password. The link expires in 15 minutes.
          </p>
        </header>
        <p className={styles.footer}>
          Didn&apos;t get it? Check your spam folder or{' '}
          <button
            type="button"
            className={styles.inlineLink}
            style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontWeight: 600, color: '#1c5bc0', cursor: 'pointer' }}
            onClick={() => setSentTo('')}
          >
            try again
          </button>
          .
        </p>
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
        <h1 id="auth-title" className={styles.title}>Forgot your password?</h1>
        <p className={styles.subtitle}>
          Enter your school email and we&apos;ll send you a link to reset it.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(submitEmail)} noValidate>
        {submitError && (
          <p className={styles.formError} role="alert">{submitError}</p>
        )}

        <TextField
          id="email"
          name="email"
          type="email"
          label="School email"
          placeholder="you@example.com"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Button type="submit" isLoading={isSubmitting} icon={<ArrowRight size={18} />}>
          Send reset link
        </Button>
      </form>

      <p className={styles.footer}>
        Remembered it? <Link to={ROUTES.LOGIN}>Back to log in</Link>
      </p>
    </AuthModal>
  );
}
