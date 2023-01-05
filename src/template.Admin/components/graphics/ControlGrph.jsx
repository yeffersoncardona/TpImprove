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


const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

export function ControlGrph() {

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
                max: 0.5,
                includeBounds: true,
                /* ticks: {
                    callback: function (value, index, values) {
                        return value + '%';
                    },
                }, */

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
                    data: [ 0.5, 0,  0.1, 0.15, 0.05, 0.25,  0.35, 0.2,0.4, 0.45,0.3 ],
                    yAxisID: 'y1',
                },
                {
                    type: 'bar',
                    label: 'Bar Dataset',
                    backgroundColor: 'rgb(75, 192, 192)',
                    data: [1, 1.5, 2.3, 3, 3.2, 3.5, 4, 4.2, 4.5, 4.8, 5],
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
        </>
    );
}
