import { ROUTES } from '../../../routes/paths.js';

export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
};

// Everything that differs between the two registration screens lives here,
// so RegisterPage doesn't need any if/else for student vs teacher.
export const ROLE_CONFIG = {
  [ROLES.STUDENT]: {
    title: 'Student',
    description: 'Track my learning',
    emailLabel: 'School email',
    idLabel: 'Student ID',
    idPlaceholder: 'Enter your student ID',
  },
  [ROLES.TEACHER]: {
    title: 'Teacher / Instructor',
    description: 'Guide my class',
    emailLabel: 'Email',
    idLabel: 'Teacher ID',
    idPlaceholder: 'Enter your teacher ID',
  },
};

export const isValidRole = (role) => Object.values(ROLES).includes(role);

// Where each role lands after logging in.
export const DASHBOARD_BY_ROLE = {
  [ROLES.STUDENT]: ROUTES.DASHBOARD_STUDENT,
  [ROLES.TEACHER]: ROUTES.DASHBOARD_TEACHER,
};
