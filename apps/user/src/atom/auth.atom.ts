import { atom } from 'recoil';

import { Role } from '@/generated/graphql';

export interface MeType {
  me: {
    id: number;
    email: string;
    role?: Role;
    name?: string;
    nickName?: string | null;
    phone?: string | null;
    profileImage?: string | null;
    joinedAt?: string | null;
    isSocialLogin?: boolean;
    socialProvider?: string | null;
  };
}

export const UserAtom = atom<MeType | undefined>({
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
