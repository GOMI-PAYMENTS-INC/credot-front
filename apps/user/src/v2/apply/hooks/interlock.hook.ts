import { useQuery } from '@tanstack/react-query';

import { CrawlingDto, InterlockService } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useGetInterlock = (requestIds: number[]) => {
  return useQuery<CrawlingDto, ApiError>({
    queryKey: ['getInterlock', requestIds],
    queryFn: () => InterlockService.getCrawling(requestIds.join(',')),
    enabled: !!requestIds.length,
    refetchInterval: 2000,
    staleTime: 0,
    onSuccess: (res: CrawlingDto) => {
      return res;
    },
  });
};
