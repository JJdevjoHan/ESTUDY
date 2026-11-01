import styles from './QuestionCard.module.css';

export default function QuestionCard({ question, selectedOptionId, onSelect }) {
  return (
    <div className={styles.card}>
      <p className={styles.topic}>{question.topic}</p>
      <h2 className={styles.prompt}>{question.prompt}</h2>

      <div className={styles.options} role="radiogroup" aria-label="Answer choices">
        {question.options.map((option) => {
          const isSelected = option.id === selectedOptionId;

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.option} ${isSelected ? styles.selected : ''}`}
              onClick={() => onSelect(option.id)}
            >
              <span className={styles.marker} aria-hidden="true">
                {option.id.toUpperCase()}
              </span>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
