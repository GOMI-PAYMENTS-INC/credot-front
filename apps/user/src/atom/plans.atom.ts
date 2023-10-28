import { atom } from 'recoil';

export const UserCardsAtom = atom<[]>({
  key: 'userCard',
  default: [],
});

export const UserPlanAtom = atom<null>({
  key: 'userPlan',
  default: null,
});
