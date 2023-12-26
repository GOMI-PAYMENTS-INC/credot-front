import dayjs from 'dayjs';
import { atom } from 'recoil';

export const HistoryDatePickerAtom = atom<[dayjs.Dayjs, dayjs.Dayjs]>({
  key: 'HistoryDatePicker',
  default: [dayjs().subtract(7, 'd'), dayjs()],
});
