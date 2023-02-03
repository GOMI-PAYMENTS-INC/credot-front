import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import { Router } from '@/router';

const App = () => (
  <RecoilRoot>
    <Router />

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
