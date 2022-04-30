import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  console.log('context', useContext(AuthContext));
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
export default RequireAuth;
