import { atom } from 'recoil';

export const SwitchAtom = atom<boolean>({
  key: 'switch',
  default: false,
});
