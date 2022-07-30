import React, { ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
interface Props {
  children: ReactElement;
  authenticate?: boolean;
}
function RequireAuth({ children, authenticate }: Props) {
  const location = useLocation();
  const refreshToken = Cookies.get('refresh_token');
  if (authenticate) {
    if (refreshToken === undefined) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }

  return children;
}

export default RequireAuth;
