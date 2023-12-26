import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { FutureFundService, TodayFutureFundDto } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

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
