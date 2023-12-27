import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  ApplyFutureFundDto,
  FutureFundDto,
  FutureFundService,
  PrefundService,
  RepaymentFutureFundDto,
  UpdatePrefundDto,
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
