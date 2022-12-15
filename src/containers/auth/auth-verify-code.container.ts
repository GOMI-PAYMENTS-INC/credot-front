import { useState } from 'react';

import { useSmsVerifyCodeConfirmQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';

export const AuthVerifyCodeContainer = () => {
  const [verifyCode, setVerifyCode] = useState<string>('');
  const [verifyCodeSign, setVerifyCodeSign] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const onConfirmVerifyCode = useSmsVerifyCodeConfirmQuery(
    graphQLClient,
    { phone, verifyCode },
    {
      enabled: !!verifyCode && verifyCode.length > 5,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.info(verifyCode, ' onChangeVerifyCodeCheck data : ', data);
        if (data.smsVerifyCodeConfirm.signature) {
          setVerifyCodeSign(data.smsVerifyCodeConfirm.signature);
        }
      },
      onError: (err) => {
        const error = JSON.parse(JSON.stringify(err));
        console.error('onChangeVerifyCodeCheck error : ', error);
      },
    },
  );

  return {
    verifyCodeSign,
    setVerifyCodeSign,
    setVerifyCode,
    setPhone,
    onConfirmVerifyCode,
  };
};
