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
// 임시 비밀번호 로그인 여부
export const IsTemporaryPasswordLoginAtom = atom({
  key: 'isTemporaryPasswordLoginAtom',
  default: false,
});
