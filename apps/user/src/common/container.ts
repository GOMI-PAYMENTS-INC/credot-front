import { getSubscription, getCategories, getCurrency } from '@/common/api';
import { PLANS } from '@/common/constants';
import { getPlans } from '@/subscribe/api';
import { CACHING_KEY } from '@/types/enum.code';
import { isTruthy } from '@/utils/isTruthy';
import { useSessionStorage } from '@/utils/useSessionStorage';

import type { SetterOrUpdater } from 'recoil';
import type { SetStateAction, Dispatch } from 'react';

export const _getSubscription = async (
  setSubscription: SetterOrUpdater<TGetSubscriptionResponse | null>,
) => {
  const response = await getSubscription();
  const userPlan = useSessionStorage.getItem(CACHING_KEY.USER_PLAN)?.productUniqueKey;
  // if (userPlan === null || userPlan !== response.productUniqueKey) {
  useSessionStorage.setItem(CACHING_KEY.USER_PLAN, response);
  setSubscription(response);
  // }
};

export const _getCategories = async () => {
  const categories = await getCategories();
  return useSessionStorage.setItem(CACHING_KEY.CATEGORY, categories);
};

export const _checkSubscription = async (
  setSubscription: SetterOrUpdater<TGetSubscriptionResponse | null>,
  setIsExceeded: Dispatch<SetStateAction<boolean>>,
) => {
  const response = await getSubscription();
  if (response.count) {
    setSubscription(response);
    if (response.count >= response.totalCount) {
      setIsExceeded(true);
      return false;
    }
  }
  return true;
};

export const storePlansIntoSession = async (setPlans: SetterOrUpdater<TPlans[]>) => {
  const item = useSessionStorage.getItem(CACHING_KEY.PLANS);
  if (isTruthy(item)) {
    return setPlans(item);
  }
  try {
    const response = await getPlans();
    if (response) {
      useSessionStorage.setItem(CACHING_KEY.PLANS, response.reverse());
      setPlans(response);
    }
  } catch (error) {
    throw new Error('플랜 저장 과정에서 에러가 발생했습니다.');
  }
};

export const convertPlan = (plan: TPlanUniqueKey) => {
  const plans = useSessionStorage.getItem(CACHING_KEY.PLANS) || PLANS;
  return `${plans.find((pl: TPlans) => pl.uniqueKey === plan)?.name}`;
};

const convertCurrencyCode = (code: 'TWD' | 'THB' | 'VND' | 'SGD' | 'MYR') => {
  switch (code) {
    case 'MYR':
      return 'MY';
    case 'THB':
      return 'TH';
    case 'VND':
      return 'VN';
    case 'SGD':
      return 'SG';
    default:
      return 'TW';
  }
};

export const _getCurrency = async () => {
  const response = await getCurrency();
  const _response = response.map((data) =>
    Object.assign(data, {
      currencyCode: convertCurrencyCode(data.currencyCode as TCurrencyCode),
    }),
  );
  return useSessionStorage.setItem(CACHING_KEY.CURRENCY, _response);
};
