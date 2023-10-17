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

export const getCategories = async () => {
  const URL = 'api/v1/category-hot-keyword/categories';
  try {
    const { data } = await HTTP.get<{ data: TCategoryListResponse }>(URL);
    return data.data.categories;
  } catch (error) {
    throw new Error('카테고리 목록을 요청하는 과정에서 에러가 발생했습니다.');
  }
};

export const getCurrency = async () => {
  const URL = '/api/v1/exchange-rate';
  try {
    const { data } = await HTTP.get<{ data: TCurrencyResponse }>(URL);
    return data.data.exchangeRates;
  } catch (error) {
    throw new Error('국가 환율을 요청하는 과정에서 에러가 발생했습니다.');
  }
};
