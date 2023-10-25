import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  CrawlingDto,
  ExistDto,
  InterlockService,
  RequestCrawlingDto,
} from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useCheckVanLogin = () => {
  const navigation = useNavigate();
  return useMutation(
    (requestBody: RequestCrawlingDto) => InterlockService.checkVanLogin(requestBody),
    {
      onSuccess: (res) => {
        return res;
      },
      onError: () => {
        navigation('/interlock/error');
      },
    },
  );
};

export const useRequestBond = () => {
  const navigation = useNavigate();
  return useMutation(
    (requestBody: RequestCrawlingDto) => InterlockService.requestBond(requestBody),
    {
      onSuccess: (res) => {
        navigation(`/interlock/progress?requestId=${res.crawlingId}`);
      },
      onError: () => {
        navigation('/interlock/error');
      },
    },
  );
};

export const useGetInterlock = (requestId: number) => {
  const navigation = useNavigate();
  return useQuery<CrawlingDto, ApiError>({
    queryKey: ['getInterlock', requestId],
    queryFn: () => InterlockService.getCrawling(requestId),
    enabled: !!requestId,
    refetchInterval: 2000,
    staleTime: 0,
    onSuccess: (res: CrawlingDto) => {
      return res;
    },
    onError: () => {
      navigation('/interlock/error');
    },
  });
};
