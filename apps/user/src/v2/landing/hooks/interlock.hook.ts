import { useMutation } from '@tanstack/react-query';

import { InterlockService, RequestCrawlingDto } from '@/generated-rest/api/front';

export const useCheckVanLogin = () => {
  return useMutation(
    (requestBody: RequestCrawlingDto) => InterlockService.checkVanLogin(requestBody),
    {
      onSuccess: (res) => {
        return res;
      },
    },
  );
};
