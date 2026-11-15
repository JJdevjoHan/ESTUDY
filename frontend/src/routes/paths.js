//ari ang routing, whats here should match sa backend routes and frontend
export const ROUTES = {
  HOME: '/', //landing page which is the first thing
  LOGIN: '/login',
  LOGOUT: '/logout',
  PROFILE: '/profile',
  REGISTER: '/register/:role',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD_STUDENT: '/student/dashboard',
  DASHBOARD_TEACHER: '/teacher/dashboard',
  DASHBOARD_ADMIN: '/admin/dashboard',
  DIAGNOSTIC: '/student/diagnostic',
  DIAGNOSTIC_TEST: '/student/diagnostic/test',
  DIAGNOSTIC_RESULTS: '/student/diagnostic/results',
};

export const registerPath = (role) => `/register/${role}`;
