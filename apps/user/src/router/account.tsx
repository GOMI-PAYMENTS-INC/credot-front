import { FC } from 'react';
import type { Location } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

// import { AuthContainer } from '@/containers/auth/auth.container';
import FindIdPage from '@/pages/auth/find-id.page';
import FindNoResultPage from '@/pages/auth/find-no-result.page';
import FindPasswordPage from '@/pages/auth/find-password.page';
// import { NotAuthorizedPage } from '@/pages/auth/not-authorized.page';
import SignInPage from '@/pages/auth/sign-in.page';
import SignUpPage from '@/pages/auth/sign-up.page';
import SignUpSocialPage from '@/pages/auth/sign-up-social.page';
import SignUpWelcomePage from '@/pages/auth/sign-up-welcome.page';
import { Paths } from '@/router/paths';
// import { PrivateRouteData } from '@/router/route-data';

interface IAccount {
  location: Location;
}
const Account: FC<IAccount> = (props, { location }) => {
  console.log(location, 'location');
  console.log(props, 'props');
  return (
    <Routes>
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
      {/* {isLogin
        ? Object.values(PrivateRouteData).map((route) => (
            <Route key={route.id} path={route.path} element={<route.page />} />
          ))
        : Object.values(PrivateRouteData).map((route) => (
            <Route key={route.id} path={route.path} element={<NotAuthorizedPage />} />
          ))} */}
    </Routes>
  );
};

export default Account;
