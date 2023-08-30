import { atom } from 'recoil';

export const HackleAtom = atom<THackleState>({
  key: 'hackleId',
  default: { hackleId: null, reason: 'SDK_NOT_READY' },
});
