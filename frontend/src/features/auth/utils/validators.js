const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

// Each validator returns an error message, or '' when the value is fine.
const validateEmail = (email) => {
  if (!email.trim()) return 'Email is required.';
  if (!EMAIL_PATTERN.test(email.trim())) return 'Enter a valid email address.';
  return '';
};

const validateRequired = (value, fieldName) =>
  value.trim() ? '' : `${fieldName} is required.`;

const validateNewPassword = (password) => {
  if (!password) return 'Password is required.';
  if (!PASSWORD_PATTERN.test(password)) {
    return 'Use 8+ characters, with a letter and a number.';
  }
  return '';
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return '';
};

export const validateLogin = ({ email, password }) => ({
  email: validateEmail(email),
  password: password ? '' : 'Password is required.',
});

export const validateRegistration = (values, idLabel) => ({
  fullName: validateRequired(values.fullName, 'Full name'),
  email: validateEmail(values.email),
  schoolId: validateRequired(values.schoolId, idLabel),
  password: validateNewPassword(values.password),
  confirmPassword: validateConfirmPassword(
    values.password,
    values.confirmPassword,
  ),
  agreedToTerms: values.agreedToTerms
    ? ''
    : 'You must agree to the Terms of Use and Privacy Policy.',
});
