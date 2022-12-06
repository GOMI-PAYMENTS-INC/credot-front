import { useEffect, useState } from 'react';

import {
  CountryType,
  FindAccountQueryVariables,
  useFindAccountQuery,
} from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';

export const FindUserContainer = () => {
  const [findAccount, setFindAccount] = useState<FindAccountQueryVariables>();

  useEffect(() => {
    findAccountQuery;
  }, [findAccount]);

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
      onSuccess: (res) => {
        // console.log('useFindAccountQuery success', res);
      },
      onError: (err) => {
        // console.log('useFindAccountQuery error', err);
      },
    },
  );

  return {
    setFindAccount,
    findAccountQuery,
    findAccountQueryError,
  };
};
