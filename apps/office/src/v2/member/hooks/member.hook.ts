import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { CreateUserDto, UserService } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useRegisterMember = () => {
  return useMutation(
    (requestBody: CreateUserDto) => UserService.createUser(requestBody),
    {
      onSuccess: (res) => {
        toast.success('신규 유저가 등록되었습니다.');
      },
      onError: (error: ApiError) => {
        console.error(JSON.stringify(error));
        toast.success('신규 유저 등록에 실패하였습니다.');
      },
    },
  );
};
