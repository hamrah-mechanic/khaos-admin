import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  console.log('user is', user);
  if (user === undefined || user === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
export default RequireAuth;
