export const SUBJECT_NAMES = ['Physics', 'Math', 'IE'];

export const earlyWarningFlags = [
  { id: 1, student: 'Alex P.', subject: 'Physics', type: 'critical', reason: 'Sudden 30% performance drop' },
  { id: 2, student: 'Alex P.', subject: 'Math', type: 'warning', reason: '2 missing consecutive assignments' },
  { id: 3, student: 'Maria V.', subject: 'IE', type: 'caution', reason: 'Consistent low engagement score' },
];

export const recheckRequests = [
  { id: 1, student: 'Alex P.', activity: 'Quiz 1.1', date: 'Oct 25', question: 'Q5, Q7', status: 'in-review' },
  { id: 2, student: 'Alex P.', activity: 'Quiz 1.1', date: 'Oct 15', question: 'Q5, Q6', status: 'in-review' },
  { id: 3, student: 'Maria V.', activity: 'Final Exam', date: 'Oct 9', question: 'Q12', status: 'resolved' },
];

// Percentage of students in each score range. Values follow SUBJECT_NAMES order.
export const performanceGroups = [
  { label: '0-20%', values: [55, 32, 30] },
  { label: '21-40%', values: [38, 42, 34] },
  { label: '41-60%', values: [49, 28, 43] },
  { label: '61-80%', values: [26, 24, 44] },
  { label: '81-100%', values: [5, 3, 6] },
];

export const recentUpdates = [
  { id: 1, activity: 'Physics Lab 3', date: 'Oct 28, 2024', className: 'CCS', avgScore: 95 },
  { id: 2, activity: 'Algebra Test', date: 'Oct 28, 2024', className: 'Algebras', avgScore: 100 },
];