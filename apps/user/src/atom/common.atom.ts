import { atom } from 'recoil';

export const SwitchAtom = atom<boolean>({
  key: 'switch',
  default: false,
});

export const SubscriptionAtom = atom<TGetSubscriptionResponse | null>({
  key: 'subscription',
  default: null,
});

export const PlansAtom = atom<TPlans[]>({
  key: 'plans',
  default: [],
});

export const PaginationAtom = atom<TPagination>({
  key: 'pagination',
  default: { bundle: 10, page: 1 },
});
