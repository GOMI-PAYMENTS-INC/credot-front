import { atom } from 'recoil';

import { ApplyStatusEnum } from '@/generated-rest/api/front';

export type MemberApplyFilterType = {
  status: ApplyStatusEnum;
  userId: null | number;
};

export const MemberApplyFilterAtom = atom<MemberApplyFilterType>({
  key: 'MemberApplyFilter',
  default: {
    status: ApplyStatusEnum.NEW_APPLY,
    userId: null,
  },
});
