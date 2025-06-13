// src/components/LocationSearch.js
import React, { useState } from 'react';

function LocationSearch({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent page reload when form is submitted
        if (query.trim()) { // Only search if the query is not empty
            onSearch(query.trim()); // Call the onSearch prop with the trimmed query
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter city or zip code"
                className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search for a location" // Accessibility improvement
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors"
            >
                Search
            </button>
        </form>
    );
}

export default LocationSearch;
