
import React from 'react';
import WeatherIcon from './WeatherIcon';

function DailyForecastCard({ day, iconCode, maxTemp, minTemp }) {
    return (
        <div className="flex flex-col items-center bg-gray-50 rounded-lg p-3 text-gray-700 dark:bg-gray-600">
            <p className="font-semibold mb-1 dark:text-blue-300">{day}</p>
            <WeatherIcon code={iconCode} className="w-12 h-12 mb-1" />
            <p className="text-lg font-bold dark:text-gray-300">Max: {Math.round(maxTemp)}°</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Min:{Math.round(minTemp)}°</p>
        </div>
    );
}

export default DailyForecastCard;