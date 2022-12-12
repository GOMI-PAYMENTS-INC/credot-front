import gql from 'graphql-tag';

const authMutation = {
  // 휴대폰 인증번호 발송
  sendSmsVerificationCodeQuery: gql`
    mutation SendSmsVerificationCode($country: CountryType!, $phone: String!) {
      sendSmsVerificationCode(country: $country, phone: $phone)
    }
  `,

  // 회원가입
  signUpQuery: gql`
    mutation Signup($user: SignUpInput!) {
      signup(user: $user) {
        token
      }
    }
  `,

  // 로그인
  login: gql`
    mutation Login($login: LoginInput!) {
      login(login: $login) {
        token
      }
    }
  `,

  // 구글 로그인
  googleLogin: gql`
    mutation GoogleLogin($idToken: String!) {
      googleLogin(idToken: $idToken) {
        token
      }
    }
  `,
  // 비밀번호 변경
  changePassword: gql`
    mutation ChangePassword($pwd: ChangePasswordInput!) {
      changePassword(pwd: $pwd) {
        accounts {
          email
          isSocialLogin
          socialProvider
        }
      }
    }
  `,

  // 유저 임시 비밀번호 발급
  sendTemporaryPassword: gql`
    mutation SendTemporaryPassword($user: FindPasswordInput!, $country: CountryType!) {
      sendTemporaryPassword(user: $user, country: $country) {
        accounts {
          email
          isSocialLogin
          socialProvider
        }
      }
    }
  `,
  
  //구글 회원가입
  googleSignup: gql`
    mutation GoogleSignup($socialSignUpDto: GoogleSignUpInput!) {
      googleSignUp(socialSignUpDto: $socialSignUpDto) {
        token
      }
    }
  `,
  
};

export default authMutation;
