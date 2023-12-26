import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const currentLocation = useLocation();

  if (!user.userData?.role ==='admin') {
    return <Navigate to="/Login" state={{ from: currentLocation }} replace />;
  }
  return children;
}

export default ProtectedRoute;
