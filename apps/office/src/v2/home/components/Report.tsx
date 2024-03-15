import { Card, DatePicker, Radio, Select } from 'antd';

import { HomeTitle } from '@/v2/home/components/HomeTitle';

export const Report = () => {
  return (
    <div className='mt-[70px]'>
      <HomeTitle title='맞춤 데이터 조회' />
      <div className='flex gap-x-6'>
        <div className='flex'>
          <div className='mr-[29px] self-center text-grey-700'>데이터</div>
          <Select
            defaultValue='lucy'
            style={{ width: 120 }}
            options={[
              { value: 'jack', label: 'Active User' },
              { value: 'lucy', label: '서비스 수수료' },
              { value: 'Yiminghe', label: '선정산금액' },
              { value: 'disabled', label: '미래정산 금액' },
            ]}
          />
        </div>

        <div className='flex items-center'>
          <Select
            defaultValue='lucy'
            className='mr-6'
            style={{ width: 120 }}
            options={[
              { value: 'jack', label: 'Daily' },
              { value: 'lucy', label: 'Weekly' },
              { value: 'Yiminghe', label: 'Monthly' },
            ]}
          />

          <Radio.Group name='radiogroup' defaultValue={1} className='mr-6'>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>

          <DatePicker.RangePicker
            placeholder={['시작일', '종료일']}
            // onChange={(dates) =>
            //   handleChangeTermRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
            // }
          />
        </div>
      </div>

      <Card className='mt-[24px]'>차트</Card>
    </div>
  );
};
