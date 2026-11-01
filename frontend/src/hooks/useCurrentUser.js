import { useMemo } from 'react';
import * as authService from '../features/auth/services/authService.js';

export default function useCurrentUser() {
  return useMemo(() => {
    const user = authService.getCurrentUser?.() ?? null;

    const fullName = user?.fullName || user?.name || 'Student';
    const firstName = fullName.split(' ')[0];

    const programYear =
      user?.program && user?.year ? `${user.program} - ${user.year}` : user?.program;
    const details = [user?.studentNumber || user?.studentId, programYear]
      .filter(Boolean)
      .join(' ');

    return { user, fullName, firstName, details };
  }, []);
}
