import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './Markers.css';
import { getMarkers, deleteMarker } from '../../api/marker';

const Markers = () => {
    const [markers, setMarkers] = useState([]);
    const token = localStorage.getItem('token');

    const handleLoadMarkers = async () => {
        try {
            const markersData = await getMarkers(token);
            setMarkers(markersData);
        } catch (error) {
            console.error('Failed to load markers:', error);
        }
    };

    const handleDeleteMarker = async (lat, lng) => {
        try {
            await deleteMarker(token, lat, lng);
            console.log('Marker deleted successfully');
            handleLoadMarkers();
        } catch (error) {
            console.error('Failed to delete marker:', error);
        }
    };

    useEffect(() => {
        handleLoadMarkers();
    }, []);

    return (
        <div className="container mt-4">
            {markers.map((marker, index) => (
                <div key={index} className="marker-item">
                    <div className="marker-icon">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>  {marker.continent}</span>
                    </div>
                    <div className="marker-text">{marker.countryName}</div>
                    <div className="marker-text">{marker.city}</div>
                    <div className="marker-text">Lat: {marker.lat.toFixed(4)}, Lng: {marker.lng.toFixed(4)}</div>
                    <div>
                        <button className="btn btn-danger btn-sm delete-btn" onClick={() => handleDeleteMarker(marker.lat, marker.lng)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Markers;
