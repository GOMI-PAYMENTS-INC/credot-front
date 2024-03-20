import ReactECharts from 'echarts-for-react';

export const LineStack = ({
  xAxis,
  legend,
  series,
}: {
  xAxis: string[];
  legend: string[];
  series: { name: string; type: string; stack: string; data: number[] }[];
}) => {
  return (
    <ReactECharts
      option={{
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: legend || [],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis || [],
        },
        yAxis: {
          type: 'value',
        },
        series: series || [],
      }}
      notMerge={true}
      showLoading={false}
    />
  );
};
