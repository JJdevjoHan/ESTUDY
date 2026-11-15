import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../routes/paths.js';
import * as authService from '../services/authService.js';
//ma end ang session
//dili na maka balik sa prev page kay gi clear ang history
//when pressed ang logout button ky mo balik sya sa login page
//redirected ang user sa login page after logout
export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();
    navigate(ROUTES.LOGIN, { replace: true });
  }, [navigate]);

  return null;
}