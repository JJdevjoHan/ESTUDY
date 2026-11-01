import styles from './QuestionNavigator.module.css';

export default function QuestionNavigator({ questions, currentIndex, answers, flagged, onSelect }) {
  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Question navigator</h3>

      <ol className={styles.grid}>
        {questions.map((question, index) => {
          const isCurrent = index === currentIndex;
          const isAnswered = Boolean(answers[question.id]);
          const isFlagged = Boolean(flagged[question.id]);

          const className = [
            styles.cell,
            isAnswered && styles.answered,
            isFlagged && styles.flagged,
            isCurrent && styles.current,
          ]
            .filter(Boolean)
            .join(' ');

          const status = [
            isAnswered ? 'answered' : 'not answered',
            isFlagged ? 'flagged' : null,
            isCurrent ? 'current' : null,
          ]
            .filter(Boolean)
            .join(', ');

          return (
            <li key={question.id}>
              <button
                type="button"
                className={className}
                onClick={() => onSelect(index)}
                aria-label={`Question ${index + 1}, ${status}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {index + 1}
              </button>
            </li>
          );
        })}
      </ol>

      <ul className={styles.legend}>
        <li><span className={`${styles.swatch} ${styles.answered}`} /> Answered</li>
        <li><span className={`${styles.swatch} ${styles.flagged}`} /> Flagged</li>
        <li><span className={`${styles.swatch} ${styles.current}`} /> Current</li>
      </ul>
    </div>
  );
}
