import gql from 'graphql-tag';

const authMutation = {
  // 휴대폰 인증번호 발송
  sendSmsVerificationCodeQuery: gql`
    mutation SendSmsVerificationCode(
      $country: CountryType!
      $phone: String!
      $type: SmsVerifyType!
    ) {
      sendSmsVerificationCode(country: $country, phone: $phone, type: $type)
    }
  `,

  // 회원가입
  signUpQuery: gql`
    mutation Signup($user: SignUpInput!) {
      signup(user: $user) {
        isPhoneNumber
        token
        userId
      }
    }
  `,

  // 로그인
  login: gql`
    mutation Login($login: LoginInput!) {
      login(login: $login) {
        token
        popupInfo {
          typeName
          isModal
        }
      }
    }
  `,

  // 구글 로그인
  googleLogin: gql`
    mutation GoogleLogin($idToken: String!) {
      googleLogin(idToken: $idToken) {
        isPhoneNumber
        token
        userId
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

  // 구글 회원가입
  googleSignup: gql`
    mutation GoogleSignup($socialSignUpDto: GoogleSignUpInput!) {
      googleSignUp(socialSignUpDto: $socialSignUpDto) {
        isPhoneNumber
        token
        userId
      }
    }
  `,
};

export default authMutation;
