import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

interface IMarketSizeTrendChart {
  trendData: { date: string[]; interest: number[] };
}

export const MarketSizeTrendChart = (props: IMarketSizeTrendChart) => {
  const { date, interest } = props.trendData;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          min: 0,
          max: 100,
          stepSize: 25,
        },
      },
    },
    plugins: {
      subtitle: {
        display: true,
        position: 'left' as const,
        text: '검색빈도',
        padding: { bottom: 4 },
        lineWeight: 500,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const labels = date;

  const data = {
    labels,
    datasets: [
      {
        data: interest,
        borderColor: 'rgb(255, 108, 40)',
        borderWidth: 4,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} width={1000} height={400} data={data} />;
};
