import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ROUTES from './types';
import Spinner from '@/components/common/Spinner';

const AppLayout = lazy(() => import('@/layouts/AppLayout'));

const NotFound = lazy(() => import('@/pages/errors/NotFount'));
const SignUp = lazy(() => import('@/pages/auth/SignUpPage'));
const SignIn = lazy(() => import('@/pages/auth/SignInPage'));

const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));

const CustomRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route index path={ROUTES.HOME} element={<Dashboard />} />
          </Route>
        </Route>

        <Route
          path={ROUTES.SIGNUP}
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.SIGNIN}
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default CustomRoutes;
