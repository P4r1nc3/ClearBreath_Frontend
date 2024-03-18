import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from "../../constants";
import Chart from 'chart.js/auto';
import './Map.css';
import { saveMarker, getMarkers, deleteMarker } from '../../api/marker';

const Map = () => {
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [panelVisible, setPanelVisible] = useState(false);
    const [pollutionData, setPollutionData] = useState(null);

    // Refs for the charts and their instances
    const pm25ChartRef = useRef(null);
    const pm10ChartRef = useRef(null);
    const o3ChartRef = useRef(null);
    const pm25ChartInstance = useRef(null);
    const pm10ChartInstance = useRef(null);
    const o3ChartInstance = useRef(null);

    const handleLoadMarkers = async () => {
        const token = localStorage.getItem('token');
        try {
            const markers = await getMarkers(token);
            setMarkers(markers);
        } catch (error) {
            console.error('Failed to load markers:', error);
        }
    };

    const saveMarker = (lat, lng) => {
        const token = localStorage.getItem('token');
        const urlSaveMarker = `http://localhost:8080/markers/lat/${lat}/lng/${lng}`;

        fetch(urlSaveMarker, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log('Marker saved successfully:', data);
                    setMarkers(prevMarkers => [...prevMarkers, data]);
                } else {
                    console.error('Failed to save marker:', data.message);
                }
            })
            .catch(error => {
                console.error('Failed to save marker:', error);
            });
    };

    const handleDeleteMarker = async (lat, lng) => {
        const token = localStorage.getItem('token');
        try {
            await deleteMarker(token, lat, lng);
            console.log('Marker deleted successfully');
            handleLoadMarkers();
        } catch (error) {
            console.error('Failed to delete marker:', error.message);
        }
    };

    const fetchPollutionData = (lat, lng) => {
        const urlPollution = `http://localhost:8080/pollution/lat/${lat}/lng/${lng}`;
        fetch(urlPollution)
            .then(response => response.json())
            .then(data => {
                setPollutionData(data);
            })
            .catch(error => console.error('Error fetching pollution data:', error));
    };

    const MapEvents = () => {
        useMapEvents({
            click: (e) => {
                saveMarker(e.latlng.lat, e.latlng.lng);
            },
        });
        return null;
    };

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
        fetchPollutionData(marker.lat, marker.lng);
        setPanelVisible(true);
    };

    const closePanel = () => {
        setPanelVisible(false);
    };

    const createOrUpdatePollutionChart = (chartRef, chartInstanceRef, label, data) => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const chartContext = chartRef.getContext('2d');
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
            createOrUpdatePollutionChart(pm25ChartRef.current, pm25ChartInstance, 'PM 2.5 Pollution Data', pollutionData.data.forecast.daily.pm25);
            createOrUpdatePollutionChart(pm10ChartRef.current, pm10ChartInstance, 'PM 10 Pollution Data', pollutionData.data.forecast.daily.pm10);
            createOrUpdatePollutionChart(o3ChartRef.current, o3ChartInstance, 'O3 Pollution Data', pollutionData.data.forecast.daily.o3);
        }
    }, [pollutionData]);

    useEffect(() => {
        handleLoadMarkers();
    }, []);

    return (
        <>
            <MapContainer center={[51.505, -0.09]} zoom={6} style={{ height: 'calc(100vh - 56px)', width: '100%' }} zoomControl={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; ClearBreath'
                />
                {markers.map((marker, index) => (
                    <Marker key={index} position={[marker.lat, marker.lng]} icon={icon} eventHandlers={{ click: () => handleMarkerClick(marker) }}>
                    </Marker>
                ))}
                <ZoomControl position="bottomright" />
                <MapEvents />
            </MapContainer>
            <div className={`side-panel ${panelVisible ? 'open' : ''}`}>
                {selectedMarker && (
                    <>
                        <div className="marker-info-header">
                            <button className="close-btn" onClick={closePanel}>&times;</button>
                            <h3>Marker Info</h3>
                            <p>Kontynent: {selectedMarker.continent}</p>
                            <p>Miasto: {selectedMarker.city}</p>
                            <p>Kraj: {selectedMarker.countryName}</p>
                            <p>Odległość do stacji: {selectedMarker.distance.toFixed(2)} km</p>
                        </div>
                        <div className="marker-info-content">
                            <canvas ref={pm25ChartRef}></canvas>
                            <canvas ref={pm10ChartRef}></canvas>
                            <canvas ref={o3ChartRef}></canvas>
                        </div>
                        <div className="marker-info-footer">
                            <button className="delete-btn" onClick={() => { handleDeleteMarker(selectedMarker.lat, selectedMarker.lng); closePanel(); }}>Delete Marker</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Map;
