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
import { convertExachangeRate, roundNumber } from '@/containers/report';
import { useMemo } from 'react';

import { Bar } from 'react-chartjs-2';

interface ISalePriceChart {
  priceChartProps: TSalePriceData;
}

export const SalePriceChart = (props: ISalePriceChart) => {
  const { min, max, levelBound, levelCount, basePrice } =
    props.priceChartProps!.priceAnalysisInfo;

  const [minPrice, maxPrice, gap] = [min, max, levelBound].map(
    (price) => convertExachangeRate(price, basePrice) / 100000,
  );

  const salePriceData = useMemo(() => {
    const res = [];
    for (let index = 0; index < levelCount; index++) {
      if (index === 0) {
        res.push([formatNumber(roundNumber(minPrice))]);
      } else if (index === 6) {
        res.push([formatNumber(roundNumber(maxPrice))]);
        return res;
      } else {
        res.push([formatNumber(roundNumber(minPrice + gap * (index + 1)))]);
      }
    }
  }, [minPrice, maxPrice]);

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
  ]; //salePriceData;
  console.log(salePriceData, 'sale');
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: [5, 10, 2, 4, 5, 1, 2], //salePriceData,
        backgroundColor: 'rgba(255,163,120)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
