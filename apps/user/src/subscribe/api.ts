import { HTTP } from '@/api/axiosConfig';
import { STATUS_CODE } from '@/types/enum.code';

const PLANS_API = {
  product: 'api/v1/product',
  userCard: 'api/v1/user-card',
  payment: 'api/v1/payment',
  downgrade: 'api/v1/subscribe/downgrade',
  calcelDowngrade: 'api/v1/subscribe/cancel-downgrade',
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
    >(PLANS_API.userCard, params);
    return response.data.data;
  } catch (error) {
    throw new Error('회원 카드를 등록하는 과정에서 에러가 발생했습니다.');
  }
};

export const getUserCards = async () => {
  try {
    const { data } = await HTTP.get<{
      data: TUserCardInfo;
    }>(PLANS_API.userCard);
    return data.data.userCards;
  } catch (error) {
    throw new Error('회원 카드를 조회하는 과정에서 에러가 발생했습니다.');
  }
};

export const postPayment = async (params: { uniqueKey: TPlanUniqueKey }) => {
  try {
    const response = await HTTP.post<
      { uniqueKey: TPlanUniqueKey },
      { code: number; message: string; data: TPostPaymentsResponse }
    >(PLANS_API.payment, params);

    return response.data;
  } catch (error) {
    throw new Error('결제 과정에서 에러가 발생했습니다.');
  }
};

export const getPayment = async () => {
  try {
    const { data } = await HTTP.get<{ data: { payments: TPayments[] } }>(
      PLANS_API.payment,
    );

    return data.data.payments;
  } catch (error) {
    throw new Error('결제 생성 과정에서 에러가 발생했습니다.');
  }
};

export const patchUserCard = async (cardId: number) => {
  try {
    const { data } = await HTTP.patch<{}, { data: TUserCardInfo }>(
      `${PLANS_API.userCard}/${cardId}`,
      {},
    );

    return data.data.userCards;
  } catch (error) {
    throw new Error('카드 변경 과정에서 에러가 발생했습니다.');
  }
};

export const deleteUserCard = async (cardId: number) => {
  try {
    const { data } = await HTTP.delete<{}, { data: TUserCardInfo }>(
      `${PLANS_API.userCard}/${cardId}`,
      {},
      {},
    );
    return data.data.userCards;
  } catch (error) {
    throw new Error('카드 변경 과정에서 에러가 발생했습니다.');
  }
};

export const patchDowngrade = async () => {
  try {
    const { data } = await HTTP.patch<
      {},
      { code: STATUS_CODE; data: TGetSubscriptionResponse }
    >(PLANS_API.downgrade, {});
    return data;
  } catch (error) {
    throw new Error('플랜 다운그레이드 과정에서 에러가 발생했습니다.');
  }
};

export const patchCancelDowngrade = async () => {
  try {
    const { data } = await HTTP.patch<
      {},
      { code: STATUS_CODE; data: TGetSubscriptionResponse }
    >(PLANS_API.calcelDowngrade, {});
    return data;
  } catch (error) {
    throw new Error('플랜 다운그레이드 취소 과정에서 에러가 발생했습니다.');
  }
};
