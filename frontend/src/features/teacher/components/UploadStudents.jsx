import { useRef, useState } from 'react';
import { Upload, Download } from 'lucide-react';
import { parseStudentSheet } from '../utils/parseStudentSheet.js';
import { importStudents } from '../store/classStore.js';
import widgets from './Widgets.module.css';
import styles from './ClassTools.module.css';

const PREVIEW_LIMIT = 5;

export default function UploadStudents({ subject, onClose }) {
  const fileInput = useRef(null);
  const [fileName, setFileName] = useState('');
  const [parsed, setParsed] = useState(null); // { rows, skipped, detected }
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setParsed(null);
    setSummary(null);
    setError('');
    setLoading(true);

    try {
      setParsed(await parseStudentSheet(file));
    } catch (err) {
      setError(err.message || 'This file could not be read.');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = () => {
    setSummary(importStudents(parsed.rows, subject.id));
    setParsed(null);
    setFileName('');
    if (fileInput.current) fileInput.current.value = '';
  };

  const handleTemplate = () => {
    const csv = 'Name,Email,Score,Engagement,Subject\nJuan Dela Cruz,juan@cit.edu,85,High,\n';
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'students-template.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const missingScores = parsed ? parsed.rows.filter((row) => !row.hasScore).length : 0;

  return (
    <section className={styles.panel}>
      <h2 className={styles.panelTitle}>Upload Excel file</h2>
      <p className={styles.hint}>
        The file needs a Name column. Email, Score, Engagement and Subject are optional. I find the
        columns by their header names. Rows without a Subject go to {subject.name}.
      </p>

      <div className={styles.uploadRow}>
        <label className={styles.primary}>
          <Upload size={16} aria-hidden="true" />
          Choose file
          <input
            ref={fileInput}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFile}
            hidden
          />
        </label>

        <button type="button" className={styles.secondary} onClick={handleTemplate}>
          <Download size={16} aria-hidden="true" />
          Download template
        </button>

        <button type="button" className={styles.secondary} onClick={onClose}>
          Close
        </button>

        {fileName && <span className={styles.fileName}>{fileName}</span>}
      </div>

      {loading && <p className={styles.hint}>Reading the file...</p>}

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {summary && (
        <p className={styles.success} role="status">
          Done. {summary.added} new, {summary.enrolled} added to this subject, {summary.updated}{' '}
          updated
          {summary.newSubjects > 0 ? `, ${summary.newSubjects} new subject created` : ''}.
        </p>
      )}

      {parsed && (
        <>
          <div className={styles.chips}>
            {parsed.detected.map((item) => (
              <span key={item.label} className={styles.chip}>
                {item.label}: {item.header}
              </span>
            ))}
          </div>

          <p className={styles.previewTitle}>
            Found {parsed.rows.length} students
            {parsed.rows.length > PREVIEW_LIMIT ? ` (showing the first ${PREVIEW_LIMIT})` : ''}
          </p>

          <div className={widgets.tableWrap}>
            <table className={widgets.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Score</th>
                  <th>Engagement</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {parsed.rows.slice(0, PREVIEW_LIMIT).map((row, index) => (
                  <tr key={`${row.name}-${index}`}>
                    <td>{row.name}</td>
                    <td>{row.email || '-'}</td>
                    <td>{row.hasScore ? `${row.score}%` : '-'}</td>
                    <td>{row.engagement}</td>
                    <td>{row.subject || subject.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(parsed.skipped.length > 0 || missingScores > 0) && (
            <ul className={styles.skipped}>
              {parsed.skipped.slice(0, 3).map((note) => (
                <li key={note}>{note} (skipped)</li>
              ))}
              {parsed.skipped.length > 3 && <li>and {parsed.skipped.length - 3} more skipped rows</li>}
              {missingScores > 0 && <li>{missingScores} students have no score. They will start at 0%.</li>}
            </ul>
          )}

          <div className={styles.formActions} style={{ marginTop: 14 }}>
            <button type="button" className={styles.primary} onClick={handleImport}>
              Import {parsed.rows.length} students
            </button>
          </div>
        </>
      )}
    </section>
  );
}