import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  PrefundDto,
  PrefundService,
  PrefundStatusEnum,
  UpdatePrefundDto,
} from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const usePrefundList = ({
  status,
  userId,
  startAt,
  endAt,
}: {
  status: PrefundStatusEnum;
  userId: number | null;
  startAt: string;
  endAt: string;
}) => {
  return useQuery<PrefundDto[], ApiError>({
    queryKey: ['prefund-list', status, userId, startAt, endAt],
    queryFn: () =>
      PrefundService.getPrefunds(status, startAt, endAt, userId ? String(userId) : ''),
    onError: (error: ApiError) => {
      console.error(JSON.stringify(error));
      toast.error('선정산 목록을 불러오지 못하였습니다.');
    },
  });
};

export const useUpdatePrefundStatus = () => {
  return useMutation(
    (requestBody: UpdatePrefundDto) =>
      PrefundService.updatePrefundStatusByIds(requestBody),
    {
      onSuccess: (res) => {
        toast.success('상태가 변경되었습니다.');
        return res;
      },
      onError: (error: ApiError) => {
        console.error(JSON.stringify(error));
        toast.error('상태 변경이 실패했어요!');
      },
    },
  );
};
