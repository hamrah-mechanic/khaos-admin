import React, { ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function RequireAuth({ children }: { children: ReactElement }) {
  const location = useLocation();
  const refreshToken = Cookies.get('access_token');
  if (refreshToken === undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
