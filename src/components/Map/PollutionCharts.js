import React from 'react';
import Chart from 'chart.js/auto';

const PollutionCharts = ({ pollutionData, refs }) => {
    React.useEffect(() => {
        if (!pollutionData) return;

        const { pm25, pm10, o3 } = pollutionData.data.forecast.daily;

        const createOrUpdatePollutionChart = (chartRef, data, label) => {
            if (chartRef.current && data) {
                const chartContext = chartRef.current.getContext('2d');
                new Chart(chartContext, {
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

        createOrUpdatePollutionChart(refs.pm25ChartRef, pm25, 'PM 2.5 Pollution Data');
        createOrUpdatePollutionChart(refs.pm10ChartRef, pm10, 'PM 10 Pollution Data');
        createOrUpdatePollutionChart(refs.o3ChartRef, o3, 'O3 Pollution Data');
    }, [pollutionData, refs]);

    return (
        <>
            <canvas ref={refs.pm25ChartRef}></canvas>
            <canvas ref={refs.pm10ChartRef}></canvas>
            <canvas ref={refs.o3ChartRef}></canvas>
        </>
    );
};

export default PollutionCharts;
