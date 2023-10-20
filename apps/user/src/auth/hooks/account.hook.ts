import { useMutation, useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { UseFormSetError } from 'react-hook-form';

import {
  _amplitudeFindIdFailed,
  _amplitudeFindIdSucceeded,
  _amplitudeFindPwFailed,
  _amplitudeFindPwSucceeded,
} from '@/amplitude/amplitude.service';
import { isAccountExisted } from '@/auth/container';
import {
  AccountDto,
  AuthService,
  LoginDto,
  SendTemporaryPasswordDto,
} from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';
import { CACHING_KEY } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { isTruthy } from '@/utils/isTruthy';
import { useCookieStorage } from '@/utils/useCookieStorage';

export const useFindAccountHook = (
  isVerification: TVerifyButtonState,
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>,
  setError: UseFormSetError<TAuthEssentialProps>,
  data: { phone: string; verifyCodeSign: string },
) => {
  return useQuery<AccountDto[], ApiError>({
    queryKey: ['find-account'],
    queryFn: () => AuthService.findAccount(data.phone, data.verifyCodeSign),
    enabled: isTruthy(data.verifyCodeSign),
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      isAccountExisted(res.length, isVerification, setIsVerification);

      if (res.length > 0) {
        _amplitudeFindIdSucceeded();
      } else {
        _amplitudeFindIdFailed();
      }
    },
    onError: (err) => {
      isAccountExisted(undefined, isVerification, setIsVerification);
      _amplitudeFindPwFailed();
    },
  });
};

export const useSendTemporaryPasswordHook = (
  isVerification: TVerifyButtonState,
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>,
) => {
  return useMutation(
    (requestBody: SendTemporaryPasswordDto) =>
      AuthService.sendTemporaryPassword(requestBody),
    {
      onSuccess: (res) => {
        if (res) {
          isAccountExisted(1, isVerification, setIsVerification);

          _amplitudeFindPwSucceeded();
        }
      },
      onError: (err) => {
        isAccountExisted(undefined, isVerification, setIsVerification);
        _amplitudeFindPwFailed();
      },
    },
  );
};
