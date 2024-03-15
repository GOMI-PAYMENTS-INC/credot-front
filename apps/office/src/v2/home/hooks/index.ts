import { useQuery } from '@tanstack/react-query';

import {
  FutureFundMatrixSummaryDto,
  HomeInoutDto,
  HomeInoutInDto,
  HomeService,
  HomeTodayDto,
  PrefundMatrixSummaryDto,
} from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useHomeToday = () => {
  return useQuery<HomeTodayDto, ApiError>({
    queryKey: ['home-today'],
    queryFn: () => HomeService.today(),
  });
};

export const useInOutOut = () => {
  return useQuery<HomeInoutDto, ApiError>({
    queryKey: ['home-inout'],
    queryFn: () => HomeService.inOutOut(),
  });
};

export const useInOutIn = () => {
  return useQuery<HomeInoutInDto[], ApiError>({
    queryKey: ['home-inout-in'],
    queryFn: () => HomeService.inOutIn(),
  });
};

export const usePrefundSummary = () => {
  return useQuery<PrefundMatrixSummaryDto, ApiError>({
    queryKey: ['home-prefund-matrix'],
    queryFn: () => HomeService.prefundSummary(),
  });
};

export const useFutureFundSummary = () => {
  return useQuery<FutureFundMatrixSummaryDto, ApiError>({
    queryKey: ['home-future-fund-matrix'],
    queryFn: () => HomeService.futureFundSummary(),
  });
};
