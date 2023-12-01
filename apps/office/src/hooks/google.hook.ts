import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { GoogleAtom } from '@/atom';
import { GoogleService, RequestTokenDto } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useRequestGoogleToken = () => {
  const [, setGoogleStatus] = useRecoilState(GoogleAtom);
  return useMutation(
    (requestBody: RequestTokenDto) => GoogleService.requestToken(requestBody),
    {
      onSuccess: (res) => {
        toast.success('인증 정보를 저장했어요!');
        setGoogleStatus(true);
        return res;
      },
      onError: (error: ApiError) => {
        console.error(JSON.stringify(error));
        toast.error('구글 인증 정보 저장에 실패했어요! 다시 시도해주세요.');
      },
    },
  );
};

export const useValidateGoogleToken = () => {
  const [, setGoogleStatus] = useRecoilState(GoogleAtom);
  return useQuery<boolean, ApiError>({
    queryKey: ['validGoogleAuth'],
    queryFn: () => GoogleService.validGoogleAuth(),
    refetchInterval: 1000 * 30,
    onSuccess: (res: boolean) => {
      setGoogleStatus(res);
    },
    onError: () => {
      toast.error('구글 인증 정보를 가져올 수 없어요!');
    },
  });
};
