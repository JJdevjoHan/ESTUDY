import { ROUTES } from '../../../routes/paths.js';

export const TEACHER_ROUTES = {
  DASHBOARD: ROUTES.DASHBOARD_TEACHER,
  SUBJECTS: '/teacher/subjects',
  STUDENT_PROFILE: '/teacher/subjects/:studentId',
};

export const studentProfilePath = (studentId) => `/teacher/subjects/${studentId}`;