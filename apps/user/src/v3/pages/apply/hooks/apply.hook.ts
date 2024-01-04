import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { ApplyService, CreateApplyDto } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useApplyPrefund = () => {
  return useMutation((requestBody: CreateApplyDto) => ApplyService.apply(requestBody), {
    onSuccess: (res) => {
      return true;
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      toast.error(err.message);
      return;
    },
  });
};
