// src/components/WeatherApp.js
import React, { useState } from 'react';
import CurrentWeatherCard from './CurrentWeatherCard';
import ForecastTabs from './ForecastTabs';
// RENAMED IMPORT: Use HourlyTempSection instead of HourlyForecast
import HourlyTempSection from './HourlyTempSection'; // Corrected import based on your rename
import DailyForecast from './DailyForecast';
import VisibilitySection from './VisibilitySection'; // Ensure correct path if needed
import CatAnimation from './CatAnimation';

// NEW IMPORTS for the new sections
import PrecipitationSection from './PrecipitationSection';
import WindSection from './WindSection';
import UVIndexSection from './UVIndexSection';

// WeatherApp now receives 'weatherData' object, 'location' string,
// and 'theme', 'setTheme' for dark/light mode toggle.
function WeatherApp({ weatherData, location, theme, setTheme }) {
    if (!weatherData || !weatherData.current_weather || !weatherData.hourly || !weatherData.daily) {
        return <div className="text-center p-8 text-gray-600 dark:text-gray-400">Weather data is not available.</div>;
    }

    const [temperatureUnit, setTemperatureUnit] = useState('celsius');
    // State to manage the active forecast tab
    const [activeForecastTab, setActiveForecastTab] = useState('temperature'); // Default to temperature tab

    const handleToggleTemperatureUnit = (unit) => {
        setTemperatureUnit(unit);
    };

    const current = weatherData.current_weather;
    const hourly = weatherData.hourly;
    const daily = weatherData.daily;

    const displayLocation = {
        name: location,
        time: new Date(current.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        description: 'Mostly cloudy'
    };

    const displayUnits = {
        ...weatherData.current_weather_units,
        temperature: temperatureUnit,
    };

    // Function to conditionally render the active forecast content based on tab selection
    const renderForecastContent = () => {
        switch (activeForecastTab) {
            case 'temperature':
                // Use HourlyTempSection for the temperature tab
                return <HourlyTempSection hourly={hourly} units={displayUnits} />;
            case 'precipitation':
                return <PrecipitationSection hourly={hourly} units={displayUnits} />;
            case 'wind':
                return <WindSection hourly={hourly} units={displayUnits} />;
            case 'uv_index':
                return <UVIndexSection daily={daily} units={displayUnits} />;
            default:
                // Default to HourlyTempSection
                return <HourlyTempSection hourly={hourly} units={displayUnits} />;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 w-full">
            {/* Top Row: Current Weather Card */}
            <CurrentWeatherCard
                current={current}
                hourly={hourly}
                location={displayLocation}
                units={displayUnits}
                toggleTemperatureUnit={handleToggleTemperatureUnit}
            />

            {/* Tabs & Forecast Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <ForecastTabs activeTab={activeForecastTab} onTabChange={setActiveForecastTab} />
                    {/* Render active forecast content based on tab selection */}
                    {renderForecastContent()}
                </div>
                <div className="flex flex-col gap-6">
                    <CatAnimation currentWeatherCode={current.weathercode} />
                    {/* Visibility Section */}
                    {hourly && hourly.visibility && (
                        <VisibilitySection
                            hourly={hourly}
                            units={displayUnits}
                        />
                    )}
                </div>
            </div>

            {/* Daily Forecast */}
            <DailyForecast
                daily={daily}
                units={displayUnits}
            />
        </div>
    );
}

export default WeatherApp;
