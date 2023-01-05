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

const labels1 = [
    'Engage with customers feelings and situation',
    ' Put in the customers shoes ',
    ' Greeting',
    ' Following accurate procedure',
    ' Ensure Functioning ',
    ' Brief and suggestions for the customer ',
    'Choose',
    'Engage with customers feelings and situation , Following accurate procedure',
    ' Understand and Paraphrase the concern',
    'Active discovery and research of the main issue ',
    'Giving complete resolution , Active discovery and research of the main issue',
];

const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

export function MeasureGrph() {

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis',
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
                
                beginAtZero: true,
                steps: 10,
                stepValue: 4,
                max: 100,
                includeBounds: true,
                ticks: {
                    callback: function (value, index, values) {
                        return value + '%';
                    },
                },

            },
        },
    };


    const data = useMemo(function () {
        return {
            labels,
            datasets: [
                {
                    type: 'line',
                    label: 'Line Dataset',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: false,
                    data: [70, 40, 36, 32, 28, 24, 20, 16, 12, 8, 4],
                    yAxisID: 'y1',
                },
                {
                    type: 'bar',
                    label: 'Bar Dataset',
                    backgroundColor: 'rgb(75, 192, 192)',
                    data: [44, 40, 36, 32, 28, 24, 20, 16, 12, 8, 4],
                    borderColor: 'white',
                    borderWidth: 2,
                    yAxisID: 'y',
                },
            ],
        };
    }, []);

    

    return (
        <>
            <Chart type="bar" data={data} options={options} />
            {labels1.map((label, index) => {
                return (
                    <div className="mt-4" key={index}>
                        <p>
                            {index + 1} - {label}
                        </p>
                    </div>
                );
            })}
        </>
    );
}
