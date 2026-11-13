import { useState } from 'react';
import { addSubject } from '../store/classStore.js';
import styles from './ClassTools.module.css';

export default function AddSubjectForm({ onAdded, onClose }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = addSubject(name);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onAdded(result.subject);
  };

  return (
    <form className={styles.panel} onSubmit={handleSubmit}>
      <h2 className={styles.panelTitle}>Add subject</h2>

      <div className={styles.formRow}>
        <label className={styles.field}>
          <span>Subject name</span>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="e.g. Chemistry"
            autoFocus
          />
        </label>

        <div className={styles.formActions}>
          <button type="submit" className={styles.primary}>
            Add subject
          </button>
          <button type="button" className={styles.secondary} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}