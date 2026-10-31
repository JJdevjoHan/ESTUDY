// All network calls for authentication live here, so pages never call fetch directly.
//
// If VITE_API_BASE_URL is NOT set in your .env file, this file returns fake
// data so you can build and demo the screens without a backend.
// Once the backend is ready, set VITE_API_BASE_URL and these become real calls.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function post(path, body) {
  if (!API_BASE_URL) {
    await wait(700);
    return { user: { role: body.role ?? 'student' } };
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

// TODO: match these paths and field names with the backend in src/auth.
export const login = ({ email, password, rememberMe }) =>
  post('/auth/login', { email: email.trim(), password, rememberMe });

export const register = ({ role, fullName, email, schoolId, password }) =>
  post('/auth/register', {
    role,
    fullName: fullName.trim(),
    email: email.trim(),
    schoolId: schoolId.trim(),
    password,
  });
