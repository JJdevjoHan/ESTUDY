import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../../components/common/Button/Button.jsx';
import TextField from '../../../components/common/TextField/TextField.jsx';
import useForm from '../../../hooks/useForm.js';
import { ROUTES } from '../../../routes/paths.js';
import AuthModal from '../components/AuthModal/AuthModal.jsx';
import * as authService from '../services/authService.js';
import { validateForgotPassword } from '../utils/validators.js';
import styles from './AuthPage.module.css';


export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', schoolId: '', fullName: '' },
    validate: validateForgotPassword,
  });

 
  const submitDetails = async (formValues) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const { token } = await authService.verifyRecovery(formValues);
      navigate(`${ROUTES.RESET_PASSWORD}?token=${encodeURIComponent(token)}`);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthModal>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Account recovery</span>
        <h1 id="auth-title" className={styles.title}>Forgot your password?</h1>
        <p className={styles.subtitle}>
          Enter the details you registered with. If they match, you can set a new password.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(submitDetails)} noValidate>
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

        <TextField
          id="schoolId"
          name="schoolId"
          label="School ID"
          placeholder="00-0000-000"
          value={values.schoolId}
          onChange={handleChange}
          error={errors.schoolId}
        />

        <TextField
          id="fullName"
          name="fullName"
          label="Full name"
          placeholder="Juan Dela Cruz"
          autoComplete="name"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <Button type="submit" isLoading={isSubmitting} icon={<ArrowRight size={18} />}>
          Verify and continue
        </Button>
      </form>

      <p className={styles.footer}>
        Remembered it? <Link to={ROUTES.LOGIN}>Back to log in</Link>
      </p>
    </AuthModal>
  );
}