// src/App.js
import React, { useState, useEffect } from 'react';
import WeatherApp from './components/WeatherApp';
import './App.css'; // Make sure your main CSS is imported

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Teriang, Pahang coordinates (as used before)
    const latitude = 3.089;
    const longitude = 102.327;
    const timezone = 'Asia/Kuala_Lumpur';

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Request current, hourly, and daily data
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,weathercode,windspeed_10m,precipitation_probability,dewpoint_2m,surface_pressure,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=${timezone}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [latitude, longitude, timezone]);

    if (loading) {
        return <div className="text-gray-700 text-lg mt-10">Loading weather data...</div>;
    }

    if (error) {
        return <div className="text-red-600 text-lg mt-10">Error: {error.message}</div>;
    }

    return (
        <div className="App">
            <WeatherApp weatherData={weatherData} />
        </div>
    );
}

export default App;