import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { useRecoilState } from 'recoil';

import { useSearchPeriodPrefundHook } from '@/v2/breakdown/hooks/prefund.hook';
import { BreakdownDatePickerAtom } from '@/v2/breakdown/store/date.atom';
const { RangePicker } = DatePicker;

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current > dayjs();
};

export const PeriodPreFund = () => {
  const [dates, setDates] = useRecoilState(BreakdownDatePickerAtom);
  const { data: result, isLoading } = useSearchPeriodPrefundHook({
    startAt: dates[0].format('YYYY-MM-DD'),
    endAt: dates[1].format('YYYY-MM-DD'),
  });

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      orient: 'horizontal',
      right: 0,
      bottom: 0,
      data: ['매출', '카드사 수수료', '서비스 수수료', '과정산 금액'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: result?.dates || [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '과정산 금액',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: '#F2FAFF',
        },
        data: result?.data.find((item) => item.name === 'setoff')?.values || [],
      },
      {
        name: '서비스 수수료',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: '#ABDCFF',
        },
        data:
          result?.data.find((item) => item.name === 'serviceCommission')?.values || [],
      },
      {
        name: '카드사 수수료',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: '#40B6FF',
        },
        data: result?.data.find((item) => item.name === 'cardCommission')?.values || [],
      },
      {
        name: '매출',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: '#E64900',
        },
        data: result?.data.find((item) => item.name === 'salesPrice')?.values || [],
      },
    ],
  };

  return (
    <div className='mt-[90px]'>
      <div className='flex justify-between'>
        <div className='text-XL/Bold'>기간 조회</div>
        <div>
          <RangePicker
            placeholder={['시작일', '종료일']}
            value={dates}
            separator={'~'}
            onChange={(dates) => {
              const dateValues = dates as [dayjs.Dayjs, dayjs.Dayjs];
              if (dateValues[0] && dateValues[1]) {
                setDates(dateValues);
              }
            }}
            disabledDate={disabledDate}
            suffixIcon={<CalendarOutlined rev={undefined} className='text-orange-400' />}
          />
        </div>
      </div>
      <ReactECharts option={option} showLoading={isLoading} />
    </div>
  );
};
