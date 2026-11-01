const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USER_KEY = 'user'; // diagnosticService.js writes to this same key

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

function saveUser(user) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // Storage unavailable (private mode, quota). The user just won't persist.
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
    // ignore
  }
}

// `mockData` is only used when there is no backend (VITE_API_BASE_URL not set).
async function post(path, body, mockData) {
  if (!API_BASE_URL) {
    await wait(700);
    return mockData ?? { user: { role: body.role ?? 'student' } };
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
export async function login({ email, password, rememberMe }) {
  const cleanEmail = email.trim();
  const previous = getCurrentUser();

  const data = await post(
    '/auth/login',
    { email: cleanEmail, password, rememberMe },
    {
      // Fake user for demos. An email containing "teacher" logs in as a teacher.
      user: {
        role: cleanEmail.toLowerCase().includes('teacher') ? 'teacher' : 'student',
        fullName: 'Juan Dela Cruz',
        email: cleanEmail,
        studentNumber: '12-3456-789',
        program: 'BSIT',
        year: 3,
        hasCompletedDiagnostic: previous?.hasCompletedDiagnostic ?? false,
      },
    }
  );

  saveUser(data.user);
  return data;
}

export const register = ({ role, fullName, email, schoolId, password }) =>
  post('/auth/register', {
    role,
    fullName: fullName.trim(),
    email: email.trim(),
    schoolId: schoolId.trim(),
    password,
  });