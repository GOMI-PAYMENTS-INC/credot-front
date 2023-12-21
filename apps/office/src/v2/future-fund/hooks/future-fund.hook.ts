import { useQuery } from '@tanstack/react-query';

import { FutureFundDto, FutureFundService } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useFutureFundList = ({
  userId,
  startAt,
  endAt,
}: {
  userId: number | null;
  startAt: string;
  endAt: string;
}) => {
  return useQuery<FutureFundDto[], ApiError>({
    queryKey: ['future-fund', startAt, endAt, userId],
    queryFn: () => FutureFundService.list(startAt, endAt, Number(userId)),
    enabled: !!userId,
  });
};
