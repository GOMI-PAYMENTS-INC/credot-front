import { createElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from '@/router/privateRouter';
import { routeList } from '@/router/routeList';
export const Router = () => {
  return (
    <Routes>
      {routeList.map((route) => {
        if (route.isPrivate) {
          return (
            <Route element={<PrivateRoute />}>
              {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
              <Route path={route.path} element={createElement(route.component)} />
            </Route>
          );
        } else {
          return (
            <Route
              key={route.description}
              path={route.path}
              element={createElement(route.component)}
            />
          );
        }
      })}
    </Routes>
  );
};
