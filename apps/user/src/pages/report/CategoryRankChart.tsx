import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

interface ICategoryRankChart {
  data: {
    datasets: [
      {
        data: number[];
        backgroundColor: string[];
      },
    ];

    labels: string[];
  };
}
export const CategoryRankChart = (props: ICategoryRankChart) => {
  const { datasets, labels } = props.data;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  );

  const options = {
    responsive: true, // 차트가 반응형으로 크기 조정되도록 설정
    plugins: {
      legend: {
        display: false, // 라벨 목록 숨김
      },
    },
  };

  const ranks: string[] = labels.reduce(
    (accumulator: string[], currentValue: string, currentIndex: number) => {
      accumulator.push(currentIndex + 1 + '위');
      return accumulator;
    },
    [],
  );

  const data = {
    labels: labels,
    datasets: [
      {
        data: datasets[0].data,
        backgroundColor: datasets[0].backgroundColor,
      },
    ],
  };

  return <Doughnut options={options} data={data} width={179} height={179} />;
};
