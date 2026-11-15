import { Award, Bell, BookOpen, LayoutDashboard, LogOut, Settings, TrendingUp, User } from 'lucide-react';
import { ROUTES } from '../../../routes/paths.js';

export const STUDENT_NAV = {
  main: [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: ROUTES.DASHBOARD_STUDENT },
    { key: 'performance', label: 'My Performance', icon: TrendingUp },
    { key: 'scores', label: 'Scores', icon: Award },
    { key: 'testHub', label: 'Test Hub', icon: BookOpen, to: ROUTES.DIAGNOSTIC },
    { key: 'warnings', label: 'Warnings', icon: Bell },
  ],
  bottom: [
    { key: 'profile', label: 'Profile', icon: User, to: ROUTES.PROFILE },
    { key: 'settings', label: 'Settings', icon: Settings },
    { key: 'logout', label: 'Log out', icon: LogOut, to: ROUTES.LOGOUT, alwaysOn: true },
  ],
};