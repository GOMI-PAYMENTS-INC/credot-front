import { useMutation } from '@tanstack/react-query';

import { PrefundService, RequestCrawlingDto } from '@/generated-rest/api/front';

export const useSearchMyPrefund = () => {
  return useMutation(
    (requestBody: RequestCrawlingDto) => PrefundService.searchMyPrefund(requestBody),
    {
      onSuccess: (res) => {
        return res;
      },
    },
  );
};
