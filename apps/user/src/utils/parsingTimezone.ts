import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertTime = (time: string, format: string) => {
  return dayjs(time).tz('Asia/Seoul').format(format);
};
