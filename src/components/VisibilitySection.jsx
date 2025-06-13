
import React from 'react';

function VisibilitySection({ hourly, units }) {
    if (!hourly || !hourly.time || !hourly.visibility) {
        console.log("VisibilitySection: Hourly data or visibility is missing.");
        return <div className="text-center p-4 text-gray-500 dark:text-gray-400">No visibility data available.</div>;
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
    const displayVisibility = hourly.visibility.slice(startIndex, endIndex);

    return (
        <div className="bg-white dark:bg-gray-600 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 dark:text-gray-300">Visibility</h3>
            
            {/* NEW: Container for vertical scrolling */}
            {/* Added max-h-40 (max height 160px) and overflow-y-auto */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-center max-h-40 overflow-y-auto sm:grid-cols-4 md:grid-cols-4"> {/* Adjusted grid layout for better stacking on small screens, and removed pr-2 from here */}
                {displayHours.map((timeString, index) => {
                    const visibility = displayVisibility[index];
                    const hour = new Date(timeString).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
                    const displayKm = visibility !== undefined ? `${(visibility / 1000).toFixed(0)}km` : 'N/A';

                    return (
                        <div key={timeString} className="flex flex-col items-center p-2 rounded-md">
                            <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">{displayKm}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{hour}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default VisibilitySection;
