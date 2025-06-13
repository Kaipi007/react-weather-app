// src/components/PrecipitationSection.js
import React from 'react';

function PrecipitationSection({ hourly, units }) {
    if (!hourly || !hourly.time || !hourly.precipitation_probability) {
        console.log("PrecipitationSection: Hourly data or precipitation_probability is missing.");
        return <div className="text-center p-4 text-gray-500 dark:text-gray-400">No precipitation data available.</div>;
    }

    const now = new Date();
    // Find the closest hour index
    const currentHourIndex = hourly.time.findIndex(time => {
        const apiTime = new Date(time);
        return apiTime.getHours() === now.getHours() && apiTime.getDate() === now.getDate();
    });

    const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;
    const numberOfHoursToShow = 8; // Display 8 hours

    // Ensure we don't go out of bounds of the hourly data array
    const endIndex = Math.min(startIndex + numberOfHoursToShow, hourly.time.length);

    const displayHours = hourly.time.slice(startIndex, endIndex);
    const displayPrecipitation = hourly.precipitation_probability.slice(startIndex, endIndex);

    const precipitationUnit = units.precipitation_probability_unit || '%'; // Default to '%'

    return (
        <div className="bg-white dark:bg-gray-600 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mt-4 relative">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 dark:text-gray-300">Hourly Precipitation Probability</h3>
            
            {/* Chart Area Container: This div will hold the labels on the left and the bars on the right. */}
            {/* Using `grid` for explicit column layout for labels and bars. `grid-cols-[auto_1fr]` means first column (labels)
                takes its content width, second column (bars) takes the rest of the available space. */}
            {/* Added pb-4 for overall bottom padding within this chart area. */}
            <div className="grid grid-cols-[auto_1fr] h-32 w-full pb-4">

                {/* Labels for 100%, 50%, 0% - fixed width column */}
                {/* pr-2 added for a bit more space before the bars start. */}
                <div className="flex flex-col justify-between text-gray-400 dark:text-gray-500 text-xs pointer-events-none h-full pr-2"> 
                    <span className="self-start">100%</span>
                    <span className="self-start">50%</span>
                    <span className="self-start">0%</span>
                </div>

                {/* Main container for the bars. flex-nowrap to keep them in one line, gap-x-2 for consistent spacing. */}
                {/* overflow-x-auto allows scrolling only if the `min-w` of items still causes overflow. */}
                <div className="flex flex-nowrap items-end h-full gap-x-2 overflow-x-auto">
                    {displayHours.map((timeString, index) => {
                        const probability = displayPrecipitation[index] || 0; // Default to 0 if undefined/null
                        const hour = new Date(timeString).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });

                        // Set a minimum height for the bar so it's always visible, even if 0%
                        const barActualHeight = Math.max(2, probability);

                        return (
                            // Each bar item: flex-shrink-0 for controlling individual bar width more precisely.
                            // Re-introduced min-w-[35px] to better accommodate single-line time labels.
                            <div key={timeString} className="flex flex-col items-center flex-shrink-0 flex-1 h-full justify-end min-w-[35px]"> {/* Re-added and adjusted min-w */}
                                <p className="text-md font-bold mb-2 text-center text-gray-700 dark:text-gray-300 whitespace-nowrap">{probability}{precipitationUnit}</p>
                                {/* Inner bar takes full width of its flexible parent */}
                                <div className="w-full bg-gray-200 rounded-t-sm flex flex-col justify-end overflow-hidden h-full dark:bg-gray-700">
                                    {/* Actual precipitation bar */}
                                    <div
                                        className="w-full bg-blue-400 rounded-t-sm transition-all duration-300 ease-out"
                                        style={{ height: `${barActualHeight}%` }} // Dynamic height
                                    ></div>
                                </div>
                                {/* Re-added whitespace-nowrap to keep hour labels on a single line. */}
                                {/* Adjusted text classes for hour labels. */}
                                <p className="mt-2 text-[0.6rem] sm:text-xs md:text-sm text-center text-gray-500 dark:text-blue-300 whitespace-nowrap">{hour}</p> {/* Re-added whitespace-nowrap */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PrecipitationSection;
