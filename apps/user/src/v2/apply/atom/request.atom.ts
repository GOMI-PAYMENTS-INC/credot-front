import { atom } from 'recoil';

export const PrefundRequestIdAtom = atom<number[]>({
  key: 'PrefundRequestId',
  default: [],
});
