import React, { ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
interface Props {
  children: ReactElement;
  requireAuthentication?: boolean;
}
function RequireAuth({ children, requireAuthentication }: Props) {
  const location = useLocation();
  const refreshToken = Cookies.get('access_token');
  if (refreshToken === undefined && requireAuthentication) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
