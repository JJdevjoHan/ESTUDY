import styles from './Button.module.css';

export default function Button({
  children,
  type = 'button',
  icon = null,
  isLoading = false,
  disabled = false,
  ...buttonProps
}) {
  return (
    <button
      type={type}
      className={styles.button}
      disabled={disabled || isLoading}
      {...buttonProps}
    >
      {isLoading ? 'Please wait…' : children}
      {!isLoading && icon}
    </button>
  );
}
