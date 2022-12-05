import gql from 'graphql-tag';

const authQuery = {
  userMe: gql`
    query Me {
      me {
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
};

export default authQuery;
