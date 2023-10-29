import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  CrawlingDto,
  InterlockService,
  RequestCrawlingDto,
} from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useCheckVanLogin = () => {
  return useMutation(
    (requestBody: RequestCrawlingDto) => InterlockService.checkVanLogin(requestBody),
    {
      onSuccess: (res) => {
        return res;
      },
    },
  );
};

export const useRequestBond = () => {
  return useMutation(
    (requestBody: RequestCrawlingDto) => InterlockService.requestBond(requestBody),
    {
      onSuccess: (res) => {
        return res;
      },
    },
  );
};

export const useGetInterlock = (requestId: number) => {
  return useQuery<CrawlingDto, ApiError>({
    queryKey: ['getInterlock', requestId],
    queryFn: () => InterlockService.getCrawling(requestId),
    enabled: !!requestId,
    refetchInterval: 2000,
    staleTime: 0,
    onSuccess: (res: CrawlingDto) => {
      return res;
    },
  });
};
