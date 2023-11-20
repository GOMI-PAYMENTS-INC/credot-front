import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  ApplyDto,
  ApplyService,
  ApplyStatusEnum,
  UpdateApplyDto,
} from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useApplyList = ({
  status,
  userId,
}: {
  status: ApplyStatusEnum;
  userId: number | null;
}) => {
  return useQuery<ApplyDto[], ApiError>({
    queryKey: ['apply-list', status, userId],
    queryFn: () => ApplyService.getApplies(status, userId ? String(userId) : ''),
    onError: (error: ApiError) => {
      console.error(JSON.stringify(error));
      toast.error('서비스 신청 목록을 불러오지 못하였습니다.');
    },
  });
};

export const useUpdateApplyStatus = () => {
  return useMutation(
    (requestBody: UpdateApplyDto) => ApplyService.updateApplyStatusByIds(requestBody),
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
