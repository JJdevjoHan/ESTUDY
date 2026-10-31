import styles from './TextField.module.css';

/**
 * Label + input + hint/error message.
 * `trailing` is an optional element drawn inside the right edge of the input
 * (PasswordField uses it for the show/hide button).
 */
export default function TextField({
  id,
  label,
  error = '',
  hint = '',
  trailing = null,
  ...inputProps
}) {
  const messageId = `${id}-message`;
  const hasMessage = Boolean(error || hint);

  const inputClassName = [
    styles.input,
    error ? styles.inputError : '',
    trailing ? styles.inputWithTrailing : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <div className={styles.control}>
        <input
          id={id}
          className={inputClassName}
          aria-invalid={Boolean(error)}
          aria-describedby={hasMessage ? messageId : undefined}
          {...inputProps}
        />
        {trailing}
      </div>

      {hasMessage && (
        <p
          id={messageId}
          className={error ? styles.error : styles.hint}
          role={error ? 'alert' : undefined}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
}
