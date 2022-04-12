import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, Title, Legend, ArcElement } from "chart.js";

Chart.register(
  Title,
  Legend, 
  ArcElement);

const AppChart = ({ participations }) => {
  const [graph, setGraph] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    const labels = [];
    const data = [];

    participations?.forEach((row) => {
      labels.push(row.firstName +" "+ row.lastName);
      data.push(row.participation);
    });

    setGraph({
      labels: labels,
      data: data,
    });
  }, [participations]);

 
  return (
    <div style={{ height: "300px", width: "300px", margin: "0 auto" }}>
      <Doughnut
        data={{
          labels: graph.labels,
          datasets: [
            {
              data: graph.data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          legend: { display: true, position: "bottom" },
        }}
      />
    </div>
  );
};

export default AppChart;
