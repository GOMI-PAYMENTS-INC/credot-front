import { createElement, FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routeList } from '@/router/routeList';

interface IRouteProps {
  pathname: string;
}

export const Router: FC<IRouteProps> = ({ pathname }) => {
  console.log(pathname, 'from router');
  return (
    <Routes>
      {routeList.map((route) => (
        <Route
          key={route.description}
          path={route.path}
          element={createElement(route.component)}
        />
      ))}
    </Routes>
  );
};
