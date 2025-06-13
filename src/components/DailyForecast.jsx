// src/components/DailyForecast.js
import React from 'react';
import DailyForecastCard from './DailyForecastCard';

function DailyForecast({ daily }) {
    const nextSixDays = daily.time.slice(1, 7); // Skip today (index 0)

    return (
        <div className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {nextSixDays.map((dateStr, index) => {
                    const date = new Date(dateStr);
                    return (
                        <DailyForecastCard
                            key={dateStr}
                            day={date.toLocaleDateString('en-US', { weekday: 'short' })}
                            iconCode={daily.weathercode[index + 1]} // +1 because we sliced, but daily data still starts at index 0 for today
                            maxTemp={daily.temperature_2m_max[index + 1]}
                            minTemp={daily.temperature_2m_min[index + 1]}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default DailyForecast;