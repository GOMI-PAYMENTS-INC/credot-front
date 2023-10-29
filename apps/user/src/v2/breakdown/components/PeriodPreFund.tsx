import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import ReactECharts from 'echarts-for-react';
const { RangePicker } = DatePicker;
export const PeriodPreFund = () => {
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
      data: ['10.27', '10.28', '10.29', '10.30', '10.31', '11.1', '11.2'],
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
        data: [150, 212, 201, 154, 190, 330, 410],
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
        data: [-220, 182, 191, 234, -290, 330, 310],
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
        data: [120, 132, -501, 134, 90, 230, 210],
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
        data: [320, 302, 301, 334, 390, 330, 320],
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
            separator={'~'}
            suffixIcon={<CalendarOutlined rev={undefined} className='text-orange-400' />}
          />
        </div>
      </div>
      <ReactECharts option={option} />
    </div>
  );
};
