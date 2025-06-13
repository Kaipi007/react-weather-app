
import React, { useState, useEffect } from 'react';

function HourlyForecast({ hourly }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60 * 1000); 

        return () => clearInterval(intervalId);
    }, []);

    const currentTimestampMs = currentTime.getTime();
    const currentDayStartMs = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()).getTime();

    let startIndex = hourly.time.findIndex(time => {
        const dateObj = new Date(time);
        return dateObj.getTime() >= currentTimestampMs && dateObj.getTime() >= currentDayStartMs;
    });

    if (startIndex === -1) {
        startIndex = hourly.time.findIndex(time => {
            const dateObj = new Date(time);
            return dateObj.getHours() === currentTime.getHours() && dateObj.getDate() === currentTime.getDate();
        });
    }

    const actualStartIndex = startIndex !== -1 ? startIndex : 0;

    const numberOfPoints = 8;
    const relevantHours = hourly.time.slice(actualStartIndex, actualStartIndex + numberOfPoints);
    const relevantTemps = hourly.temperature_2m.slice(actualStartIndex, actualStartIndex + numberOfPoints);
    // relevantWeatherCodes is no longer needed if icons are removed from here
    // const relevantWeatherCodes = hourly.weathercode.slice(actualStartIndex, actualActualIndex + numberOfPoints);

    if (relevantHours.length === 0 || relevantTemps.length === 0) {
        return <div className="mt-4 text-gray-700 text-center">No hourly data available for the current time.</div>;
    }

    const maxTemp = Math.max(...relevantTemps);
    const minTemp = Math.min(...relevantTemps);

    const svgHeight = 100;
    const padding = 10;
    const availableHeight = svgHeight - 2 * padding;

    const getY = (temp) => {
        if (maxTemp === minTemp) return svgHeight / 2;
        return svgHeight - padding - ((temp - minTemp) / (maxTemp - minTemp)) * availableHeight;
    };

    let pathD = "";
    const pointsArray = relevantTemps.map((temp, i) => {
        const x = (i / (numberOfPoints - 1)) * svgHeight;
        const y = getY(temp);
        return { x, y, temp };
    });

    if (pointsArray.length > 0) {
        pathD = `M${pointsArray[0].x},${pointsArray[0].y}`;
        for (let i = 0; i < pointsArray.length; i++) {
            const currentPoint = pointsArray[i];
            const nextPoint = pointsArray[i + 1];

            if (nextPoint) {
                const controlX1 = currentPoint.x + (nextPoint.x - currentPoint.x) / 2;
                const controlY1 = currentPoint.y;
                const controlX2 = currentPoint.x + (nextPoint.x - currentPoint.x) / 2;
                const controlY2 = nextPoint.y;
                pathD += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${nextPoint.x},${nextPoint.y}`;
            }
        }
        const lastPoint = pointsArray[pointsArray.length - 1];
        const firstPoint = pointsArray[0];
        pathD += ` L${lastPoint.x},${svgHeight} L${firstPoint.x},${svgHeight} Z`;
    }

    return (
        <div className="bg-white dark:bg-gray-600 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 dark:text-gray-300">Hourly Temperature Details</h3>
            <div className="flex justify-between px-2 text-md font-bold mb-2">
                {relevantTemps.map((temp, index) => (
                    <span key={index} className="w-1/8 text-center">
                        {Math.round(temp)}°
                    </span>
                ))}
            </div>

            {/* Simple placeholder for the graph shape */}
            <div className="relative w-full h-24 bg-gray-100 rounded-lg p-4 mt-4 overflow-hidden">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Filled area */}
                    <path
                        d={pathD}
                        fill="#A5D8FF" // Light blue color for the filled area
                        stroke="none"
                    />
                    {/* The smooth line */}
                    <path
                        d={pathD.substring(0, pathD.lastIndexOf("L"))} // Only the curve part
                        fill="none"
                        stroke="#60A5FA"
                        strokeWidth="2"
                    />
                    {/* Yellow dot - at the current point, for demonstration, let's say the first */}
                    {pointsArray.length > 0 && (
                        <circle cx={pointsArray[0].x} cy={pointsArray[0].y} r="2" fill="yellow" />
                    )}
                    {/* Removed temperature labels from inside SVG */}
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-300 to-transparent opacity-50"></div>
            </div>

            {/* Times BELOW graph (Icons removed) */}
            <div className="flex justify-between px-2 mt-2 text-sm text-gray-500 dark:text-blue-300">
                {relevantHours.map((time, index) => (
                    <span key={index} className="w-1/8 text-center">
                        {new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default HourlyForecast;