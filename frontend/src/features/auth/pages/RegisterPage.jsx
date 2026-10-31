import { ArrowRight, Info } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import Button from '../../../components/common/Button/Button.jsx';
import Checkbox from '../../../components/common/Checkbox/Checkbox.jsx';
import PasswordField from '../../../components/common/PasswordField/PasswordField.jsx';
import TextField from '../../../components/common/TextField/TextField.jsx';
import useForm from '../../../hooks/useForm.js';
import { ROUTES, registerPath } from '../../../routes/paths.js';
import AuthLayout from '../components/AuthLayout/AuthLayout.jsx';
import RoleSelector from '../components/RoleSelector/RoleSelector.jsx';
import { ROLE_CONFIG, ROLES, isValidRole } from '../constants/roles.js';
import * as authService from '../services/authService.js';
import { validateRegistration } from '../utils/validators.js';
import styles from './AuthPage.module.css';
import registerStyles from './RegisterPage.module.css';

// One page for BOTH registration screens. The role comes from the URL:
//   /register/student  and  /register/teacher
export default function RegisterPage() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const config = ROLE_CONFIG[role];

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      fullName: '',
      email: '',
      schoolId: '',
      password: '',
      confirmPassword: '',
      agreedToTerms: false,
    },
    validate: (formValues) =>
      validateRegistration(formValues, config?.idLabel ?? 'ID'),
  });

  // Unknown role in the URL (e.g. /register/banana): send them to the student form.
  if (!isValidRole(role)) {
    return <Navigate to={registerPath(ROLES.STUDENT)} replace />;
  }

  const submitRegistration = async (formValues) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await authService.register({ ...formValues, role });
      navigate(ROUTES.LOGIN);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Your learning journey starts here</span>
        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>
          A clearer picture of learning. A place to begin.
        </p>
      </header>

      <form
        className={styles.form}
        onSubmit={handleSubmit(submitRegistration)}
        noValidate
      >
        {submitError && (
          <p className={styles.formError} role="alert">
            {submitError}
          </p>
        )}

        {/* Switching role changes the URL; typed values are kept. */}
        <RoleSelector
          value={role}
          onChange={(nextRole) => navigate(registerPath(nextRole))}
        />

        <TextField
          id="fullName"
          name="fullName"
          label="Full name"
          placeholder="Enter your full name"
          autoComplete="name"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <TextField
          id="email"
          name="email"
          type="email"
          label={config.emailLabel}
          placeholder="you@example.com"
          autoComplete="email"
          hint="Use an email you can access for account verification."
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <TextField
          id="schoolId"
          name="schoolId"
          label={config.idLabel}
          placeholder={config.idPlaceholder}
          autoComplete="off"
          value={values.schoolId}
          onChange={handleChange}
          error={errors.schoolId}
        />

        <div>
          <PasswordField
            id="password"
            name="password"
            label="Password"
            placeholder="Create a password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
          <p className={registerStyles.passwordHint}>
            <Info size={14} aria-hidden="true" />
            Use 8+ characters, with a letter and a number.
          </p>
        </div>

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Checkbox
          id="agreedToTerms"
          name="agreedToTerms"
          checked={values.agreedToTerms}
          onChange={handleChange}
          error={errors.agreedToTerms}
          label={
            <>
              I agree to EStudy&apos;s <a href="/terms">Terms of Use</a> and{' '}
              <a href="/privacy">Privacy Policy</a>.
            </>
          }
        />

        <Button type="submit" isLoading={isSubmitting} icon={<ArrowRight size={18} />}>
          Create account
        </Button>
      </form>

      <p className={styles.footer}>
        Already have an account? <Link to={ROUTES.LOGIN}>Log in</Link>
      </p>
    </AuthLayout>
  );
}
