export const DIAGNOSTIC_SUBJECT = 'Mathematics';
export const DIAGNOSTIC_MINUTES = 20;

const USER_STORAGE_KEY = 'user'; 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const QUESTIONS = [
  {
    id: 'q1',
    topic: 'Algebra: linear equations',
    prompt: 'Solve for x: 3(x - 4) + 5 = 2x + 7',
    options: [
      { id: 'a', text: 'x = 10' },
      { id: 'b', text: 'x = 14' },
      { id: 'c', text: 'x = 16' },
      { id: 'd', text: 'x = 18' },
    ],
    correctId: 'b',
  },
  {
    id: 'q2',
    topic: 'Algebra: linear equations',
    prompt: 'Solve for x: 2x + 6 = 20',
    options: [
      { id: 'a', text: 'x = 5' },
      { id: 'b', text: 'x = 7' },
      { id: 'c', text: 'x = 8' },
      { id: 'd', text: 'x = 10' },
    ],
    correctId: 'b',
  },
  {
    id: 'q3',
    topic: 'Algebra: factoring',
    prompt: 'Factor completely: x² - 9',
    options: [
      { id: 'a', text: '(x - 3)²' },
      { id: 'b', text: '(x - 3)(x + 3)' },
      { id: 'c', text: '(x + 9)(x - 1)' },
      { id: 'd', text: '(x - 9)(x + 1)' },
    ],
    correctId: 'b',
  },
  {
    id: 'q4',
    topic: 'Algebra: quadratic equations',
    prompt: 'What are the solutions of x² - 5x + 6 = 0?',
    options: [
      { id: 'a', text: 'x = 1 and x = 6' },
      { id: 'b', text: 'x = 2 and x = 3' },
      { id: 'c', text: 'x = -2 and x = -3' },
      { id: 'd', text: 'x = 5 and x = 1' },
    ],
    correctId: 'b',
  },
  {
    id: 'q5',
    topic: 'Arithmetic: fractions',
    prompt: 'What is 3/4 + 1/6?',
    options: [
      { id: 'a', text: '4/10' },
      { id: 'b', text: '11/12' },
      { id: 'c', text: '3/8' },
      { id: 'd', text: '5/6' },
    ],
    correctId: 'b',
  },
  {
    id: 'q6',
    topic: 'Geometry: area',
    prompt: 'What is the area of a circle with radius 5? Use π = 3.14.',
    options: [
      { id: 'a', text: '31.4' },
      { id: 'b', text: '78.5' },
      { id: 'c', text: '15.7' },
      { id: 'd', text: '25' },
    ],
    correctId: 'b',
  },
  {
    id: 'q7',
    topic: 'Algebra: exponents',
    prompt: 'Simplify: (2x³)²',
    options: [
      { id: 'a', text: '2x⁶' },
      { id: 'b', text: '4x⁵' },
      { id: 'c', text: '4x⁶' },
      { id: 'd', text: '2x⁵' },
    ],
    correctId: 'c',
  },
  {
    id: 'q8',
    topic: 'Trigonometry: special angles',
    prompt: 'What is sin 30°?',
    options: [
      { id: 'a', text: '1/2' },
      { id: 'b', text: '√3/2' },
      { id: 'c', text: '1' },
      { id: 'd', text: '√2/2' },
    ],
    correctId: 'a',
  },
  {
    id: 'q9',
    topic: 'Statistics: mean',
    prompt: 'What is the mean of 2, 5, 6, 9 and 13?',
    options: [
      { id: 'a', text: '6' },
      { id: 'b', text: '7' },
      { id: 'c', text: '8' },
      { id: 'd', text: '9' },
    ],
    correctId: 'b',
  },
  {
    id: 'q10',
    topic: 'Algebra: systems of equations',
    prompt: 'If x + y = 10 and x - y = 2, what is x?',
    options: [
      { id: 'a', text: 'x = 4' },
      { id: 'b', text: 'x = 5' },
      { id: 'c', text: 'x = 6' },
      { id: 'd', text: 'x = 8' },
    ],
    correctId: 'c',
  },
];

export const QUESTION_COUNT = QUESTIONS.length;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export async function getQuestions() {
  
  if (!API_BASE_URL) {
    await wait(300);
    return QUESTIONS.map(({ correctId, ...question }) => question);
  }

  const response = await fetch(
    `${API_BASE_URL}/question/getQuestionsBySubject/${encodeURIComponent(DIAGNOSTIC_SUBJECT)}`
  );
  if (!response.ok) throw new Error('Could not load the test. Refresh to try again.');
  return response.json();
}

function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
  } catch {
    return null;
  }
}

function markDiagnosticComplete() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return;
    const user = JSON.parse(raw);
    localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify({ ...user, hasCompletedDiagnostic: true })
    );
  } catch {
    
  }
}


export async function submitDiagnostic(answers) {
  if (API_BASE_URL) {
    const user = getSavedUser();
    const response = await fetch(`${API_BASE_URL}/attempt/postNewAttempt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.userId, subject: DIAGNOSTIC_SUBJECT, answers }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message ?? 'Could not submit your test. Try again.');

    markDiagnosticComplete();
    
    return data;
  }

  await wait(500);

  const byTopic = {};
  let correct = 0;

  QUESTIONS.forEach((question) => {
    const isCorrect = answers[question.id] === question.correctId;
    if (isCorrect) correct += 1;
    byTopic[question.topic] ??= { correct: 0, total: 0 };
    byTopic[question.topic].total += 1;
    if (isCorrect) byTopic[question.topic].correct += 1;
  });

  markDiagnosticComplete();

  const total = QUESTIONS.length;
  
  const score = Math.round((correct / total) * 10000) / 100;

  return { correct, total, score, byTopic };
}
