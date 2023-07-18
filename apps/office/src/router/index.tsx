import { createElement, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Layout from '@/layouts/Layout';
import { routeList } from '@/router/paths';

export const Router = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Layout>
      <Routes>
        {routeList.map((route, index) => (
          <Route key={index} path={route.path} element={createElement(route.component)} />
        ))}
      </Routes>
    </Layout>
  );
};
