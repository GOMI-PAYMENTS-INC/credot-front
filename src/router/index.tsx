import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FindId from '@/pages/auth/find-id';
import FindPw from '@/pages/auth/find-pw';
import JoinWelcomePage from '@/pages/auth/join-welcome.page';
import ResetPw from '@/pages/auth/reset-pw';
import SignInPage from '@/pages/auth/sign-in.page';
import SignUpPage from '@/pages/auth/sign-up.page';
import HomePage from '@/pages/home/home.page';
import SearchResultPage from '@/pages/search-result/search-result.page';
import { Paths } from '@/router/paths';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={Paths.home} element={<HomePage />} />
      <Route path={Paths.signIn} element={<SignInPage />} />
      <Route path={Paths.signUp} element={<SignUpPage />} />
      <Route path={Paths.welcome} element={<JoinWelcomePage />} />
      <Route path={Paths.findId} element={<FindId />} />
      <Route path={Paths.findPw} element={<FindPw />} />
      <Route path={Paths.resetPw} element={<ResetPw />} />
      <Route path={Paths.searchResult} element={<SearchResultPage />} />
    </Routes>
  </BrowserRouter>
);
