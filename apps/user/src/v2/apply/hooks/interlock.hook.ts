import { useQuery } from '@tanstack/react-query';

import { CrawlingDto, InterlockService } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useGetInterlock = (requestIds: number[], isStopInterval?: boolean) => {
  return useQuery<CrawlingDto, ApiError>({
    queryKey: ['getInterlock', requestIds],
    queryFn: () => InterlockService.getCrawling(requestIds.join(',')),
    enabled: !!requestIds.length,
    refetchInterval: isStopInterval ? false : 2000,
    staleTime: 0,
    onSuccess: (res: CrawlingDto) => {
      return res;
    },
  });
};
