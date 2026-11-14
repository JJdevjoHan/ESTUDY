// Single source of truth for every URL in the app.
// Never type a path string inside a component. Import it from here instead.
export const ROUTES = {
  HOME: '/', // the landing page
  LOGIN: '/login',
  LOGOUT: '/logout',
  PROFILE: '/profile',
  REGISTER: '/register/:role', // used by <Route path=...>
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
