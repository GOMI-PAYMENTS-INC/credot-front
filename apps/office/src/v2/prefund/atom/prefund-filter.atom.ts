import dayjs from 'dayjs';
import { atom } from 'recoil';

import { TermType } from '@/v2/prefund/components/Filter';

export type PrefundFilterType = {
  term: TermType;
  termRange: [dayjs.Dayjs, dayjs.Dayjs];
  userId: null | number;
};

export const PrefundFilterAtom = atom<PrefundFilterType>({
  key: 'PrefundFilter',
  default: {
    term: 'today',
    termRange: [dayjs(), dayjs()],
    userId: null,
  },
});
