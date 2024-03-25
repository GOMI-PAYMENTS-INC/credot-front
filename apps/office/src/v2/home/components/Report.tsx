import { Card, DatePicker, Radio, Select } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { LineStack } from '@/v2/home/components/Charts/line-stack';
import { HomeTitle } from '@/v2/home/components/HomeTitle';
import { useChart } from '@/v2/home/hooks';

export type ReportType = 'PROFIT' | 'ACTIVE_USER' | 'PREFUND' | 'FUTURE_FUND';
export type DateType = 'DAILY' | 'WEEKLY' | 'MONTHLY';

const getDateUnit = (current: DateType): 'day' => {
  if (current === 'DAILY') {
    return 'day';
  }

  return 'day';
};

export const Report = () => {
  const [type, setType] = useState<ReportType>('PROFIT');
  const [dateType, setDateType] = useState<DateType>('DAILY');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);

  const { data } = useChart({
    type,
    dateType,
    startAt: dateRange[0].format('YYYY-MM-DD'),
    endAt: dateRange[1].format('YYYY-MM-DD'),
    userId: 0,
  });

  const datePick = Math.abs(dateRange[0].diff(dateRange[1], getDateUnit(dateType)));
  return (
    <div className='mt-[70px]'>
      <HomeTitle title='맞춤 데이터 조회' />
      <div className='flex gap-x-6'>
        <div className='flex'>
          <div className='mr-[29px] self-center text-grey-700'>데이터</div>
          <Select
            style={{ width: 120 }}
            value={type}
            onChange={(value) => setType(value as ReportType)}
            options={[
              { value: 'ACTIVE_USER', label: 'Active User' },
              { value: 'PROFIT', label: '서비스 수수료' },
              { value: 'PREFUND', label: '선정산금액' },
              { value: 'FUTURE_FUND', label: '미래정산 금액' },
              { value: 'GMV', label: 'GMV' },
            ]}
          />
        </div>

        <div className='flex items-center'>
          <Select
            defaultValue='lucy'
            className='mr-6'
            value={dateType}
            onChange={(value) => setDateType(value as DateType)}
            style={{ width: 120 }}
            options={[
              { value: 'DAILY', label: 'Daily' },
              { value: 'WEEKLY', label: 'Weekly' },
              { value: 'MONTHLY', label: 'Monthly' },
            ]}
          />

          <Radio.Group
            name='radiogroup'
            className='mr-6'
            value={datePick}
            onChange={({ target }) => {
              setDateRange([
                dayjs().subtract(target.value, getDateUnit(dateType)),
                dayjs(),
              ]);
            }}
          >
            {dateType === 'DAILY' && (
              <>
                <Radio value={7}>7d</Radio>
                <Radio value={30}>30d</Radio>
                <Radio value={60}>60d</Radio>
                <Radio value={90}>90d</Radio>
              </>
            )}
          </Radio.Group>

          <DatePicker.RangePicker
            placeholder={['시작일', '종료일']}
            value={dateRange}
            onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
          />
        </div>
      </div>

      <Card className='mt-[24px]'>
        <LineStack
          xAxis={data?.xAxis || []}
          legend={data?.legend || []}
          series={data?.series || []}
        />
      </Card>
    </div>
  );
};
