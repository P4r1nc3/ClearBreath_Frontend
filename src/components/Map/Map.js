import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from "../../constants";
import './Map.css';
import { saveMarker, getMarkers, deleteMarker } from '../../api/marker';
import PollutionCharts from './PollutionCharts';

const Map = () => {
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [panelVisible, setPanelVisible] = useState(false);
    const [pollutionData, setPollutionData] = useState(null);

    // Refs for the charts
    const pm25ChartRef = useRef(null);
    const pm10ChartRef = useRef(null);
    const o3ChartRef = useRef(null);

    const handleLoadMarkers = async () => {
        const token = localStorage.getItem('token');
        try {
            const markers = await getMarkers(token);
            setMarkers(markers);
        } catch (error) {
            console.error('Failed to load markers:', error);
        }
    };

    const handleSaveMarker = async (lat, lng) => {
        const token = localStorage.getItem('token');
        try {
            const savedMarker = await saveMarker(token, lat, lng);
            console.log('Marker saved successfully:', savedMarker);
            setMarkers(prevMarkers => [...prevMarkers, savedMarker]);
        } catch (error) {
            console.error('Failed to save marker:', error.message);
        }
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
                handleSaveMarker(e.latlng.lat, e.latlng.lng);
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
                            <PollutionCharts
                                pollutionData={pollutionData}
                                refs={{ pm25ChartRef, pm10ChartRef, o3ChartRef }}
                            />
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
