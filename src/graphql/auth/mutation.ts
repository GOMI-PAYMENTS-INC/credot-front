import gql from 'graphql-tag';

const SendSmsVerificationCodeMutation = {
  sendSmsVerificationCodeQuery: gql`
    mutation SendSmsVerificationCode($country: CountryType!, $phone: String!) {
      sendSmsVerificationCode(country: $country, phone: $phone)
    }
  `,
};

export default SendSmsVerificationCodeMutation;
