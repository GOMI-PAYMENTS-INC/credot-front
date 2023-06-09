import { GraphQLClient } from 'graphql-request';

import { GlobalEnv } from '@/api/config';
import { useRecoilValue } from 'recoil';
import { LoginTokenAtom } from '@/atom/auth/auth-atom';

export const graphQLClient = () => {
  const token = useRecoilValue(LoginTokenAtom);

  const config = new GraphQLClient(`${GlobalEnv.graphqlUrl}`, {
    headers: { authorization: token ? `Bearer ${token}` : '' },
  });

  return { config };
};
