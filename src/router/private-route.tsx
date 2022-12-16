import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContainer } from '@/containers/auth/auth.container';
import { Paths } from '@/router/paths';

export const PrivateRoute = () => {
  const { isLogin } = AuthContainer();
  console.log('isLogin', isLogin);
  return isLogin ? <Outlet /> : <Navigate to={Paths.signIn} />;
};
