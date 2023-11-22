import { atom } from 'recoil';

export type MemberListFilterType = {
  userId: null | string;
};

export const MemberListFilterType = atom<MemberListFilterType>({
  key: 'MemberListFilter',
  default: {
    userId: null,
  },
});
