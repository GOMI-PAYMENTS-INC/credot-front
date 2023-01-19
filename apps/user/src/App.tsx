import 'react-toastify/dist/ReactToastify.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import Layout from '@/components/layouts/layout';
import { Router } from '@/router';

const App = () => (
  // 로그인 판단여부는 useRef를 이용해서 current에 상태를 저장해보자고!
  // 그렇게 되면 Layout에는 props로 전달하지 않아도 current안의 상태를 확인할 수 있잖아!
  <RecoilRoot>
    <Layout>
      <Router />
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

export default App;
