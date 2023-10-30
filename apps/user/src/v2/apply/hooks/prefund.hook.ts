import { useQuery } from '@tanstack/react-query';

import { PrefundService, TodayPreFundSummaryDto } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useMyPrefund = (crawlingId: number | null) => {
  return useQuery<TodayPreFundSummaryDto, ApiError>({
    queryKey: ['myPrefund', crawlingId],
    queryFn: () => PrefundService.myPrefund(crawlingId as number),
    enabled: !!crawlingId,
    onSuccess: (res: TodayPreFundSummaryDto) => {
      return res;
    },
  });
};
