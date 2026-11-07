import { Navigate, Outlet } from 'react-router-dom';
import * as authService from '../features/auth/services/authService.js';
import { ROUTES } from './paths.js';

/** Any logged-in user. Use for pages that must stay reachable before the diagnostic is done. */
export function RequireAuth() {
  const user = authService.getCurrentUser?.() ?? null;

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  return <Outlet />;
}

/** Logged-in users with one specific role (for example, teachers only). Others are redirected. */
export function RequireRole({ role }) {
  const user = authService.getCurrentUser?.() ?? null;

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;
  if (user.role !== role) return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
}

/** Logged-in students who finished the diagnostic. Everyone else is redirected. */
export default function RequireDiagnostic() {
  const user = authService.getCurrentUser?.() ?? null;

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;
  if (!user.hasCompletedDiagnostic) return <Navigate to={ROUTES.DIAGNOSTIC} replace />;

  return <Outlet />;
}