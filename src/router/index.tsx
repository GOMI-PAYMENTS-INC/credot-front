import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '../pages/home/home.page';
import SignInPage from '../pages/sign-in/sign-in.page';
import { Paths } from './paths';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={Paths.home} element={<HomePage />} />
      <Route path={Paths.signIn} element={<SignInPage />} />
    </Routes>
  </BrowserRouter>
);
