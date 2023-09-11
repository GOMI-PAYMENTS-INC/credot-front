import { HTTP } from '@/api/axiosConfig';

const PLANS_API = {
  product: '/api/v1/product',
};
export const getPlans = async () => {
  try {
    const { data } = await HTTP.get<{ data: TGetPlansResponse }>(PLANS_API.product);
    return data.data.products;
  } catch (error) {
    throw new Error('플랜을 가져오는 과정에서 에러가 발생했습니다.');
  }
};
