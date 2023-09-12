import { atom } from 'recoil';

export const UserCardsAtom = atom<TUserCard[]>({
  key: 'userCard',
  default: [],
});

export const UserPlanAtom = atom<TPlans | null>({
  key: 'userPlan',
  default: null,
});
