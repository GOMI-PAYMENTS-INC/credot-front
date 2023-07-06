import ReactECharts from 'echarts-for-react';
import { roundNumber, countProductsByPrice } from '@/report/container';
import { setChartLabels } from '@/report/price/container';
import { useMemo } from 'react';

interface ISalePriceChart {
  priceChartProps: TSalePriceData;
  currencyUnit: number;
  changedPrice: {
    min: number;
    max: number;
    levelBound: number;
    removedOutlinerItmes: TSalePriceItems[];
  };
}

export const SalePriceChart = (props: ISalePriceChart) => {
  const { priceAnalysisInfo } = props.priceChartProps!;
  const { levelCount, basePrice } = priceAnalysisInfo;
  const { min, max, levelBound, removedOutlinerItmes } = props.changedPrice;

  const salePriceScope = useMemo(() => {
    const res = [];
    for (let index = 0; index < levelCount; index++) {
      if (index === 0) {
        res.push(roundNumber(min));
      } else if (index === levelCount) {
        res.push(roundNumber(max));
      } else {
        res.push(roundNumber(min + levelBound * (index + 1)));
      }
    }
    return res.map((price) => (typeof price === 'string' ? parseInt(price) : price));
  }, [min, max]);

  const countProducts = useMemo(
    () => countProductsByPrice(salePriceScope, removedOutlinerItmes),
    [salePriceScope],
  );
  const labels = setChartLabels(props.currencyUnit, salePriceScope, basePrice);

  const option = {
    grid: { top: 30, right: 8, bottom: 52, left: 50 },

    xAxis: {
      type: 'category',
      data: labels,
      name: '판매가격',
      nameLocation: 'middle',
      nameGap: 40,
    },
    yAxis: {
      type: 'value',
      name: '상품 수',
      nameLocation: 'middle',
      nameGap: 35,
    },
    series: [
      {
        name: `상품 수`,
        data: countProducts,
        type: 'bar',
        itemStyle: { color: 'rgba(255,163,120)' },
      },
    ],
    tooltip: {
      trigger: 'axis',

      axisPointer: {
        type: 'shadow',
      },
    },
  };
  return <ReactECharts option={option} />;
};
