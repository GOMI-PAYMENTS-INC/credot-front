import { useState } from 'react';

import {
  CountryType,
  FindAccountQueryVariables,
  useFindAccountQuery,
} from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';

export const FindUserContainer = () => {
  // 아이디 찾기 변수 값
  const [findAccount, setFindAccount] = useState<FindAccountQueryVariables>();
  const [responseStatus, setResponseStatus] = useState<number>(0);

  const { data: findAccountQuery } = useFindAccountQuery(
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
        const error = JSON.parse(JSON.stringify(err));
        setResponseStatus(error.response.errors[0].extensions.exception.status);
      },
    },
  );

  return {
    setFindAccount,
    findAccountQuery,
    responseStatus,
  };
};
