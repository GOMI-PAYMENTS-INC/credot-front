import { createElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routeList } from '@/router/routeList';

export const Router = () => (
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
