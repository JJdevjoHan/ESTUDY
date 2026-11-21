import { Navigate, Outlet, useLocation } from 'react-router-dom';
import * as authService from '../features/auth/services/authService.js';
import { ROUTES } from './paths.js';

const DIAGNOSTIC_ROUTES = [
  ROUTES.DIAGNOSTIC,
  ROUTES.DIAGNOSTIC_TEST,
  ROUTES.DIAGNOSTIC_RESULTS,
];

export function RequireAuth() {
  const user = authService.getCurrentUser?.() ?? null;
  const location = useLocation();

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;
  if (!user.userId) return <Navigate to={ROUTES.LOGIN} replace />;
  if (
    user.role === 'student' &&
    !user.hasCompletedDiagnostic &&
    !DIAGNOSTIC_ROUTES.includes(location.pathname)
  ) {
    return <Navigate to={ROUTES.DIAGNOSTIC} replace />;
  }

  return <Outlet />;
}

export function RequireRole({ role }) {
  const user = authService.getCurrentUser?.() ?? null;

  if (!user || !user.userId) return <Navigate to={ROUTES.LOGIN} replace />;
  if (user.role !== role) return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
}

export default function RequireDiagnostic() {
  const user = authService.getCurrentUser?.() ?? null;

  if (!user || !user.userId) return <Navigate to={ROUTES.LOGIN} replace />;
  if (!user.hasCompletedDiagnostic) return <Navigate to={ROUTES.DIAGNOSTIC} replace />;

  return <Outlet />;
}