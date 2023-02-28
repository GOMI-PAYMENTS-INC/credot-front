import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  SubTitle,
} from 'chart.js';

import { formatNumber } from '@/utils/formatNumber';
import {
  convertExachangeRate,
  roundNumber,
  countProductsByPrice,
} from '@/containers/report';
import { useMemo } from 'react';

import { Bar } from 'react-chartjs-2';

interface ISalePriceChart {
  priceChartProps: TSalePriceData;
}

export const SalePriceChart = (props: ISalePriceChart) => {
  const { items, priceAnalysisInfo } = props.priceChartProps!;
  const { min, max, levelBound, levelCount, basePrice } = priceAnalysisInfo;

  const salePriceScope = useMemo(() => {
    const res = [];
    for (let index = 0; index < levelCount; index++) {
      if (index === 0) {
        res.push(roundNumber(min));
      } else if (index === 6) {
        res.push(roundNumber(max));
      } else {
        res.push(roundNumber(min + levelBound * (index + 1)));
      }
    }
    return res.map((el) => (typeof el === 'string' ? parseInt(el) : el));
  }, [min, max]);

  const [minPrice, maxPrice, gap] = [min, max, levelBound].map((price) =>
    convertExachangeRate(price, basePrice),
  );

  console.log(salePriceScope, 'scope');

  console.log(
    countProductsByPrice(salePriceScope, props.priceChartProps?.gradeItems!),
    'test',
  );
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, SubTitle);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        position: 'bottom' as const,
        text: '판매가격',
      },
      subtitle: {
        display: true,
        position: 'left' as const,
        text: '상품 수',
        padding: { bottom: 32 },
        lineWeight: 10,
      },
    },
  };

  const labels = [
    ['230', '23,116'],
    ['23,116', '34,558'],
    ['34,558', '46,001'],
    ['46,001', '57,444'],
    ['57,444', '68,887'],
    ['68,887', '80,330'],
    ['80,330'],
  ]; //salePriceScope;

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: [10], //salePriceScope,
        backgroundColor: 'rgba(255,163,120)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
