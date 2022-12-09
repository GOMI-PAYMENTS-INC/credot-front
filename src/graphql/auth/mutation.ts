import gql from 'graphql-tag';

const authMutation = {
  sendSmsVerificationCodeQuery: gql`
    mutation SendSmsVerificationCode($country: CountryType!, $phone: String!) {
      sendSmsVerificationCode(country: $country, phone: $phone)
    }
  `,
  signUpQuery: gql`
    mutation Signup($user: SignUpInput!) {
      signup(user: $user) {
        token
      }
    }
  `,
  login: gql`
    mutation Login($login: LoginInput!) {
      login(login: $login) {
        token
      }
    }
  `,
  googleLogin: gql`
    mutation GoogleLogin($idToken: String!) {
      googleLogin(idToken: $idToken) {
        token
      }
    }
  `,
  googleSignup: gql`
    mutation GoogleSignup($socialSignUpDto: GoogleSignUpInput!) {
      googleSignUp(socialSignUpDto: $socialSignUpDto) {
        token
      }
    }
  `,
};

export default authMutation;
