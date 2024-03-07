import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  ApplyFutureFundDto,
  FutureFundApplyDto,
  FutureFundDto,
  FutureFundService,
  RepaymentFutureFundDto,
  UpdateFutureFundDto,
  UpdateUserDto,
  UserService,
} from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useFutureFundList = ({
  userId,
  startAt,
  endAt,
}: {
  userId: number | null;
  startAt: string;
  endAt: string;
}) => {
  return useQuery<FutureFundDto[], ApiError>({
    queryKey: ['future-fund', startAt, endAt, userId],
    queryFn: () => FutureFundService.list(startAt, endAt, Number(userId)),
    enabled: !!userId,
  });
};

export const useFutureFundApply = () => {
  return useMutation(
    (requestBody: ApplyFutureFundDto) => FutureFundService.apply(requestBody),
    {
      onSuccess: (res) => {
        toast.success('미래 정산이 신청되었습니다.');
        return res;
      },
      onError: (error: ApiError) => {
        console.error(JSON.stringify(error));
        toast.error('미래 정산이 신청이 실패했어요!');
      },
    },
  );
};

export const useFutureFundRepayment = () => {
  return useMutation(
    (requestBody: RepaymentFutureFundDto) => FutureFundService.repayment(requestBody),
    {
      onSuccess: (res) => {
        toast.success('미래 정산 상환이 처리되었습니다.');
        return res;
      },
      onError: (error: ApiError) => {
        console.error(JSON.stringify(error));
        toast.error('미래 정산 상환이 실패했어요!');
      },
    },
  );
};

export const useFutureFundApplyList = (status: string) => {
  return useQuery<FutureFundApplyDto[], ApiError>({
    queryKey: ['future-fund', status],
    queryFn: () => FutureFundService.applyList(status),
  });
};

export const useUpdateFutureFundApplyStatus = () => {
  return useMutation(
    (requestBody: UpdateFutureFundDto) =>
      FutureFundService.updateApplyStatus(requestBody),
    {
      onSuccess: (res) => {
        toast.success('처리되었습니다.');
        return res;
      },
      onError: (error: ApiError) => {
        console.error(JSON.stringify(error));
        toast.error('상태 변경에 실패했어요!');
      },
    },
  );
};

export const useUpdateFutureFundLimit = () => {
  return useMutation(
    (requestBody: UpdateUserDto) => UserService.updateUser(requestBody),
    {
      onSuccess: (res) => {
        toast.success('미래 정산 한도가 수정되었습니다.');
      },
      onError: (error: ApiError) => {
        console.error(JSON.stringify(error));
        toast.success('미래 정산 한도 수정이 실패하였습니다.');
      },
    },
  );
};
