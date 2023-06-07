import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';

import { RecoilRoot } from 'recoil';

import { CustomToastContainer } from '@/components/customToastContainer';
import { Router } from '@/router';

const App = () => {
  return (
    <RecoilRoot>
      <Router />
      <CustomToastContainer />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </RecoilRoot>
  );
};

export default App;
