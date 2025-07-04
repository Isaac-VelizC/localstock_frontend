import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import Spinner from '@/components/common/Spinner';

type Props = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: Props) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading.fetch) {
    return <Spinner/>;
  }

  return !isAuthenticated ? children : <Navigate to="/" /> ;
};

export default PublicRoute;
