import ReactECharts from 'echarts-for-react';

interface ICategoryRankChart {
  data: TCategoryChart[];
}
export const CategoryRankChart = ({ data }: ICategoryRankChart) => {
  // console.log(convertedData, 'convertedData');
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    series: [
      {
        name: '상품 카테고리',
        type: 'pie',
        radius: [40, 120],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        data: data.map((form) => {
          return {
            value: form.count,
            name: form.category,
            itemStyle: { color: form.background },
          };
        }),
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '300px', paddingTop: '10px', width: '250px' }}
    />
  );
};
