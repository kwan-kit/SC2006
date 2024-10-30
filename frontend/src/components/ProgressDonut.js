import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressDonut = ({ value, label }) => {
  const data = {
    labels: [label, ""],
    datasets: [
      {
        data: [value, 100 - value], // value for the donut
        backgroundColor: ["#007aff", "#e0e0e0"], // Colors for progress and remaining
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "80%", // This creates the donut hole
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // Disable tooltips for clean design
      },
    },
  };

  return (
    <div className="progress-donut">
      <Doughnut data={data} options={options} />
      <div className="donut-center">
        <span>{value}</span> {/* Centered value */}
      </div>
    </div>
  );
};

export default ProgressDonut;
