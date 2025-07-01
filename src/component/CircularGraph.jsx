"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CircularGraph({ value, label }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [value, 100 - value], // Filled vs Empty
            backgroundColor: ["#0d6efd", "#f9f9f9"], // Red + Gray
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: "90%", // Adjusts the inner space
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => chart.destroy();
  }, [value]);

  return (
    <div className="pie-graph text-center">
      <div className="graph-outer">
        <canvas ref={chartRef} width="125" height="125"></canvas>
        <div className="inner-text count-box">
          <span className="count-text">{value}</span>%
        </div>
      </div>
      <h6 className="title">{label}</h6>
    </div>
  );
}
