import {atom} from 'recoil';

import {MeQuery} from '@/generated/graphql';

export const UserAtom = atom<MeQuery | undefined>({
  key: 'user',
  default: undefined,
});

export const IsLoginStorageAtom = atom<boolean>({
  key: 'isLoginStorageAtom',
  default: false,
});

export const LoginTokenAtom = atom<string | null>({
  key: 'loginTokenAtom',
  default: null,
});
