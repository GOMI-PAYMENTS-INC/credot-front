import { useState } from 'react';

import {
  CountryType,
  FindAccountQueryVariables,
  useFindAccountQuery,
} from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';

export const FindUserContainer = () => {
  //아이디 찾기 변수 값
  const [findAccount, setFindAccount] = useState<FindAccountQueryVariables>();

  const { data: findAccountQuery, error: findAccountQueryError } = useFindAccountQuery(
    graphQLClient,
    {
      user: !findAccount?.user
        ? {
            phone: '',
            verifyCode: '',
          }
        : findAccount.user,
      country: findAccount?.country ? findAccount.country : CountryType.Vn,
    },
    {
      enabled: !!findAccount,
      onSuccess: (res) => {
        console.log('useFindAccountQuery success', res);
      },
      onError: (err) => {
        console.log('useFindAccountQuery err', err);
      },
    },
  );

  return {
    setFindAccount,
    findAccountQuery,
    findAccountQueryError,
  };
};
