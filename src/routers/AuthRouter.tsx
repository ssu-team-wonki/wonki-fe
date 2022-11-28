import { Navigate } from 'react-router-dom';
import { useAuth } from '../Providers/AuthProvider';

export const ProtectedAuthRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' />;
  }
  return children;
};
