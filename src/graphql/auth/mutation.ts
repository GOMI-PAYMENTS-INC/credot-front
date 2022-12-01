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
};

export default authMutation;
