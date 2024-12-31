import React from "react";
import { Line } from "react-chartjs-2";

function AreaChart() {
  const data = {
    labels: ["Mar 1", "Mar 3", "Mar 5", "Mar 7", "Mar 9", "Mar 11", "Mar 13"],
    datasets: [
      {
        label: "Dataset",
        data: [10000, 20000, 15000, 25000, 30000, 35000, 40000],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
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
        text: "Area Chart Example",
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default AreaChart;
