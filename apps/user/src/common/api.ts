import { HTTP } from '@/api/axiosConfig';

export const getSubscription = async () => {
  const URL = 'api/v1/subscribe';
  try {
    const { data } = await HTTP.get<{ data: TGetSubscriptionResponse }>(URL);
    return data.data;
  } catch (error) {
    throw new Error('회원 구독정보를 요청하는 과정에서 에러가 발생했습니다.');
  }
};
