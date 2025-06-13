// src/components/ForecastTabs.js
import React from 'react';

function ForecastTabs({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'temperature', name: 'Temperature' },
        { id: 'wind', name: 'Wind' },
        { id: 'uv_index', name: 'UV Index' },
        { id: 'precipitation', name: 'Precipitation' },
    ];

    return (
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner w-full mt-4 overflow-x-auto">
            <div className="flex flex-nowrap min-w-max p-1"> 
                {tabs.map((tab, index) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
                            flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                            ${activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-md' // Activestyles
                                : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600' // Inactive tab styles
                            }
                
                        `}
                        
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ForecastTabs;
