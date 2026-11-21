import { API_BASE_URL } from '../../../config/api.js';

const USER_KEY = 'user';

export function saveUser(user) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // Storage may be unavailable in restricted browser contexts.
  }
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export function logout() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
    // Storage may be unavailable in restricted browser contexts.
  }
}

async function post(path, body) {
  if (!API_BASE_URL) {
    throw new Error('The backend is not connected. Set VITE_API_BASE_URL to your API URL.');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message ?? 'Something went wrong. Please try again.');
  }
  return data;
}

export async function login({ email, password, rememberMe }) {
  const cleanEmail = email.trim();
  const data = await post('/auth/login', { email: cleanEmail, password, rememberMe });
  if (!data.user?.userId) {
    throw new Error('The backend login response did not include an account ID.');
  }

  saveUser(data.user);
  return data;
}

export async function register({ role, fullName, email, schoolId, password }) {
  return post('/auth/register', {
    role,
    fullName: fullName.trim(),
    email: email.trim(),
    schoolId: schoolId.trim(),
    password,
  });
}

export const verifyRecovery = ({ email, schoolId, fullName }) =>
  post('/users/verify-recovery', {
    email: email.trim(),
    schoolId: schoolId.trim(),
    fullName: fullName.trim(),
  });

export const resetPassword = ({ token, email, schoolId, password }) =>
  post('/users/reset-password', {
    token,
    email: email.trim(),
    schoolId: schoolId.trim(),
    newPassword: password,
  });