import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  ApplyFutureFundDto,
  ApplyService,
  FutureFundService,
  TodayFutureFundDto,
} from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';
import { TodayFutureFundApplyDto } from '@/generated-rest/api/front/models/TodayFutureFundApplyDto';

export const useTodayFutureFundHook = () => {
  return useQuery<TodayFutureFundDto, ApiError>({
    queryKey: ['today-future-fund'],
    queryFn: () => FutureFundService.todayFutureFund(),
    onError: (err: ApiError) => {
      console.error(err.message);
      toast.error('오늘의 미래 정산금을 가져오기 실패했어요!');
      return;
    },
  });
};

export const useTodayFutureFundApplyHook = () => {
  return useQuery<TodayFutureFundApplyDto, ApiError>({
    queryKey: ['today-future-fund-apply'],
    queryFn: () => FutureFundService.todayFutureFundApply(),
    onError: (err: ApiError) => {
      console.error(err.message);
      toast.error('오늘의 미래 정산금 신청 내역을 가져오기 실패했어요!');
      return;
    },
  });
};

export const useApplyFutureFund = () => {
  return useMutation(
    (requestBody: ApplyFutureFundDto) => FutureFundService.applyFutureFund(requestBody),
    {
      onSuccess: () => {
        return true;
      },
      onError: (err: ApiError) => {
        toast.error(err.message);
        return;
      },
    },
  );
};
