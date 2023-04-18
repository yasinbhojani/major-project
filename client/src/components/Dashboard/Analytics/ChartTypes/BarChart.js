import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // eslint-disable-line
const BarChart = (props) => {
  const opetions = {
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
  return <Bar data={props.AccountsData} options={opetions} />;
};
export default BarChart;
