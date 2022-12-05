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
};

export default authQuery;
