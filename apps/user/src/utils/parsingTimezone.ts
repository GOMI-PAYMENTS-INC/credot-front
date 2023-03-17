import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertTime = (time: Date | string | null, format: string) => {
  if (!time === true) {
    return dayjs().tz('Asia/Seoul').format(format);
  }
  return dayjs(time).tz('Asia/Seoul').format(format);
};
