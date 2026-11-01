import styles from './TestControls.module.css';

export default function TestControls({
  isFirst,
  isLast,
  isFlagged,
  onPrevious,
  onNext,
  onToggleFlag,
}) {
  return (
    <div className={styles.controls}>
      <button type="button" className={styles.previous} onClick={onPrevious} disabled={isFirst}>
        Previous
      </button>

      <button type="button" className={styles.flag} onClick={onToggleFlag} aria-pressed={isFlagged}>
        {isFlagged ? 'Remove flag' : 'Flag for review'}
      </button>

      <button type="button" className={styles.next} onClick={onNext} disabled={isLast}>
        Next question
      </button>
    </div>
  );
}
