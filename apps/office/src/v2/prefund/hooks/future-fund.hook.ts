import { useQuery } from '@tanstack/react-query';

import { FutureFundService, TodayFutureFundDto } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useFutureFund = (userId: number | null) => {
  return useQuery<TodayFutureFundDto, ApiError>({
    queryKey: ['future-fund', userId],
    queryFn: () => FutureFundService.today(Number(userId)),
    enabled: !!userId,
  });
};
