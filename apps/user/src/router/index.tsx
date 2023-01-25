import { createElement, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { PATH, routeList } from '@/router/routeList';

export const Router = () => {
  const navigator = useNavigate();
  // 로그인 체크로직 여기서
  const isLogin = false;

  useEffect(() => {
    console.log('login Check logic');
    if (isLogin === false) {
      navigator(PATH.SIGN_IN);
    }
  }, []);

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
