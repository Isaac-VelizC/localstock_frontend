import { useEffect } from 'react';
import CustomRoutes from './routes/Routes';
import { useAppDispatch } from './hooks/useAppDispatch';
import { fetchUser } from './app/features/auth/authSlice';
import { ScrollToTop } from './components/common/ScrollToTop';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
      dispatch(fetchUser());
    } else {
      dispatch({ type: 'auth/fetchUser/skip' });
    }
  }, [dispatch]);
  
  return (
    <>
      <ScrollToTop />
      <CustomRoutes />
    </>
  );
}

export default App;
