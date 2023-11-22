import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  CrawlingInfoDto,
  CreateUserDto,
  UpdateUserDto,
  UserDto,
  UserService,
} from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useRegisterMember = () => {
  return useMutation(
    (requestBody: CreateUserDto) => UserService.createUser(requestBody),
    {
      onSuccess: (res) => {
        toast.success('신규 회원이 등록되었습니다.');
      },
      onError: (error: ApiError) => {
        console.error(JSON.stringify(error));
        toast.success('신규 회원 등록에 실패하였습니다.');
      },
    },
  );
};

export const useUpdateMember = () => {
  return useMutation(
    (requestBody: UpdateUserDto) => UserService.updateUser(requestBody),
    {
      onSuccess: (res) => {
        toast.success('회원 정보가 수정되었습니다.');
      },
      onError: (error: ApiError) => {
        console.error(JSON.stringify(error));
        toast.success('회원 정보 수정이 실패하였습니다.');
      },
    },
  );
};

export const useUserHook = (userId: number) => {
  return useQuery<UserDto, ApiError>({
    queryKey: ['user', userId],
    queryFn: () => UserService.getUser(userId),
  });
};

export const useUserCrawlingInfoHook = (userId: number) => {
  return useQuery<CrawlingInfoDto[], ApiError>({
    queryKey: ['user-crawling', userId],
    queryFn: () => UserService.getCrawlingInfo(userId),
  });
};
