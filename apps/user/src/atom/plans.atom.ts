import { atom } from 'recoil';

export const UserCardsAtom = atom<TUserCard[]>({
  key: 'userCard',
  default: [],
});
