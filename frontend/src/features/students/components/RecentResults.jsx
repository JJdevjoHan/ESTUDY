import { useState } from 'react';
import { recentResults } from '../data/studentDashboardData.js';
import styles from './DashboardWidgets.module.css';

export default function RecentResults() {
  const [showAll, setShowAll] = useState(false);
  const visibleResults = showAll ? recentResults : recentResults.slice(0, 4);

  return (
    <section className={styles.resultsSection} aria-labelledby="recent-results-heading">
      <div className={styles.sectionHeading}>
        <div>
          <h2 id="recent-results-heading">Recent results</h2>
          <p>Your latest quizzes, assignments, and practice sessions</p>
        </div>
        <button
          className={styles.viewAllButton}
          type="button"
          onClick={() => setShowAll((current) => !current)}
          aria-expanded={showAll}
        >
          {showAll ? 'Show less' : 'View all'}
        </button>
      </div>

      <div className={styles.tableScroller}>
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">Type</th>
              <th scope="col">Score</th>
              <th scope="col">Status</th>
              <th scope="col">Due</th>
            </tr>
          </thead>
          <tbody>
            {visibleResults.map((result) => (
              <tr key={result.subject}>
                <th scope="row">{result.subject}</th>
                <td>{result.type}</td>
                <td className={styles.scoreCell}>{result.score}%</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      result.status === 'Passed' ? styles.passed : styles.review
                    }`}
                  >
                    {result.status}
                  </span>
                </td>
                <td>{result.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
