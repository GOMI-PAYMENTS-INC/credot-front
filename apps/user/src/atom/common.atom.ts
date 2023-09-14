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
