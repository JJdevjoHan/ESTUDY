import { useState } from 'react';

/**
 * Tiny form helper shared by every auth page.
 *
 * @param initialValues  e.g. { email: '', password: '' }
 * @param validate       function(values) -> { fieldName: 'error message' | '' }
 */
export default function useForm({ initialValues, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Works for text inputs and checkboxes. The input's "name" must match a key in values.
  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setValues((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  };

  // Wrap your submit function: onSubmit={handleSubmit(submitFn)}
  // submitFn only runs when every field passes validation.
  const handleSubmit = (submitFn) => async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (!hasErrors) {
      await submitFn(values);
    }
  };

  return { values, errors, handleChange, handleSubmit };
}
