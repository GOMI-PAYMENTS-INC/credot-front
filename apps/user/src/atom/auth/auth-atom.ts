import { atom } from 'recoil';

import { User } from '@/generated/graphql';

export const UserAtom = atom<User | undefined>({
  key: 'user',
  default: undefined,
});
export const LoginStateAtom = atom<boolean>({
  key: 'loginStateAtom',
  default: false,
});

export const IsLoginStorageAtom = atom<boolean>({
  key: 'isLoginStorageAtom',
  default: false,
});

export const LoginTokenAtom = atom<string | null>({
  key: 'loginTokenAtom',
  default: null,
});

export const SocialTokenAtom = atom<string>({
  key: 'socialTokenAtom',
  default: '',
});
// 임시 비밀번호 로그인 여부
export const IsTemporaryPasswordLoginAtom = atom<boolean>({
  key: 'isTemporaryPasswordLoginAtom',
  default: false,
});
