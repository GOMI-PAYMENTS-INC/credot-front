import { useState } from 'react';

import { useSmsVerifyCodeConfirmQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphqlCient';
import { _generalMobileVerified } from '@/utils/amplitude.service';

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
        if (data.smsVerifyCodeConfirm.signature) {
          setVerifyCodeSign(data.smsVerifyCodeConfirm.signature);

          //앰플리튜드 전화번호 인증 완료 이벤트
          _generalMobileVerified(phone);
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
