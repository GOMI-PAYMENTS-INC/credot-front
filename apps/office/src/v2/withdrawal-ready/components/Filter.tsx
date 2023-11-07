import { Button, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

type TermType = 'today' | 'yesterday' | 'recent-7-days' | null;

export const Filter = () => {
  const [term, setTerm] = useState<TermType>('today');
  const [termRange, setTermRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs(),
    dayjs(),
  ]);

  const handleChangeTerm = (value: TermType) => {
    setTerm(value);
    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');
    const sevenDaysAgo = dayjs().subtract(7, 'day');
    value === 'today' && setTermRange([today, today]);
    value === 'yesterday' && setTermRange([yesterday, yesterday]);
    value === 'recent-7-days' && setTermRange([sevenDaysAgo, today]);
  };

  const handleChangeTermRange = (dates: [dayjs.Dayjs, dayjs.Dayjs]) => {
    setTermRange(dates);

    const datesSame = dates[0].format('YYYY-MM-DD') === dates[1].format('YYYY-MM-DD');
    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');
    const sevenDaysAgo = dayjs().subtract(7, 'day');
    const isToday =
      datesSame && dates[0].format('YYYY-MM-DD') === today.format('YYYY-MM-DD');
    const isYesterday =
      datesSame && dates[0].format('YYYY-MM-DD') === yesterday.format('YYYY-MM-DD');
    const isRecent7Days =
      dates[1].format('YYYY-MM-DD') === today.format('YYYY-MM-DD') &&
      dates[0].format('YYYY-MM-DD') === sevenDaysAgo.format('YYYY-MM-DD');

    isToday && setTerm('today');
    isYesterday && setTerm('yesterday');
    isRecent7Days && setTerm('recent-7-days');
  };

  const handleSearch = () => {
    // TODO
  };
  return (
    <div className='mt-[20px] w-full bg-grey-50 py-[20px]'>
      <div className='mx-auto flex w-[1280px] justify-between'>
        <div className='flex items-center'>
          <div className='mr-[40px] text-S/Regular text-grey-700'>데이터 생성일</div>
          <Button
            className='mr-[14px]'
            type={term === 'today' ? 'primary' : 'default'}
            onClick={() => handleChangeTerm('today')}
          >
            오늘
          </Button>
          <Button
            className='mr-[14px]'
            type={term === 'yesterday' ? 'primary' : 'default'}
            onClick={() => handleChangeTerm('yesterday')}
          >
            어제
          </Button>
          <Button
            type={term === 'recent-7-days' ? 'primary' : 'default'}
            className='mr-[14px]'
            onClick={() => handleChangeTerm('recent-7-days')}
          >
            최근 7일
          </Button>
          <DatePicker.RangePicker
            value={termRange}
            placeholder={['시작일', '종료일']}
            onChange={(dates) =>
              handleChangeTermRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
            }
          />
        </div>
        <div className='flex items-center'>
          <div className='mr-[11px] text-S/Regular text-grey-700'>업체명</div>
          <Select
            placeholder='전체'
            className='mr-[40px]'
            style={{ width: 154 }}
            onChange={() => {}}
            options={[{ value: 'jack', label: 'Jack' }]}
          />
          <Button onClick={handleSearch}>조회</Button>
        </div>
      </div>
    </div>
  );
};
