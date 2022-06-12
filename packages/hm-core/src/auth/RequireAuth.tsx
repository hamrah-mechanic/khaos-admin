import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const refreshToken = Cookies.get('refresh_token');
  if (refreshToken === undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
export default RequireAuth;
