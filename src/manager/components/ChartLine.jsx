import { Legend } from "chart.js";
import Chart from "react-apexcharts";

const ChartLine = ({ data }) => {
  const chartData = {
    series: data.map((order) => order.quantity),
    options: {
      chart: {
        type: "pie",
        height: 300,
      },
      labels: data.map((order) => order.productName),
      colors: [
        "#34a853",
        "#ff9800",
        "#2196f3",
        "#e91e63",
        "#9c27b0",
        "#00bcd4",
        "#4caf50",
        "#ff5722",
        "#9e9e9e",
        "#607d8b",
        "#ffeb3b",
        "#8bc34a",
        "#3f51b5",
        "#673ab7",
        "#009688",
        "#795548",
        "#e91e63",
        "#03a9f4",
        "#c2185b",
        "#d32f2f",
      ],
      tooltip: {
        theme: "dark",
        y: {
          formatter: (value) => `${value} products sold`,
        },
      },
      legend: {
        show: false,
      },
    },
  };

  return (
    <div className="w-[14rem]">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        height={300}
      />
    </div>
  );
};

export default ChartLine;
