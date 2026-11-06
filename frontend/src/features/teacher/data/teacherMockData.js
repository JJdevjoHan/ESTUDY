export const SUBJECT_NAMES = ['Physics', 'Math', 'IE'];

export const subjects = [
  { id: 'physics', name: 'Physics' },
  { id: 'math', name: 'Math' },
  { id: 'ie', name: 'IE' },
];

// scores = the student's score in each subject they are enrolled in
export const students = [
  { id: 's1', name: 'Alex Perez', email: 'alex.perez@cit.edu', engagement: 'Medium', lastActive: 'Today', scores: { physics: 54, math: 62 } },
  { id: 's2', name: 'Maria Villanueva', email: 'maria.villanueva@cit.edu', engagement: 'Low', lastActive: '3 days ago', scores: { ie: 52, physics: 71 } },
  { id: 's3', name: 'Jon Reyes', email: 'jon.reyes@cit.edu', engagement: 'High', lastActive: 'Today', scores: { physics: 88, math: 91 } },
  { id: 's4', name: 'Ana Cruz', email: 'ana.cruz@cit.edu', engagement: 'High', lastActive: 'Yesterday', scores: { math: 84, ie: 79 } },
  { id: 's5', name: 'Paolo Santos', email: 'paolo.santos@cit.edu', engagement: 'Medium', lastActive: 'Yesterday', scores: { physics: 76, ie: 68 } },
  { id: 's6', name: 'Lea Garcia', email: 'lea.garcia@cit.edu', engagement: 'High', lastActive: 'Today', scores: { math: 95, physics: 90, ie: 92 } },
  { id: 's7', name: 'Mark Lim', email: 'mark.lim@cit.edu', engagement: 'Medium', lastActive: '2 days ago', scores: { ie: 73, math: 69 } },
  { id: 's8', name: 'Chloe Tan', email: 'chloe.tan@cit.edu', engagement: 'High', lastActive: 'Today', scores: { physics: 81 } },
  { id: 's9', name: 'Ryan Dizon', email: 'ryan.dizon@cit.edu', engagement: 'Low', lastActive: '5 days ago', scores: { math: 58, ie: 61 } },
  { id: 's10', name: 'Nina Ramos', email: 'nina.ramos@cit.edu', engagement: 'Medium', lastActive: 'Yesterday', scores: { physics: 67, math: 74, ie: 70 } },
];

export const earlyWarningFlags = [
  { id: 1, studentId: 's1', student: 'Alex P.', subject: 'Physics', type: 'critical', reason: 'Sudden 30% performance drop' },
  { id: 2, studentId: 's1', student: 'Alex P.', subject: 'Math', type: 'warning', reason: '2 missing consecutive assignments' },
  { id: 3, studentId: 's2', student: 'Maria V.', subject: 'IE', type: 'caution', reason: 'Consistent low engagement score' },
];

export const recheckRequests = [
  {
    id: 1,
    studentId: 's1',
    student: 'Alex P.',
    subject: 'Physics',
    activity: 'Quiz 1.1',
    date: 'Oct 25',
    question: 'Q5, Q7',
    reason: 'My answer for Q5 follows the formula from the lecture notes.',
    answer: 'Q5: v = d / t = 12 m/s\nQ7: The force doubles when the mass doubles.',
    status: 'in-review',
  },
  {
    id: 2,
    studentId: 's1',
    student: 'Alex P.',
    subject: 'Physics',
    activity: 'Quiz 1.1',
    date: 'Oct 15',
    question: 'Q5, Q6',
    reason: 'I think Q6 was marked wrong because of a unit mistake in the key.',
    answer: 'Q5: 9.8 m/s²\nQ6: 45 N',
    status: 'in-review',
  },
  {
    id: 3,
    studentId: 's2',
    student: 'Maria V.',
    subject: 'IE',
    activity: 'Final Exam',
    date: 'Oct 9',
    question: 'Q12',
    reason: 'My essay answer covers all three points listed in the rubric.',
    answer: 'Q12: Lean production reduces waste, shortens lead time and improves quality.',
    status: 'resolved',
    outcome: 'approved',
    note: 'Rechecked. You are right, I added 3 points.',
    resolvedOn: 'Oct 10',
  },
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