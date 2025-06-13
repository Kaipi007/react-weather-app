
import React from 'react';
import windIconImage from '../img/WindSection_wind.png'; 

function WindSection({ hourly, units }) {
    if (
        !hourly ||
        !hourly.time ||
        !hourly.windspeed_10m ||
        hourly.windspeed_10m.length === 0
    ) {
        console.log("WindSection: Critical hourly data for wind speed is missing.", {
            hourlyExists: !!hourly,
            timeExists: !!(hourly && hourly.time),
            windSpeedExists: !!(hourly && hourly.windspeed_10m),
            windSpeedLength: (hourly && hourly.windspeed_10m) ? hourly.windspeed_10m.length : 0
        });
        return <div className="text-center p-4 text-gray-500">No wind speed data available.</div>;
    }

    const now = new Date();
    const currentHourIndex = hourly.time.findIndex(time => {
        const apiTime = new Date(time);
        return apiTime.getHours() === now.getHours() && apiTime.getDate() === now.getDate();
    });

    const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;
    const numberOfHoursToShow = 8;
    const endIndex = Math.min(startIndex + numberOfHoursToShow, hourly.time.length);

    const displayHours = hourly.time.slice(startIndex, endIndex);
    const displayWindSpeeds = hourly.windspeed_10m.slice(startIndex, endIndex);

    // Get wind directions, default to an array of 0s if missing to prevent errors
    const displayWindDirections = (hourly.winddirection_10m && hourly.winddirection_10m.length > 0)
        ? hourly.winddirection_10m.slice(startIndex, endIndex)
        : new Array(displayHours.length).fill(0); // Fill with 0 for 'N' if direction is missing

    const windSpeedUnit = units.windspeed_10m_unit || 'km/h'; // Default to km/h

    // Helper to convert degrees to cardinal direction (simplified)
    const getCardinalDirection = (degree) => {
        if (degree === null || degree === undefined) return ''; // Handle null/undefined direction
        if (degree > 337.5 || degree <= 22.5) return 'N';
        if (degree > 22.5 && degree <= 67.5) return 'NE';
        if (degree > 67.5 && degree <= 112.5) return 'E';
        if (degree > 112.5 && degree <= 157.5) return 'SE';
        if (degree > 157.5 && degree <= 202.5) return 'S';
        if (degree > 202.5 && degree <= 247.5) return 'SW';
        if (degree > 247.5 && degree <= 292.5) return 'W';
        if (degree > 292.5 && degree <= 337.5) return 'NW';
        return '';
    };

    return (
        <div className="bg-white dark:bg-gray-600 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 dark:text-gray-300">Hourly Wind Details</h3>
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4 text-center">
                {displayHours.map((timeString, index) => {
                    const speed = displayWindSpeeds[index];
                    const direction = displayWindDirections[index] !== undefined && displayWindDirections[index] !== null
                                      ? displayWindDirections[index] : 0;

                    const hour = new Date(timeString).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });

                    return (
                        <div key={timeString} className="flex flex-col items-center p-2 rounded-md">
                             <p className="flex justify-between px-2 mt-2 text-md font-bold mb-2">{speed !== undefined ? speed.toFixed(0) : 'N/A'} {windSpeedUnit}</p>
                            <img
                                src={windIconImage} 
                                alt="Wind Direction"
                                className="w-8 h-8 mb-1" 
                                style={{ transform: `rotate(${direction}deg)` }} // Rotate the image based on wind direction
                            />
                           
                            <p className="text-xs text-gray-600">
                                {getCardinalDirection(direction)}
                            </p>
                            <p className="text-sm text-gray-500 mb-1 dark:text-blue-300">{hour}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default WindSection;
