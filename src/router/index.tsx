import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FindIdPage from '@/pages/auth/find-id.page';
import FindNoResultPage from '@/pages/auth/find-no-result.page';
import FindPasswordPage from '@/pages/auth/find-password.page';
import ResetPasswordPage from '@/pages/auth/reset-password.page';
import SignInPage from '@/pages/auth/sign-in.page';
import SignUpPage from '@/pages/auth/sign-up.page';
import SignUpSocialPage from '@/pages/auth/sign-up-social.page';
import SignUpWelcomePage from '@/pages/auth/sign-up-welcome.page';
import HomePage from '@/pages/home/home.page';
import SearchResultPage from '@/pages/search/search-result.page';
import { Paths } from '@/router/paths';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={Paths.home} element={<HomePage />} />
      <Route path={Paths.signIn} element={<SignInPage />} />
      <Route path={Paths.signUp} element={<SignUpPage />} />
      <Route path={Paths.signUpSocial} element={<SignUpSocialPage />} />
      <Route path={Paths.welcome} element={<SignUpWelcomePage />} />
      <Route path={Paths.findId} element={<FindIdPage />} />
      <Route path={Paths.findPassword} element={<FindPasswordPage />} />
      <Route path={Paths.findNoResult} element={<FindNoResultPage />} />
      <Route path={Paths.resetPassword} element={<ResetPasswordPage />} />
      <Route path={Paths.searchResult} element={<SearchResultPage />} />
    </Routes>
  </BrowserRouter>
);
