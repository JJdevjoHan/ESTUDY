import { useState } from 'react';
import { addStudent } from '../store/classStore.js';
import styles from './ClassTools.module.css';

const EMPTY_FORM = { name: '', email: '', score: '', engagement: 'Medium' };

export default function AddStudentForm({ subject, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState(null); // { type: 'error' | 'success', text }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setMessage(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = addStudent({ subjectId: subject.id, ...form });
    if (!result.ok) {
      setMessage({ type: 'error', text: result.error });
      return;
    }
    setForm(EMPTY_FORM);
    setMessage({ type: 'success', text: result.message });
  };

  return (
    <form className={styles.panel} onSubmit={handleSubmit}>
      <h2 className={styles.panelTitle}>Add student to {subject.name}</h2>

      <div className={styles.formRow}>
        <label className={styles.field}>
          <span>Student name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Juan Dela Cruz"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Email (optional)</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="juan@cit.edu"
          />
        </label>

        <label className={styles.field}>
          <span>Current score (%)</span>
          <input
            type="number"
            name="score"
            value={form.score}
            onChange={handleChange}
            min="0"
            max="100"
            placeholder="0 to 100"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Engagement</span>
          <select name="engagement" value={form.engagement} onChange={handleChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
      </div>

      <div className={styles.formActions} style={{ marginTop: 14 }}>
        <button type="submit" className={styles.primary}>
          Add student
        </button>
        <button type="button" className={styles.secondary} onClick={onClose}>
          Done
        </button>
      </div>

      {message && (
        <p
          className={message.type === 'error' ? styles.error : styles.success}
          role={message.type === 'error' ? 'alert' : 'status'}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}