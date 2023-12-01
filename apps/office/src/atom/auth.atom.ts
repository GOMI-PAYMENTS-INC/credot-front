import { atom } from 'recoil';

export interface MeType {
  me: {
    id: number;
    email: string;
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

export const GoogleAtom = atom<boolean>({
  key: 'GOOGLE',
  default: false,
});
