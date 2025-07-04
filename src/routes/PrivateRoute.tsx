import Spinner from '@/components/common/Spinner';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated, initialized } = useAppSelector((state) => state.auth);
  if (!initialized) {
    return <Spinner/>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
