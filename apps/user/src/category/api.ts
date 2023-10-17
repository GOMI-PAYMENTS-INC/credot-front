import { HTTP } from '@/api/axiosConfig';

export const getCategoryProducts = async (params: {
  countryCode: TSearchCountry;
  categoryCode: string;
}) => {
  try {
    const URL = '/api/v1/category-hot-keyword';
    const { data } = await HTTP.get<{ data: TCategoryTableList }>(URL, { params });
    return data.data;
  } catch (error) {
    throw new Error('테이블을 가져오는 과정에서 에러가 발생했습니다.');
  }
};
