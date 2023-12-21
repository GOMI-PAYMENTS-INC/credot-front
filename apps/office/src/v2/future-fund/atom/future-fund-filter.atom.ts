import dayjs from 'dayjs';
import { atom } from 'recoil';

import { TermType } from '@/v2/prefund/components/Filter';

export type FutureFundFilterType = {
  term: TermType;
  termRange: [dayjs.Dayjs, dayjs.Dayjs];
  userId: null | number;
};

export const FutureFundFilterAtom = atom<FutureFundFilterType>({
  key: 'PrefundFilter',
  default: {
    term: 'today',
    termRange: [dayjs(), dayjs()],
    userId: null,
  },
});
