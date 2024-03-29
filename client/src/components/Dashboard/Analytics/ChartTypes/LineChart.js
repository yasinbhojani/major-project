import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // eslint-disable-line
const LineChart = (props) => {
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Dates",
        },
      },
      y: {
        title: {
          display: true,
          text: props.text,
        },
      },
    },
  };
  return <Line data={props.AccountsData} options={options} />;
};
export default LineChart;
