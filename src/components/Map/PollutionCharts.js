import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const PollutionCharts = ({ pollutionData }) => {
    // Refs for the charts
    const pm25ChartRef = useRef(null);
    const pm10ChartRef = useRef(null);
    const o3ChartRef = useRef(null);

    // Instances of the charts
    const pm25ChartInstance = useRef(null);
    const pm10ChartInstance = useRef(null);
    const o3ChartInstance = useRef(null);

    // States for tooltip visibility
    const [showTooltip, setShowTooltip] = useState({
        pm25: false,
        pm10: false,
        o3: false
    });

    const getAQIColor = (value) => {
        if (value <= 33) return 'rgba(173, 216, 230, 0.7)'; // Very Good (Pastelowy błękit)
        if (value <= 66) return 'rgba(144, 238, 144, 0.7)'; // Good (Pastelowa zieleń)
        if (value <= 99) return 'rgba(255, 255, 200, 0.7)'; // Fair (Pastelowy żółty)
        if (value <= 149) return 'rgba(255, 204, 153, 0.7)'; // Poor (Pastelowy pomarańczowy)
        if (value <= 200) return 'rgba(216, 191, 216, 0.7)'; // Very Poor (Pastelowy fiolet)
        return 'rgba(255, 182, 193, 0.7)'; // Hazardous (Pastelowy różowy)
    };


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
                        backgroundColor: data.map(day => getAQIColor(day.avg)),
                        borderColor: data.map(day => getAQIColor(day.avg).replace('0.7', '1')),
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

    // Tooltip content
    const tooltips = {
        pm25: 'PM 2.5 refers to fine particulate matter with a diameter of less than 2.5 micrometers. These particles can penetrate the respiratory system and are harmful to health.',
        pm10: 'PM 10 refers to particulate matter with a diameter of 10 micrometers or less. These particles can cause respiratory issues.',
        o3: 'O3 (Ozone) is a gas composed of three oxygen atoms. Ground-level ozone can cause various health problems, especially for people with respiratory conditions.'
    };

    // Render chart titles with tooltips
    const renderChartTitle = (title, tooltipKey) => (
        <div className="relative text-center mb-4">
            <h3 className="inline-block">{title}</h3>
            <span
                className="ml-2 text-gray-400 cursor-pointer"
                onMouseEnter={() => setShowTooltip(prev => ({ ...prev, [tooltipKey]: true }))}
                onMouseLeave={() => setShowTooltip(prev => ({ ...prev, [tooltipKey]: false }))}
            >
                <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
            {showTooltip[tooltipKey] && (
                <div
                    className="absolute bg-gray-700 text-white p-2 rounded-lg w-64 text-sm shadow-lg transform -translate-x-1/2 left-1/2 top-full mt-2 z-10"
                >
                    {tooltips[tooltipKey]}
                </div>
            )}
        </div>
    );

    return (
        <>
            <div>
                {renderChartTitle('PM 2.5 Pollution Data', 'pm25')}
                <canvas ref={pm25ChartRef}></canvas>
            </div>

            <div>
                {renderChartTitle('PM 10 Pollution Data', 'pm10')}
                <canvas ref={pm10ChartRef}></canvas>
            </div>

            <div>
                {renderChartTitle('O3 Pollution Data', 'o3')}
                <canvas ref={o3ChartRef}></canvas>
            </div>
        </>
    );
};

export default PollutionCharts;
