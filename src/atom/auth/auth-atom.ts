import { atom } from 'recoil';

import { User } from '@/generated/graphql';

export const UserAtom = atom<User | undefined>({
  key: 'user',
  default: undefined,
});
export const LoginStateAtom = atom({
  key: 'loginStateAtom',
  default: false,
});

export const IsLoginStorageAtom = atom({
  key: 'isLoginStorageAtom',
  default: false,
});

export const IdTokenAtom = atom({
  key: 'idTokenAtom',
  default: '',
});
