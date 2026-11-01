import styles from './TestTimer.module.css';

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export default function TestTimer({ secondsLeft }) {
  const isLow = secondsLeft <= 60;

  return (
    <div
      className={`${styles.timer} ${isLow ? styles.low : ''}`}
      role="timer"
      aria-label={`Time left: ${formatTime(secondsLeft)}`}
    >
      {formatTime(secondsLeft)}
    </div>
  );
}
