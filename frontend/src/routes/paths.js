// Single source of truth for every URL in the app.
// Never type a path string inside a component. Import it from here instead.
export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register/:role', // used by <Route path=...>
  FORGOT_PASSWORD: '/forgot-password', // page not built yet
  DASHBOARD_STUDENT: '/student/dashboard',
  DASHBOARD_TEACHER: '/teacher/dashboard',
};

// Builds a real URL such as "/register/teacher".
export const registerPath = (role) => `/register/${role}`;
