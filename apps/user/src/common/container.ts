import { getSubscription } from '@/common/api';
import type { SetterOrUpdater } from 'recoil';

import { getPlans } from '@/subscribe/api';
import { CACHING_KEY } from '@/types/enum.code';
import { isTruthy } from '@/utils/isTruthy';

export const _getSubscription = async (
  setSubscription: SetterOrUpdater<TGetSubscriptionResponse | null>,
) => {
  const response = await getSubscription();
  if (response.productUniqueKey) [setSubscription(response)];
};

export const storePlansIntoSession = async () => {
  if (isTruthy(sessionStorage.getItem(CACHING_KEY.PLANS))) return;
  try {
    const response = await getPlans();
    if (response) {
      sessionStorage.setItem(CACHING_KEY.PLANS, JSON.stringify(response));
    }
  } catch (error) {
    throw new Error('플랜 저장 과정에서 에러가 발생했습니다.');
  }
};
