import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { isMobile } from 'react-device-detect';
import { useRecoilState } from 'recoil';

import { useSearchPeriodPrefundHook } from '@/v3/pages/history/hooks';
import { HistoryDatePickerAtom } from '@/v3/pages/history/store/date.atom';
const { RangePicker } = DatePicker;

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current > dayjs();
};

export const PeriodPreFund = () => {
  const [dates, setDates] = useRecoilState(HistoryDatePickerAtom);
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
      left: 'center',
      padding: isMobile ? 0 : 15,
      backgroundColor: isMobile ? null : '#F5F5F5',
      right: 0,
      borderRadius: 4,
      bottom: 0,
      textStyle: {
        color: '#595959',
      },
      data: [
        '카드 매출',
        '카드사 수수료',
        '서비스 수수료',
        '과정산 금액',
        '미래 정산금 상환',
        '미래 정산 수수료',
      ],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: isMobile ? '20%' : '22%',
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
        name: '미래 정산 수수료',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: '#FCF6CF',
        },
        data: result?.data.find((item) => item.name === 'repaymentFees')?.values || [],
      },
      {
        name: '미래 정산금 상환',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: '#C9F5DF',
        },
        data: result?.data.find((item) => item.name === 'repaymentPrice')?.values || [],
      },
      {
        name: '과정산 금액',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: '#D7EEFF',
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
          color: '#FFDAC8',
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
          color: '#FDE1E4',
        },
        data: result?.data.find((item) => item.name === 'cardCommission')?.values || [],
      },
      {
        name: '카드 매출',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: '#843ACD',
        },
        data: result?.data.find((item) => item.name === 'salesPrice')?.values || [],
      },
    ],
  };

  return (
    <div>
      <div className={`flex ${isMobile ? '' : 'justify-end'}`}>
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
          className={isMobile ? 'w-full' : ''}
          disabledDate={disabledDate}
          suffixIcon={<CalendarOutlined rev={undefined} className='text-purple-600' />}
        />
      </div>
      <div className='mt-[14px] rounded-[8px] border border-grey-200 bg-grey-50 pb-[20px]'>
        <ReactECharts option={option} showLoading={isLoading} />
      </div>
    </div>
  );
};
