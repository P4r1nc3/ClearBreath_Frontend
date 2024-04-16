import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from "../../constants";
import './Map.css';
import { saveMarker, getMarkers, deleteMarker } from '../../api/marker';
import { fetchPollutionData } from '../../api/pollution';
import PollutionCharts from './PollutionCharts';
import { toast, ToastContainer } from 'react-toastify';

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
        try {
            const markers = await getMarkers();
            setMarkers(markers);
        } catch (error) {
            console.error('Failed to load markers:', error);
        }
    };

    const handleSaveMarker = async (lat, lng) => {
        try {
            const savedMarker = await saveMarker(lat, lng);
            console.log('Marker saved successfully:', savedMarker);
            setMarkers(prevMarkers => [...prevMarkers, savedMarker]);
            toast.success('Marker added successfully!');
        } catch (error) {
            console.error('Failed to save marker:', error.message);
            toast.error('Failed to add marker. Please try again.');
        }
    };

    const handleDeleteMarker = async (lat, lng) => {
        try {
            await deleteMarker(lat, lng);
            console.log('Marker deleted successfully');
            handleLoadMarkers();
            toast.info('Marker deleted successfully.');
        } catch (error) {
            console.error('Failed to delete marker:', error.message);
            toast.error('Failed to delete marker. Please try again.');
        }
    };

    const MapEvents = () => {
        useMapEvents({
            click: (e) => {
                handleSaveMarker(e.latlng.lat, e.latlng.lng);
            },
        });
        return null;
    };

    const handleMarkerClick = async (marker) => {
        setSelectedMarker(marker);
        try {
            const data = await fetchPollutionData(marker.lat, marker.lng);
            setPollutionData(data);
            setPanelVisible(true);
        } catch (error) {
            console.error('Error fetching pollution data:', error);
        }
    };

    const closePanel = () => {
        setPanelVisible(false);
    };

    useEffect(() => {
        handleLoadMarkers();
    }, []);

    return (
        <>
            <MapContainer center={[51.505, -0.09]} zoom={6} style={{ height: 'calc(100vh - 52px)', width: '100%' }} zoomControl={false}>
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
            <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover style={{ top: '50px' }} />
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
                            <PollutionCharts pollutionData={pollutionData} refs={{ pm25ChartRef, pm10ChartRef, o3ChartRef }}/>
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
