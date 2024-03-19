import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PollutionCharts = ({ pollutionData }) => {
    // Refs for the charts
    const pm25ChartRef = useRef(null);
    const pm10ChartRef = useRef(null);
    const o3ChartRef = useRef(null);

    // Instances of the charts
    const pm25ChartInstance = useRef(null);
    const pm10ChartInstance = useRef(null);
    const o3ChartInstance = useRef(null);

    const createOrUpdatePollutionChart = (chartRef, chartInstanceRef, label, data) => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const chartContext = chartRef.current.getContext('2d');
        if (chartContext) {
            chartInstanceRef.current = new Chart(chartContext, {
                type: 'bar',
                data: {
                    labels: data.map(day => day.day),
                    datasets: [{
                        label,
                        data: data.map(day => day.avg),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    };

    useEffect(() => {
        if (pollutionData) {
            createOrUpdatePollutionChart(pm25ChartRef, pm25ChartInstance, 'PM 2.5 Pollution Data', pollutionData.data.forecast.daily.pm25);
            createOrUpdatePollutionChart(pm10ChartRef, pm10ChartInstance, 'PM 10 Pollution Data', pollutionData.data.forecast.daily.pm10);
            createOrUpdatePollutionChart(o3ChartRef, o3ChartInstance, 'O3 Pollution Data', pollutionData.data.forecast.daily.o3);
        }
    }, [pollutionData]);

    return (
        <>
            <canvas ref={pm25ChartRef}></canvas>
            <canvas ref={pm10ChartRef}></canvas>
            <canvas ref={o3ChartRef}></canvas>
        </>
    );
};

export default PollutionCharts;
