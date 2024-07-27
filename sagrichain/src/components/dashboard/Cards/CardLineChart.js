import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CardLineChart() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const config = {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: [65, 78, 66, 44, 56, 67, 75],
              fill: false,
            },
            {
              label: new Date().getFullYear() - 1,
              fill: false,
              backgroundColor: "#fff",
              borderColor: "#fff",
              data: [40, 68, 86, 74, 56, 60, 87],
            },
          ],
        },
        options: {
          // Your options here
        },
      };

      const ctx = chartRef.current.getContext("2d");

      // Check if there's an existing chart instance and destroy it
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance
      chartInstanceRef.current = new Chart(ctx, config);
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Sales value</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
