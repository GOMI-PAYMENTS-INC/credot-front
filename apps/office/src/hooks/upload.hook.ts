import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { FileDto, UploadService } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useGetFiles = (fileIds: number[]) => {
  return useQuery<FileDto[], ApiError>({
    queryKey: ['get-file', fileIds],
    queryFn: () =>
      Promise.all(fileIds.map((fileId) => UploadService.getUploadFile(fileId))),
    onError: (error: ApiError) => {
      console.error(JSON.stringify(error));
      toast.error('파일을 불러오지 못하였습니다.');
    },
  });
};
