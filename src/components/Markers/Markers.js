import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getMarkers, deleteMarker } from '../../api/marker';

const Markers = () => {
    const [markers, setMarkers] = useState([]);

    const handleLoadMarkers = async () => {
        try {
            const markersData = await getMarkers();
            setMarkers(markersData);
        } catch (error) {
            console.error('Failed to load markers:', error);
        }
    };

    const handleDeleteMarker = async (lat, lng) => {
        try {
            await deleteMarker(lat, lng);
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
        <div className="container mx-auto mt-4 max-w-screen-lg">
            {markers.map((marker, index) => (
                <div key={index} className="marker-item grid grid-cols-5 items-center p-4 mb-4 rounded shadow-md hover:shadow-lg bg-gray-100">
                    <div className="marker-icon">
                        <FontAwesomeIcon icon={faLocationDot} className="text-blue-500" />
                        <div className="marker-text">{marker.continent}</div>
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
