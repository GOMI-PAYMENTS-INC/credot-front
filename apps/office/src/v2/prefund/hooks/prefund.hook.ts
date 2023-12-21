import { useQuery } from '@tanstack/react-query';

import { PrefundService, SummaryPrefundDto } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const usePrefundSummary = (date: string, userId: number | null) => {
  return useQuery<SummaryPrefundDto, ApiError>({
    queryKey: ['prefund', date, userId],
    queryFn: () => PrefundService.summary(date, Number(userId)),
    enabled: !!userId && !!date,
  });
};
