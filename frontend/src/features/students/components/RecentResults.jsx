import { useState } from 'react';
import { formatScore } from '../data/studentDashboardData.js';
import styles from './DashboardWidgets.module.css';

function formatDate(dateTaken) {
  if (!dateTaken) return '—';
  const date = new Date(dateTaken);
  return Number.isNaN(date.getTime())
    ? dateTaken
    : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date);
}

export default function RecentResults({ results }) {
  const [showAll, setShowAll] = useState(false);
  const visibleResults = showAll ? results : results.slice(0, 4);

  return (
    <section className={styles.resultsSection} aria-labelledby="recent-results-heading">
      <div className={styles.sectionHeading}>
        <div>
          <h2 id="recent-results-heading">Recent results</h2>
          <p>Your latest assessment attempts</p>
        </div>
        {results.length > 4 && (
          <button
            className={styles.viewAllButton}
            type="button"
            onClick={() => setShowAll((current) => !current)}
            aria-expanded={showAll}
          >
            {showAll ? 'Show less' : 'View all'}
          </button>
        )}
      </div>

      <div className={styles.tableScroller}>
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">Correct</th>
              <th scope="col">Score</th>
              <th scope="col">Status</th>
              <th scope="col">Date taken</th>
            </tr>
          </thead>
          <tbody>
            {visibleResults.length === 0 ? (
              <tr>
                <td colSpan="5">No assessment attempts yet.</td>
              </tr>
            ) : (
              visibleResults.map((result) => (
                <tr key={result.attemptId}>
                  <th scope="row">{result.subject}</th>
                  <td>
                    {result.correct}/{result.total}
                  </td>
                  <td className={styles.scoreCell}>{formatScore(result.score)}%</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        result.status === 'Completed' ? styles.passed : styles.review
                      }`}
                    >
                      {result.status}
                    </span>
                  </td>
                  <td>{formatDate(result.dateTaken)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
