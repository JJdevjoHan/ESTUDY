import styles from './Checkbox.module.css';

// `label` can be plain text or JSX (for example text with links in it).
export default function Checkbox({ id, label, error = '', ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className={styles.checkbox}>
        <input id={id} type="checkbox" className={styles.input} {...inputProps} />
        <span>{label}</span>
      </label>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
