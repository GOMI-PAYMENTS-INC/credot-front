import { Route, Routes } from 'react-router-dom';

import FindIdPage from '@/pages/auth/find-id.page';
import FindNoResultPage from '@/pages/auth/find-no-result.page';
import FindPasswordPage from '@/pages/auth/find-password.page';
import { NotAuthorizedPage } from '@/pages/auth/not-authorized.page';
import ResetPasswordPage from '@/pages/auth/reset-password.page';
import SignInPage from '@/pages/auth/sign-in.page';
import SignUpPage from '@/pages/auth/sign-up.page';
import SignUpSocialPage from '@/pages/auth/sign-up-social.page';
import SignUpWelcomePage from '@/pages/auth/sign-up-welcome.page';
import HomePage from '@/pages/home/home.page';
import SearchResultPage from '@/pages/search/search-result.page';
import { Paths } from '@/router/paths';
import { PrivateRoute } from '@/router/private-route';

export const Router = () => (
  <Routes>
    <Route path={Paths.home} element={<HomePage />} />
    {/* 로그인 페이지 */}
    <Route path={Paths.signIn} element={<SignInPage />} />
    {/* 회원가입 페이지 */}
    <Route path={Paths.signUp} element={<SignUpPage />} />
    {/* 소셜 회원가입 페이지 */}
    <Route path={Paths.signUpSocial} element={<SignUpSocialPage />} />
    {/* 회원가입 완료 페이지 */}
    <Route path={Paths.welcome} element={<SignUpWelcomePage />} />
    {/* 아이디 찾기 페이지 */}
    <Route path={Paths.findId} element={<FindIdPage />} />
    {/* 비밀번호 찾기 페이지 */}
    <Route path={Paths.findPassword} element={<FindPasswordPage />} />
    {/* 아이디/비밀번호 찾기 결과 없음 페이지 */}
    <Route path={Paths.findNoResult} element={<FindNoResultPage />} />
    {/* 임시 비밀번호 재설정 */}
    <Route path={Paths.resetPassword} element={<PrivateRoute />}>
      <Route path={Paths.resetPassword} element={<ResetPasswordPage />} />
    </Route>
    <Route path={Paths.notAuthorized} element={<NotAuthorizedPage />} />
    <Route path={Paths.searchResult} element={<SearchResultPage />} />
  </Routes>
);
