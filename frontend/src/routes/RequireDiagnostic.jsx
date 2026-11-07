import { Navigate, Outlet } from 'react-router-dom';
import * as authService from '../features/auth/services/authService.js';
import { ROUTES } from './paths.js';

export function RequireAuth() {
  const user = authService.getCurrentUser?.() ?? null;

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  return <Outlet />;
}

export function RequireRole({ role }) {
  const user = authService.getCurrentUser?.() ?? null;

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;
  if (user.role !== role) return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
}

export default function RequireDiagnostic() {
  const user = authService.getCurrentUser?.() ?? null;

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;
  if (!user.hasCompletedDiagnostic) return <Navigate to={ROUTES.DIAGNOSTIC} replace />;

  return <Outlet />;
}