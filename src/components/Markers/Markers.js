import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getMarkers, deleteMarker } from '../../api/marker';

const Markers = () => {
    const [markers, setMarkers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // dodane pole wyszukiwania
    const [filteredMarkers, setFilteredMarkers] = useState([]); // dodane pole na przefiltrowane markery

    const handleLoadMarkers = async () => {
        try {
            const markersData = await getMarkers();
            setMarkers(markersData);
            setFilteredMarkers(markersData); // ustawienie domyślnej listy markerów jako przefiltrowanej
        } catch (error) {
            console.error('Failed to load markers:', error);
        }
    };

    const handleDeleteMarker = async (lat, lng) => {
        try {
            await deleteMarker(lat, lng);
            handleLoadMarkers();
        } catch (error) {
            console.error('Failed to delete marker:', error);
        }
    };

    useEffect(() => {
        handleLoadMarkers();
    }, []);

    // Funkcja do filtrowania markerów
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = markers.filter((marker) =>
            marker.continent.toLowerCase().includes(value) ||
            marker.countryName.toLowerCase().includes(value) ||
            marker.city.toLowerCase().includes(value)
        );

        setFilteredMarkers(filtered);
    };

    return (
        <div className="container mx-auto mt-8 max-w-4xl">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Location Markers</h1>

            {/* Pole wyszukiwania */}
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by continent, country, or city..."
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />

            {filteredMarkers.length > 0 ? (
                filteredMarkers.map((marker, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-4 mb-4 rounded-lg shadow-md hover:shadow-lg bg-white border border-gray-200 transition-shadow duration-200"
                    >
                        <div className="flex items-center space-x-4 w-1/2 overflow-hidden">
                            <FontAwesomeIcon icon={faLocationDot} className="text-blue-500 text-xl" />
                            <div className="text-gray-800 truncate">
                                <p className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                                    {marker.continent}
                                </p>
                                <p className="text-sm text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">
                                    {marker.countryName}, {marker.city}
                                </p>
                            </div>
                        </div>
                        <div className="text-gray-600 text-sm w-1/4">
                            <p>Latitude: {marker.lat.toFixed(4)}</p>
                            <p>Longitude: {marker.lng.toFixed(4)}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteMarker(marker.lat, marker.lng)}
                            className="py-2 px-4 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none"
                        >
                            Delete
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-center">No markers available.</p>
            )}
        </div>
    );
};

export default Markers;
