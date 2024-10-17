// src/Map.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import axios from 'axios';

const Map = ({ userLocation, distance }) => {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/routes', {
                    userLocation,
                    distance
                });
                setRoutes(response.data);
            } catch (error) {
                console.error('Error fetching routes:', error);
            }
        };

        fetchRoutes();
    }, [userLocation, distance]);

    return (
        <MapContainer center={userLocation} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {routes.map((route, index) => (
                <Polyline key={index} positions={route} color="blue" />
            ))}
        </MapContainer>
    );
};

export default Map;
