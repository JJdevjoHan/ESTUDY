import { API_BASE_URL } from '../../../config/api.js';

async function get(path, signal) {
  if (!API_BASE_URL) {
    throw new Error('The backend is not connected. Check VITE_API_BASE_URL in .env.');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { signal });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message ?? data.error ?? 'Could not load student dashboard data.');
  }
  return data;
}

export async function getStudentDashboard(userId, { signal } = {}) {
  if (!userId) {
    throw new Error('Your login session is missing its backend account ID. Please sign in again.');
  }

  const student = await get(`/student/getStudentByUser/${userId}`, signal);
  if (!student?.studentId) {
    throw new Error('The student record could not be found for this account.');
  }

  const attempts = await get(`/attempt/getStudentAttempts/${student.studentId}`, signal);
  if (!Array.isArray(attempts)) {
    throw new Error('The backend returned an invalid student assessment history.');
  }

  return { student, attempts };
}
