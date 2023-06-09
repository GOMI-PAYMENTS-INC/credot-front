import gql from 'graphql-tag';

const authQuery = {
  userMe: gql`
    query Me {
      me {
        id
        email
        role
        name
        nickName
        phone
        profileImage
        joinedAt
        isSocialLogin
        socialProvider
      }
    }
  `,
  existsUserEmail: gql`
    query ExistsUserEmail($email: String!) {
      existsUserEmail(email: $email)
    }
  `,
  findAccountQuery: gql`
    query FindAccount($user: FindAccountInput!, $country: CountryType!) {
      findAccount(user: $user, country: $country) {
        accounts {
          email
          isSocialLogin
          socialProvider
        }
      }
    }
  `,
  smsVerifyCodeConfirm: gql`
    query SmsVerifyCodeConfirm($phone: String!, $verifyCode: String!) {
      smsVerifyCodeConfirm(phone: $phone, verifyCode: $verifyCode) {
        signature
      }
    }
  `,
};

export default authQuery;
