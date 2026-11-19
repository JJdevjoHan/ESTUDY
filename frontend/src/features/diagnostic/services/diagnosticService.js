import { getCurrentUser, saveUser } from '../../auth/services/authService.js';
import { API_BASE_URL } from '../../../config/api.js';

export const DIAGNOSTIC_SUBJECT = 'Mathematics';
export const DIAGNOSTIC_MINUTES = 20;
export const QUESTION_COUNT = 10;

function requireApiUrl() {
  if (!API_BASE_URL) {
    throw new Error('The backend is not connected. Set VITE_API_BASE_URL to your API URL.');
  }
}

async function readResponse(response, fallbackMessage) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message ?? data.error ?? fallbackMessage);
  }
  return data;
}

export async function getQuestions() {
  requireApiUrl();
  const response = await fetch(
    `${API_BASE_URL}/question/getQuestionsBySubject/${encodeURIComponent(DIAGNOSTIC_SUBJECT)}`
  );
  const questions = await readResponse(response, 'Could not load the test. Refresh to try again.');
  if (!Array.isArray(questions)) {
    throw new Error('The backend returned an invalid question list.');
  }
  return questions;
}

export async function submitDiagnostic(answers) {
  requireApiUrl();
  const user = getCurrentUser();
  if (!user?.userId) {
    throw new Error('Your session is missing its account ID. Log in again before submitting.');
  }

  const response = await fetch(`${API_BASE_URL}/attempt/postNewAttempt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user.userId, subject: DIAGNOSTIC_SUBJECT, answers }),
  });
  const result = await readResponse(response, 'Could not submit your test. Try again.');

  saveUser({ ...user, hasCompletedDiagnostic: true });
  return result;
}
