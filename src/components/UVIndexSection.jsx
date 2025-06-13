// src/components/UVIndexSection.js
import React from 'react';

// Helper function to determine UV Index risk level and color
const getUVRisk = (uvIndex) => {
    if (uvIndex >= 11) {
        return { level: 'Extreme', color: 'bg-purple-700', textColor: 'text-purple-700', desc: 'Stay indoors, apply SPF 50+ generously.' };
    } else if (uvIndex >= 8) {
        return { level: 'Very High', color: 'bg-red-600', textColor: 'text-red-600', desc: 'Avoid sun 10am-4pm. Generous SPF 30+.' };
    } else if (uvIndex >= 6) {
        return { level: 'High', color: 'bg-orange-500', textColor: 'text-orange-500', desc: 'Reduce sun exposure. Apply SPF 30+.' };
    } else if (uvIndex >= 3) {
        return { level: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-500', desc: 'Wear sunscreen, hat, and sunglasses.' };
    } else if (uvIndex >= 0) {
        return { level: 'Low', color: 'bg-green-500', textColor: 'text-green-500', desc: 'Minimal protection needed. Still wear SPF.' };
    }
    return { level: 'N/A', color: 'bg-gray-300', textColor: 'text-gray-500', desc: 'No data available.' };
};

function UVIndexSection({ daily }) {
    // --- ADD CONSOLE LOGS HERE ---
    console.log("UVIndexSection: Received daily prop:", daily);
    console.log("UVIndexSection: daily.uv_index_max:", daily ? daily.uv_index_max : "daily is null/undefined");
    // --- END CONSOLE LOGS ---

    // Check if daily data and uv_index_max exist
    if (!daily || !daily.uv_index_max || daily.uv_index_max.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-4 text-center text-gray-500">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">UV Index</h3>
                <p>No UV Index data available.</p>
            </div>
        );
    }

    // Get today's UV Index (first element in the array)
    const todayUVIndex = daily.uv_index_max[0];
    const uvRisk = getUVRisk(todayUVIndex);

    // Calculate percentage for the progress bar (max 11+ for visualization)
    const progressBarPercentage = Math.min(100, (todayUVIndex / 11) * 100);

    return (
         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mt-4">
             <h3 className="text-lg font-semibold text-gray-700 mb-4 dark:text-gray-300">Daily UV Index</h3>
            <div className="flex flex-col items-center justify-center">
                <div className="relative w-full max-w-sm h-6 rounded-full bg-gray-200 overflow-hidden mb-4">
                    {/* Progress bar representing the UV index */}
                    <div
                        className={`h-full rounded-full transition-all duration-500 ease-in-out ${uvRisk.color}`}
                        style={{ width: `${progressBarPercentage}%` }}
                    ></div>
                    {/* Labels for UV Index range */}
                    <div className="absolute inset-0 flex justify-between items-center px-2 text-xs font-semibold text-white">
                        <span>0</span>
                        <span>5</span>
                        <span>10+</span>
                    </div>
                </div>

                <p className="text-5xl font-extrabold mb-2" style={{ color: uvRisk.textColor.split('-').pop() }}>
                    {todayUVIndex !== undefined ? todayUVIndex.toFixed(0) : 'N/A'}
                </p>
                <p className={`text-xl font-semibold mb-2 ${uvRisk.textColor}`}>
                    {uvRisk.level}
                </p>
                <p className="text-sm text-gray-600 text-center max-w-xs dark:text-blue-300">
                    {uvRisk.desc}
                </p>
            </div>
        </div>
    );
}

export default UVIndexSection;
