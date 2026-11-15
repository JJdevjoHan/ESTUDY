import { getCurrentUser, saveUser } from '../../auth/services/authService.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, method, body) {
  if (!API_BASE_URL) {
    throw new Error('The backend is not connected. Check VITE_API_BASE_URL in .env.');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message ?? 'Something went wrong. Please try again.');
  }
  return data;
}

function currentUserId() {
  const userId = getCurrentUser()?.userId;
  if (!userId) {
    throw new Error('Please log out and log in again.');
  }
  return userId;
}

//GET /api/user/getProfile/{id}, PUT /putProfile/{id}, PUT /changePassword/{id}
export const getProfile = () => request(`/user/getProfile/${currentUserId()}`, 'GET');

export async function updateProfile(values) {
  const profile = await request(`/user/putProfile/${currentUserId()}`, 'PUT', values);

  //sync ang session 
  const current = getCurrentUser();
  saveUser({
    ...current,
    fullName: `${profile.firstName} ${profile.lastName}`.trim(),
    email: profile.email,
    year: profile.yearLevel ?? current.year,
  });

  return profile;
}

export const changePassword = ({ currentPassword, newPassword }) =>
  request(`/user/changePassword/${currentUserId()}`, 'PUT', { currentPassword, newPassword });