import dayjs from 'dayjs';
import { atom } from 'recoil';

export const BreakdownDatePickerAtom = atom<[dayjs.Dayjs, dayjs.Dayjs]>({
  key: 'BreakdownDatePicker',
  default: [dayjs().subtract(7, 'd'), dayjs()],
});
