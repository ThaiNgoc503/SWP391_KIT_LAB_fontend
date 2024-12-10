import React from "react";
import Chart from "react-apexcharts";

const ChartBar = ({ data }) => {
  // const [timeRange, setTimeRange] = useState("7days");

  // const range = {
  //   "7days": {

  //   },
  //   "30days": {

  //   }
  // }
  // Chuyển đổi dữ liệu
  const chartData = {
    series: [
      {
        name: "Total amount in day",
        data: data.map((order) => order.totalAmount),
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 400,
        width: 500,
        toolbar: {
          show: true,
        },
      },
      xaxis: {
        categories: data.map((order) => order.orderDate),
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => `${value.toLocaleString("vi-VN")} VNĐ`,
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      markers: {
        size: 4,
      },
      grid: {
        borderColor: "#e0e0e0",
        strokeDashArray: 4,
      },
      colors: ["#34a853"],
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <div className="w-[42rem]">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={300}
      />
    </div>
  );
};

export default ChartBar;
