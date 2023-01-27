import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { LoginInput, MutationLoginArgs, useLoginMutation } from '@/generated/graphql';
import { PATH } from '@/router/routeList';
import { authTokenStorage } from '@/utils/auth-token';
import { graphQLClient } from '@/utils/graphql-client';

const { mutate: loginMutate } = useLoginMutation(graphQLClient, {
  onSuccess: (res) => {
    // 로그인 토큰 설정
    setToken(res.login.token);
    authTokenStorage.setToken(isLoginStorage, res.login.token);
    // isLogin 상태 변경
    handleChangeLoginState(true);
    // 임시비밀번호로 로그인 한 경우
    if (res.login.popupInfo) {
      sessionStorage.setItem('TEMPORARY_PASSWORD_LOGIN', res.login.token);
      setTemporaryPasswordLogin(true);
      navigate(PATH.REAPPLY_PASSWORD);
    } else {
      setTemporaryPasswordLogin(false);
      navigate(PATH.SEARCH_PRODUCTS);
    }
  },
  onError: (err) => {
    const error = JSON.parse(JSON.stringify(err));
    console.error('로그인 실패 : ', error);
    toast.error('아이디 또는 패스워드를 다시 한 번 확인해주세요.');
  },
});

const onSubmitSignIn = (value: LoginInput) => {
  const loginFormValue: MutationLoginArgs = {
    login: {
      email: value.email,
      password: value.password,
    },
  };
  loginMutate(loginFormValue);
};
