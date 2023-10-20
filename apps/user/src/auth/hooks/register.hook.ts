import { useMutation, useQuery } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AuthService, RegisterDto } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';
import { ExistDto } from '@/generated-rest/api/front/models/ExistDto';

export const useExistEmailHook = (
  email: string,
  triggerConfirmEmail: boolean,
  setError: UseFormSetError<TAuthEssentialProps>,
) => {
  const regex: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return useQuery<ExistDto, ApiError>({
    queryKey: ['exist', email],
    queryFn: () => AuthService.existEmail(email),
    enabled: regex.test(email) === true && triggerConfirmEmail,
    refetchOnWindowFocus: false,
    onSuccess: (res: ExistDto) => {
      if (res.existsUserEmail) {
        setError('email', {
          type: 'custom',
          message: '이미 가입된 이메일 주소입니다.',
        });
      }
    },
    onError: () => {
      setError('email', { type: 'custom', message: undefined });
    },
  });
};

export const useRegisterHook = () => {
  return useMutation((requestBody: RegisterDto) => AuthService.register(requestBody), {
    onError: () => {
      toast.error('회원가입 실패하였습니다. 입력값을 재확인 하십시오.');
    },
  });
};
