import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { UseFormSetError } from 'react-hook-form';

import {
  _amplitudeFindIdFailed,
  _amplitudeFindIdSucceeded,
  _amplitudeFindPwFailed,
} from '@/amplitude/amplitude.service';
import { isAccountExisted } from '@/auth/container';
import { AccountDto, AuthService } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';
import { isTruthy } from '@/utils/isTruthy';

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
