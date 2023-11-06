import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { PrefundService, RequestCrawlingDto } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useSearchMyPrefund = () => {
  return useMutation(
    (requestBody: RequestCrawlingDto) => PrefundService.searchMyPrefund(requestBody),
    {
      onSuccess: (res) => {
        return res;
      },
      onError: (err: ApiError) => {
        console.error(err.message);
        toast.error('묶여 있는 정산금 가져오기 실패했어요!');
        return;
      },
    },
  );
};
