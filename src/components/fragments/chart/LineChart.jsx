import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Line } from "react-chartjs-2";

defaults.font.family = "IRANSans";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      rtl: true,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
    title: {
      display: true,
      text: "آمار بازدید هفتگی ",
    },
  },
};

const LineChart = ({ data: chartData }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = chartData
    ?.map((item) => new Date(item.visit_date).toLocaleDateString("fa-IR"))
    .reverse();

  const data = {
    labels,
    datasets: [
      {
        label: "بازدید کل",
        data: chartData?.map((item) => item.total_hits).reverse(),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "بازدید یکتا",
        data: chartData?.map((item) => item.total_ip).reverse(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line data={data} options={options} />;
};

export default LineChart;
