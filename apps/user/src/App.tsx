import 'react-toastify/dist/ReactToastify.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import Layout from '@/components/layouts/layout';
import { Router } from '@/router';
import { isFalsy } from '@/utils/isFalsy';

import { Plural } from './components/layouts';
import { PATH, routeList } from './router/routeList';
import { authTokenStorage } from './utils/auth-token';

const App = () => {
  const { pathname } = useLocation();
  const navigator = useNavigate();
  let layoutComponent = Plural;

  useEffect((): void => {
    const isLogin = authTokenStorage.getToken();
    if (
      isFalsy(isLogin) &&
      [PATH.SEARCH_PRODUCTS, PATH.SEARCH_RESULTS].includes(pathname)
    ) {
      navigator(PATH.SIGN_IN);
    } else {
      layoutComponent = routeList.find((route) => route.path === pathname)!.layout;
    }
  }, [pathname]);
  console.log(layoutComponent, 'layoutcomponent');
  return (
    // 로그인 판단여부는 useRef를 이용해서 current에 상태를 저장해보자고!
    // 그렇게 되면 Layout에는 props로 전달하지 않아도 current안의 상태를 확인할 수 있잖아!
    <RecoilRoot>
      <Layout pathname={pathname} layoutComponent={layoutComponent}>
        <Router pathname={pathname} />
      </Layout>

      <ToastContainer
        position='top-center'
        autoClose={1000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        limit={1}
        toastClassName='mt-3 z-90'
        closeButton={false}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </RecoilRoot>
  );
};

export default App;
