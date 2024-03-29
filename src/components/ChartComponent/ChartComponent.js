import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const ChartComponent = ({ coinId, timeRange }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=${timeRange}&interval=daily`
        );
        setChartData(response.data.prices);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [coinId, timeRange]);

  const chartLabels = chartData.map((entry) =>
    new Date(entry[0]).toLocaleDateString()
  );
  const chartPrices = chartData.map((entry) => entry[1]);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Price",
        data: chartPrices,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div>
      <h3 style={{ fontFamily: "Fahkwang" }}>Price Chart</h3>
      <Line data={data} />
    </div>
  );
};

export default ChartComponent;
