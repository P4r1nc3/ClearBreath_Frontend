import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getMarkers, saveMarker, deleteMarker } from '../../api/marker';
import axios from 'axios';
import debounce from 'lodash.debounce';

const Markers = () => {
    const [markers, setMarkers] = useState([]);
    const [filteredMarkers, setFilteredMarkers] = useState([]);
    const [newAddress, setNewAddress] = useState('');
    const [addressSuggestions, setAddressSuggestions] = useState([]); // nowe pole na sugestie adresów

    const handleLoadMarkers = async () => {
        try {
            const markersData = await getMarkers();
            setMarkers(markersData);
            setFilteredMarkers(markersData);
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

    const handleAddMarkerByAddress = async () => {
        if (!newAddress) {
            alert("Please enter an address.");
            return;
        }

        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(newAddress)}&format=json`
            );

            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                const savedMarker = await saveMarker(parseFloat(lat), parseFloat(lon));
                setMarkers(prevMarkers => [...prevMarkers, savedMarker]);
                setFilteredMarkers(prevMarkers => [...prevMarkers, savedMarker]);
                alert("Marker added successfully!");
            } else {
                alert("Address not found. Please try a different address.");
            }
        } catch (error) {
            console.error('Error finding address:', error);
            alert('Error finding address. Please try again.');
        }
    };

    const fetchAddressSuggestions = async (query) => {
        if (!query) {
            setAddressSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1`
            );
            setAddressSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
        }
    };

    // Debounce fetching suggestions
    const debouncedFetchAddressSuggestions = useCallback(debounce(fetchAddressSuggestions, 300), []);

    const handleAddressInputChange = (event) => {
        const query = event.target.value;
        setNewAddress(query);
        debouncedFetchAddressSuggestions(query);  // debounced call to fetch suggestions
    };

    const handleSuggestionClick = async (suggestion) => {
        const lat = parseFloat(suggestion.lat);
        const lon = parseFloat(suggestion.lon);

        try {
            const savedMarker = await saveMarker(lat, lon);
            setMarkers(prevMarkers => [...prevMarkers, savedMarker]);
            setFilteredMarkers(prevMarkers => [...prevMarkers, savedMarker]);
            alert("Marker added successfully!");
        } catch (error) {
            console.error('Failed to add marker:', error);
        }

        setNewAddress('');
        setAddressSuggestions([]);
    };

    return (
        <div className="container mx-auto mt-8 max-w-4xl">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Location Markers</h1>

            <div className="flex items-center mb-4 relative">
                <input
                    type="text"
                    value={newAddress}
                    onChange={handleAddressInputChange}
                    placeholder="Enter an address to add a marker"
                    className="w-full p-2 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />

                {addressSuggestions.length > 0 && (
                    <ul className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                        {addressSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="p-2 cursor-pointer hover:bg-blue-100"
                            >
                                {suggestion.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

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
