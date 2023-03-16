import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js';

import { roundNumber, countProductsByPrice, setChartLabels } from '@/containers/report';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

interface ISalePriceChart {
  priceChartProps: TSalePriceData;
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

  const countProducts = useMemo(() => {
    const countProducts = countProductsByPrice(salePriceScope, removedOutlinerItmes);

    const maxCount = Math.max(...countProducts);

    return { countProducts: countProducts, max: maxCount };
  }, [salePriceScope]);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, SubTitle);

  const options = {
    responsive: true,
    scales: {
      y: {
        display: true,
        beginAtZero: true,
      },
    },

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
      tooltip: {
        yAlign: 'bottom' as const,
        xAlign: 'center' as const,
        backgroundColor: '#00000',
        callbacks: {
          title: () => '',
          label: (value: any) => {
            value.formattedValue = value.formattedValue + ' 개';
          },
          labelColor: () => {},
        },
        displayColors: false,
      },
    },
  };

  const labels = setChartLabels(salePriceScope, basePrice);

  const data = {
    labels,
    datasets: [
      {
        data: countProducts.countProducts,
        backgroundColor: 'rgba(255,163,120)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
