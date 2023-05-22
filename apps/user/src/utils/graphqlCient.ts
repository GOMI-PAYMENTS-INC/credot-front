import { GraphQLClient } from 'graphql-request';

import { GlobalEnv } from '@/api/config';
import { authTokenStorage } from '@/utils/authToken';

const setHeader = () => {
  const token = authTokenStorage.getToken();
  const authorization = token ? `Bearer ${token}` : '';

  return { headers: { authorization: authorization } };
};

export const graphQLClient = new GraphQLClient(`${GlobalEnv.graphqlUrl}`, setHeader());
