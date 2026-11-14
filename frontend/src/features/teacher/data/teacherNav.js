import {
  ClipboardList,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Settings,
  User,
  Users,
} from 'lucide-react';

import { ROUTES } from '../../../routes/paths.js';
import { TEACHER_ROUTES } from '../routes/teacherPaths.js';

export const TEACHER_NAV = {
  main: [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: ROUTES.DASHBOARD_TEACHER },
    { key: 'subjects', label: 'Subjects (Students)', icon: Users, to: TEACHER_ROUTES.SUBJECTS },
    { key: 'assessment', label: 'Assessment Maker', icon: ClipboardList },
    { key: 'requests', label: 'Request Queue', icon: ListChecks, to: TEACHER_ROUTES.REQUESTS },
    { key: 'system', label: 'System Settings', icon: Settings },
  ],
  bottom: [
    { key: 'profile', label: 'Profile', icon: User, to: ROUTES.PROFILE },
    { key: 'settings', label: 'Settings', icon: Settings },
    { key: 'logout', label: 'Log out', icon: LogOut, to: ROUTES.LOGOUT },
  ],
};