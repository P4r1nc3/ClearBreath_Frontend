import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './Markers.css';

const Markers = () => {
    const [markers, setMarkers] = useState([]);

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

    useEffect(() => {
        loadMarkers();
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
                        <button className="btn btn-danger btn-sm delete-btn" onClick={() => deleteMarker(marker.lat, marker.lng)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Markers;
