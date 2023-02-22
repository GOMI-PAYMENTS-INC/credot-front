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

import { Bar } from 'react-chartjs-2';

export const SalePriceChart = () => {
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

  const labels = [31000, 36000, 4100, 4600, 5100, 5600, 6100];
  0;
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: [1000, 2000, 3000, 4000, 5500, 6000, 8000, 1000, 2000, 2000],
        backgroundColor: 'rgba(255,163,120)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
