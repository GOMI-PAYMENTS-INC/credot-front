import { HTTP } from '@/api/axiosConfig';

const PLANS_API = {
  product: 'api/v1/product',
  postUserCard: 'api/v1/user-card',
  getUserCards: 'api/v1/user-card',
  postPayment: 'api/v1/payment',
};

export const getPlans = async () => {
  try {
    const { data } = await HTTP.get<{ data: TGetPlansResponse }>(PLANS_API.product);
    return data.data.products;
  } catch (error) {
    throw new Error('플랜을 가져오는 과정에서 에러가 발생했습니다.');
  }
};

export const postUserCard = async (params: TPostUserCardRequest) => {
  try {
    const response = await HTTP.post<
      TPostUserCardRequest,
      { data: TPostUserCardResponse }
    >(PLANS_API.postUserCard, params);
    return response.data.data;
  } catch (error) {
    throw new Error('회원 카드를 등록하는 과정에서 에러가 발생했습니다.');
  }
};

export const getUserCards = async () => {
  try {
    const { data } = await HTTP.get<{
      data: { totalCount: number; userCards: TUserCard[] };
    }>(PLANS_API.getUserCards);
    return data.data.userCards;
  } catch (error) {
    throw new Error('회원 카드를 조회하는 과정에서 에러가 발생했습니다.');
  }
};

export const postPayment = async (params: { uniqueKey: TPlanUniqueKey }) => {
  try {
    const { data } = await HTTP.post<
      { uniqueKey: TPlanUniqueKey },
      { data: TPostPaymentsResponse }
    >(PLANS_API.postPayment, params);

    return data.data.payment;
  } catch (error) {
    throw new Error('결제 생성 과정에서 에러가 발생했습니다.');
  }
};
