import {
  SendSmsVerificationCodeMutationVariables,
  useSendSmsVerificationCodeMutation,
} from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';
import { toast } from 'react-toastify';

export const AuthContainer = () => {
  const { mutate: sendSmsVerificationCodeMutate } = useSendSmsVerificationCodeMutation(
    graphQLClient,
    {
      onSuccess: (res) => {
        toast.success('발송 성공하였습니다.');
      },
      onError: (err) => {
        toast.error('발송 실패하였습니다.');
      },
    },
  );

  const onSendSmsVerifyCode = (
    sendSmsVerifyCode: SendSmsVerificationCodeMutationVariables,
  ) => {
    sendSmsVerificationCodeMutate(sendSmsVerifyCode);
  };

  return { onSendSmsVerifyCode };
};
