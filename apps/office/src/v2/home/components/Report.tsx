import { Card, DatePicker, Radio, Select } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { LineStack } from '@/v2/home/components/Charts/line-stack';
import { HomeTitle } from '@/v2/home/components/HomeTitle';

export type ReportType = 'PROFIT' | 'ACTIVE_USER' | 'PREFUND' | 'FUTURE_FUND';
export type DateType = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export const Report = () => {
  const [type, setType] = useState<ReportType>('PROFIT');
  const [dateType, setDateType] = useState<DateType>('DAILY');
  const [datePick, setDatePick] = useState<number | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs(),
    dayjs(),
  ]);
  return (
    <div className='mt-[70px]'>
      <HomeTitle title='맞춤 데이터 조회' />
      <div className='flex gap-x-6'>
        <div className='flex'>
          <div className='mr-[29px] self-center text-grey-700'>데이터</div>
          <Select
            defaultValue='lucy'
            style={{ width: 120 }}
            value={type}
            options={[
              { value: 'ACTIVE_USER', label: 'Active User', disabled: true },
              { value: 'PROFIT', label: '서비스 수수료' },
              { value: 'PREFUND', label: '선정산금액', disabled: true },
              { value: 'FUTURE_FUND', label: '미래정산 금액', disabled: true },
            ]}
          />
        </div>

        <div className='flex items-center'>
          <Select
            defaultValue='lucy'
            className='mr-6'
            value={dateType}
            style={{ width: 120 }}
            options={[
              { value: 'DAILY', label: 'Daily' },
              { value: 'WEEKLY', label: 'Weekly', disabled: true },
              { value: 'MONTHLY', label: 'Monthly', disabled: true },
            ]}
          />

          <Radio.Group name='radiogroup' className='mr-6' value={datePick}>
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
            // onChange={(dates) =>
            //   handleChangeTermRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
            // }
          />
        </div>
      </div>

      <Card className='mt-[24px]'>
        <LineStack />
      </Card>
    </div>
  );
};
