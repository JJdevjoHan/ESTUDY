const PERFORMANCE_TONES = ['red', 'orange', 'blue'];

export function getDashboardStats(student, attempts) {
  const averageScore =
    attempts.length > 0
      ? attempts.reduce((total, attempt) => total + attempt.score, 0) / attempts.length
      : null;

  return [
    {
      label: 'Average score',
      value: averageScore === null ? '—' : `${formatScore(averageScore)}%`,
      detail:
        attempts.length === 0
          ? 'No assessments completed yet'
          : `Across ${attempts.length} ${attempts.length === 1 ? 'assessment' : 'assessments'}`,
      icon: 'award',
      tone: 'red',
    },
    {
      label: 'Assessments taken',
      value: String(attempts.length),
      detail: `${attempts.filter((attempt) => attempt.status === 'Completed').length} completed`,
      icon: 'streak',
      tone: 'darkRed',
    },
    {
      label: 'Year level',
      value: student.yearLevel ? `Year ${student.yearLevel}` : '—',
      detail: student.section ? `Section ${student.section}` : 'Section not set',
      icon: 'book',
      tone: 'blue',
    },
  ];
}

export function getRecentResults(attempts) {
  return [...attempts].sort(
    (first, second) => Date.parse(second.dateTaken) - Date.parse(first.dateTaken)
  );
}

export function getSubjectPerformance(attempts) {
  const bySubject = new Map();
  attempts.forEach((attempt) => {
    const scores = bySubject.get(attempt.subject) ?? [];
    scores.push(attempt.score);
    bySubject.set(attempt.subject, scores);
  });

  return [...bySubject.entries()]
    .map(([subject, scores]) => ({
      subject,
      score: scores.reduce((total, score) => total + score, 0) / scores.length,
    }))
    .sort((first, second) => second.score - first.score)
    .map((item, index) => ({
      ...item,
      tone: PERFORMANCE_TONES[index % PERFORMANCE_TONES.length],
    }));
}

export function formatScore(score) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(score);
}
