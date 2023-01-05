import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels1 = ['Engage with customers feelings and situation', ' Put in the customers shoes ', ' Greeting', ' Following accurate procedure', ' Ensure Functioning ', ' Brief and suggestions for the customer ', 'Choose', 'Engage with customers feelings and situation , Following accurate procedure', ' Understand and Paraphrase the concern', 'Active discovery and research of the main issue ', 'Giving complete resolution , Active discovery and research of the main issue'];

const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];


export function MeasureGrph() {
    
    const data = useMemo(function() {
        return {
            labels,
            datasets: [
              {
                type: 'line',
                label: 'Dataset 1',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                /* data en percent */
                data: [10, 15, 8, 5, 4, 50, 30, 20, 10, 5, 2]},
              {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: 'rgb(75, 192, 192)',
                data: [45, 16, 14, 4, 3, 2, 2, 1, 1 , 1, 1],
                borderColor: 'white',
                borderWidth: 2,
              }
              
            ],
        };
      }, []);


  return <>
    <Chart type='bar' data={data} />
    {
        labels1.map((label, index) => {
            return <div className='mt-4' key={index}><p>{index} - {label}</p></div>
        })
    }
  </>;
}
