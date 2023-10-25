import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { InterlockService } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useCheckInterLockVan = () => {
  return useQuery<Boolean, ApiError>({
    queryKey: ['checkInterLockVan'],
    queryFn: () => InterlockService.checkInterLockVan(),
    onSuccess: (res: Boolean) => {
      return res;
    },
    onError: () => {
      toast.error(
        '시스템 통신에 장애가 발생했습니다. 오류가 반복되는 경우 문의해주세요.',
      );
      return;
    },
  });
};
