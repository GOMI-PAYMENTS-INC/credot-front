import { atom } from 'recoil';

export const LoginStateAtom = atom({
  key: 'loginStateAtom',
  default: false,
});

export const IsLoginStorageAtom = atom({
  key: 'isLoginStorageAtom',
  default: false,
});
