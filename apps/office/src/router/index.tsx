import { createElement } from 'react';
import { matchRoutes, Route, Routes, useLocation } from 'react-router-dom';

import Layout from '@/layouts/layout';
import { routeList } from '@/router/paths';
import { _introPageIntroPageViewed } from '@/amplitude/amplitude.service';
export const Router = () => {
  const { pathname } = useLocation();

  const [{ route }] = matchRoutes(routeList, pathname) || [];

  _introPageIntroPageViewed(route.pageCategory, window.location.href);

  return (
    <Layout route={route}>
      <Routes>
        {routeList.map((route, index) => (
          <Route key={index} path={route.path} element={createElement(route.component)} />
        ))}
      </Routes>
    </Layout>
  );
};
