import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../../components/common/Button/Button.jsx';
import Checkbox from '../../../components/common/Checkbox/Checkbox.jsx';
import PasswordField from '../../../components/common/PasswordField/PasswordField.jsx';
import TextField from '../../../components/common/TextField/TextField.jsx';
import useForm from '../../../hooks/useForm.js';
import { ROUTES, registerPath } from '../../../routes/paths.js';
import AuthLayout from '../components/AuthLayout/AuthLayout.jsx';
import { DASHBOARD_BY_ROLE, ROLES } from '../constants/roles.js';
import * as authService from '../services/authService.js';
import { validateLogin } from '../utils/validators.js';
import styles from './AuthPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '', rememberMe: false },
    validate: validateLogin,
  });

  const submitLogin = async (formValues) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const { user } = await authService.login(formValues);
      navigate(DASHBOARD_BY_ROLE[user.role]);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Your next step starts here</span>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Log in to pick up where you left off.</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(submitLogin)} noValidate>
        {submitError && (
          <p className={styles.formError} role="alert">
            {submitError}
          </p>
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

        <PasswordField
          id="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className={styles.options}>
          <Checkbox
            id="rememberMe"
            name="rememberMe"
            label="Remember me"
            checked={values.rememberMe}
            onChange={handleChange}
          />
          <Link to={ROUTES.FORGOT_PASSWORD} className={styles.inlineLink}>
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={isSubmitting} icon={<ArrowRight size={18} />}>
          Log in
        </Button>
      </form>

      <p className={styles.footer}>
        Don&apos;t have an account?{' '}
        <Link to={registerPath(ROLES.STUDENT)}>Create account</Link>
      </p>
    </AuthLayout>
  );
}
