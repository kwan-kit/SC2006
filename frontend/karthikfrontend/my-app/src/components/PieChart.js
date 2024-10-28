import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ completed, total }) => {
  const remaining = total - completed;

  // Data for the pie chart
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completed, remaining], // completed and remaining values
        backgroundColor: ["#007AFF", "#e0e0e0"], // Colors for each part
        borderWidth: 1,
      },
    ],
  };

  // Tooltip customization to show how many are left
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.label === "Remaining") {
              return `${remaining} activities left`;
            } else {
              return `${completed} activities completed`;
            }
          },
        },
      },
      legend: {
        display: false,
      },
    },
    cutout: "70%", // To create a donut effect
  };

  return (
    <div className="pie-chart-container">
      <Pie data={data} options={options} />

    </div>
  );
};

export default PieChart;
