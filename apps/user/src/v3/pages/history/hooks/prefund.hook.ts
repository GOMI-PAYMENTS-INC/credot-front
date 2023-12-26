import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  PrefundService,
  SearchDetailItemDto2,
  SearchPrefundDto,
} from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useSearchPeriodPrefundHook = ({
  startAt,
  endAt,
}: {
  startAt: string;
  endAt: string;
}) => {
  return useQuery<SearchPrefundDto, ApiError>({
    queryKey: ['search-period-prefund'],
    queryFn: () => PrefundService.searchPrefund(startAt, endAt),
    enabled: !!(startAt && endAt),
    onError: (err: ApiError) => {
      console.error(err.message);
      toast.error('선정산금 기간 데이터를 가져오기 실패했어요!');
      return;
    },
  });
};

export const useSearchPeriodPrefundDetailHook = ({
  startAt,
  endAt,
}: {
  startAt: string;
  endAt: string;
}) => {
  return useQuery<SearchDetailItemDto2[], ApiError>({
    queryKey: ['search-period-prefund-detail-v2', startAt, endAt],
    queryFn: () => PrefundService.searchDetailsV2(startAt, endAt),
    enabled: !!(startAt && endAt),
    onError: (err: ApiError) => {
      console.error(err.message);
      toast.error('선정산금 기간 내역 데이터를 가져오기 실패했어요!');
      return;
    },
  });
};
