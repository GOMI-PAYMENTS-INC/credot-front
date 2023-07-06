import ReactECharts from 'echarts-for-react';

interface IMarketSizeTrendChart {
  trendData: { date: string[]; interest: number[] };
}

export const MarketSizeTrendChart = ({ trendData }: IMarketSizeTrendChart) => {
  const { date, interest } = trendData;

  const options = {
    grid: { top: 50, right: 8, bottom: 50, left: 50 },
    xAxis: {
      type: 'category',
      data: date,
      step: 30,
    },
    yAxis: {
      name: '검색빈도',
      type: 'value',
      nameLocation: 'middle',
      nameGap: 35,
    },
    series: [
      {
        name: '검색빈도',
        data: interest,
        type: 'line',

        itemStyle: { color: 'rgb(255, 108, 40)' },
        lineStyle: { color: 'rgb(255, 108, 40)' },
      },
    ],

    tooltip: {
      trigger: 'axis',
    },
  };

  return <ReactECharts option={options} />;
};
