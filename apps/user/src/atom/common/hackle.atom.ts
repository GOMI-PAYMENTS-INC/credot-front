import { atom } from 'recoil';

export const HackleId = atom<THackleId | null>({
  key: 'hackleId',
  default: null,
});
