import { useMutation, useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { UseFormSetError } from 'react-hook-form';

import { _amplitudeMobileVerified } from '@/amplitude/amplitude.service';
import {
  activateVerifyCode,
  clickVerifyBtn,
  exceptedVerifyTry,
  getVerifyCodeSignatureNumber,
} from '@/auth/container';
import { AuthService, RequestPhoneAuthDto } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';
import { PhoneAuthDto } from '@/generated-rest/api/front/models/PhoneAuthDto';

export const useRequestPhoneAuthHook = (
  isVerification: TVerifyButtonState,
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>,
  setError: UseFormSetError<TAuthEssentialProps>,
) => {
  return useMutation(
    (requestBody: RequestPhoneAuthDto) => AuthService.requestPhoneAuthCode(requestBody),
    {
      onSuccess: () => {
        activateVerifyCode(isVerification, setIsVerification);
      },
      onError: (err: ApiError) => {
        const errorCode = err.body.message;
        if (errorCode === 'EXCEED_PHONE_VERIFICATION') {
          setError('phone', {
            message: '인증번호 발송 횟수를 초과했어요. 5분간 인증이 불가능해요.',
          });
          exceptedVerifyTry(isVerification, setIsVerification);
          return;
        }

        clickVerifyBtn(isVerification, setIsVerification, { firstCalled: false });
      },
    },
  );
};

export const useVerifyPhoneAuthHook = (
  isVerification: TVerifyButtonState,
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>,
  setError: UseFormSetError<TAuthEssentialProps>,
  phoneNumber: string = '',
) => {
  const { verifyCode } = isVerification;
  return useQuery<PhoneAuthDto, ApiError>({
    queryKey: ['verifyPhoneAuth', phoneNumber, verifyCode],
    queryFn: () => AuthService.verifyPhoneAuthCode(phoneNumber, verifyCode),
    enabled: phoneNumber?.length === 11 && verifyCode?.length === 6,
    refetchOnWindowFocus: false,
    onSuccess: (res: PhoneAuthDto) => {
      setError('verifyCode', { message: undefined });
      const signature = res.verifyCodeSignatureNumber;
      if (signature) {
        getVerifyCodeSignatureNumber(signature, isVerification, setIsVerification);

        //앰플리튜드 전화번호 인증 완료 이벤트
        _amplitudeMobileVerified(phoneNumber);
      }
    },
    onError: (err: ApiError) => {
      setError('verifyCode', { message: '인증번호가 올바르지 않아요.' });
      return;
    },
  });
};
