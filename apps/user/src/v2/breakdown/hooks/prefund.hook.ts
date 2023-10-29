import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  PrefundService,
  SearchDetailItemDto,
  SearchPrefundDto,
  TodayPreFundDto,
  TodayPreFundSummaryDto,
} from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useTodayPrefundHook = () => {
  return useQuery<TodayPreFundSummaryDto, ApiError>({
    queryKey: ['today-prefund'],
    queryFn: () => PrefundService.todayPreFund(),
    onError: (err: ApiError) => {
      console.error(err.message);
      toast.error('오늘의 선정산금을 가져오기 실패했어요!');
      return;
    },
  });
};

export const useTodayPrefundDetailHook = () => {
  return useQuery<TodayPreFundDto[], ApiError>({
    queryKey: ['today-prefund-details'],
    queryFn: () => PrefundService.todayPreFundDetails(),
    onError: (err: ApiError) => {
      console.error(err.message);
      toast.error('오늘의 선정산금 상세 내역을 가져오기 실패했어요!');
      return;
    },
  });
};

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
  return useQuery<SearchDetailItemDto[], ApiError>({
    queryKey: ['search-period-prefund-detail'],
    queryFn: () => PrefundService.searchDetails(startAt, endAt),
    enabled: !!(startAt && endAt),
    onError: (err: ApiError) => {
      console.error(err.message);
      toast.error('선정산금 기간 내역 데이터를 가져오기 실패했어요!');
      return;
    },
  });
};
