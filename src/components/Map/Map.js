import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from "../../constants";
import './Map.css';

const Map = () => {
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [panelVisible, setPanelVisible] = useState(false);

    const loadMarkers = () => {
        const token = localStorage.getItem('token');
        const urlGetMarker = 'http://localhost:8080/markers';

        fetch(urlGetMarker, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(setMarkers)
            .catch(error => {
                console.error('Failed to load markers:', error)
            });
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

    const deleteMarker = (lat, lng) => {
        const token = localStorage.getItem('token');
        const urlDeleteMarker = `http://localhost:8080/markers/lat/${lat}/lng/${lng}`;

        fetch(urlDeleteMarker, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.status === 204) {
                    console.log('Marker deleted successfully');
                    loadMarkers();
                } else {
                    console.error('Failed to delete marker');
                    response.json().then(data => console.error(data.message));
                }
            })
            .catch(error => {
                console.error('Network error:', error);
            });
    };

    const MapEvents = () => {
        useMapEvents({
            click: (e) => {
                saveMarker(e.latlng.lat, e.latlng.lng);
            },
        });
        return null;
    };

    useEffect(() => {
        loadMarkers();
    }, []);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
        setPanelVisible(true);
    };

    const closePanel = () => {
        setPanelVisible(false);
    };

    return (
        <>
            <MapContainer center={[51.505, -0.09]} zoom={6} style={{ height: 'calc(100vh - 55px)', width: '100%' }} zoomControl={false}>
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
                        <button className="close-btn" onClick={closePanel}>&times;</button>
                        <h3>Marker Info</h3>
                        <p>Kontynent: {selectedMarker.continent}</p>
                        <p>Miasto: {selectedMarker.city}</p>
                        <p>Kraj: {selectedMarker.countryName}</p>
                        <p>Odległość do stacji: {selectedMarker.distance.toFixed(2)} km</p>
                        <button onClick={() => { deleteMarker(selectedMarker.lat, selectedMarker.lng); closePanel(); }}>Delete Marker</button>
                    </>
                )}
            </div>
        </>
    );
};

export default Map;
