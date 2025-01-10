import React from "react";
import { Line } from "react-chartjs-2";

function AreaChart() {
  const data = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월","8월", "9월", "10월", "11월", "12월"],
    datasets: [
      {
        label: "학생수",
        data: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgb(70, 8, 170)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "월별 학생수",
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default AreaChart;
