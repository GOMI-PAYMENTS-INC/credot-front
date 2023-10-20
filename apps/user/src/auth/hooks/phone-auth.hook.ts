import { useMutation, useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { UseFormSetError } from 'react-hook-form';

import { _amplitudeMobileVerified } from '@/amplitude/amplitude.service';
import {
  activateVerifyCode,
  clickVerifyBtn,
  duplicationVerifyTry,
  exceptedVerifyTry,
  getVerifyCodeSignatureNumber,
} from '@/auth/container';
import { AuthService, RequestPhoneAuthDto } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';
import { PhoneAuthDto } from '@/generated-rest/api/front/models/PhoneAuthDto';
import { STATUS_CODE } from '@/types/enum.code';

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
        const errorCode = err.message;
        setError('phone', { message: errorCode });

        if (errorCode === STATUS_CODE.NOT_RETRY_VERIFY_CODE) {
          exceptedVerifyTry(isVerification, setIsVerification);

          return;
        }

        if (errorCode === STATUS_CODE.DUPLICATE_VERIFY_CODE) {
          duplicationVerifyTry(isVerification, setIsVerification);

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
      const errorCode = err.message;

      setError('verifyCode', { message: errorCode });
      return;
    },
  });
};
