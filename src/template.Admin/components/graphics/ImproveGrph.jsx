import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);





export function ImproveGrph() {

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const subLabels = {
    
  }


  const options = {
    layout: {
      padding: {
        bottom: 20,
      }
    },
    fill : true, //! fill the area under the line
    responsive: true,
    scales: {
      y: {
        min: 0,  //! minimum value
        max: 5,  //! maximum value
      },
    },  
    plugins: {
      /* legend: {
          position: 'top',
      },
      title: {
        display: true,
        text: 'Chart Improve',
      },
      subLabels */
    },
  };




  const data = useMemo(function() {
    return {
        datasets: [
          {
            label: 'Dataset 1',
            yAxisID: 'y',
            fill: true,
            backgroundColor: 'rgba(53, 162, 235, 0.0)',
            borderColor: 'rgb(53, 162, 235)',
            pointBackgroundColor: 'rgb(255, 0, 120)',
            pointBorderColor: 'rgb(255, 0, 120)',
            tension: 0.1,
/*             categoryPercentage: 1,
            barPercentage: 1,
            stack : 'Stack 0', */
            data: [3.5, 2.5, 3.5, 4.5, 3.5, 2.5, 3.5],

          },
        ],
        labels,
    };
  }, []);

  return <Line options={options} data={data} />;
}
