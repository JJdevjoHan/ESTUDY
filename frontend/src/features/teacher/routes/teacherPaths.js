import { ROUTES } from '../../../routes/paths.js';

export const TEACHER_ROUTES = {
  DASHBOARD: ROUTES.DASHBOARD_TEACHER,
  SUBJECTS: '/teacher/subjects',
    ASSESSMENT: '/teacher/assessment',
  STUDENT_PROFILE: '/teacher/subjects/:studentId',
  REQUESTS: '/teacher/requests',
};

export const studentProfilePath = (studentId) => `/teacher/subjects/${studentId}`;