import { atom } from 'recoil';

export type StatusType = 'NEW_APPLY' | 'IN_BUSINESS' | 'IN_CONTRACT' | 'IN_HOLD';

export type MemberApplyFilterType = {
  status: StatusType;
  userId: null | number;
};

export const MemberApplyFilterAtom = atom<MemberApplyFilterType>({
  key: 'MemberApplyFilter',
  default: {
    status: 'NEW_APPLY',
    userId: null,
  },
});
