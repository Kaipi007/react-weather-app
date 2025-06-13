// src/components/CurrentWeatherCard.js
import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";

const getWeatherDescription = (code) => {
  // Basic mapping, expand as needed from Open-Meteo docs
  if (code === 0) return "Clear sky";
  if (code >= 1 && code <= 3)
    return "Mainly clear, partly cloudy, and overcast";
  if (code >= 45 && code <= 48) return "Fog";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code >= 71 && code <= 75) return "Snow fall";
  if (code >= 95 && code <= 99) return "Thunderstorm";
  return "Unknown";
};

const convertCelsiusToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

function CurrentWeatherCard({
  current,
  hourly,
  location,
  units,
  toggleTemperatureUnit,
}) {
  const [realtimeDate, setRealtimeDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRealtimeDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const now = realtimeDate;
  const currentHourIndex = hourly.time.findIndex((time) => {
    const date = new Date(time);
    return (
      date.getHours() === now.getHours() && date.getDate() === now.getDate()
    );
  });

  const currentHourly =
    currentHourIndex !== -1
      ? {
          precipitation_probability:
            hourly.precipitation_probability[currentHourIndex],
          relative_humidity_2m: hourly.relative_humidity_2m[currentHourIndex],
          windspeed_10m: hourly.windspeed_10m[currentHourIndex],
          dewpoint_2m: hourly.dewpoint_2m[currentHourIndex],
          surface_pressure: hourly.surface_pressure[currentHourIndex],
          visibility: hourly.visibility[currentHourIndex],
        }
      : {};

  if (!current || !hourly || !hourly.time || hourly.time.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-600">
        Loading weather data...
      </div>
    );
  }

  // Determine the temperature to display based on the selected unit
  const displayTemperature =
    units.temperature === "fahrenheit"
      ? Math.round(convertCelsiusToFahrenheit(current.temperature))
      : Math.round(current.temperature);

  // Determine the dew point temperature to display
  const displayDewPoint =
    units.temperature === "fahrenheit"
      ? Math.round(convertCelsiusToFahrenheit(currentHourly.dewpoint_2m))
      : Math.round(currentHourly.dewpoint_2m);

  return (
    <div className="bg-white p-4 dark:bg-gray-600 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between">
      {/* Left Section: Icon and Temperature */}
      <div className="flex items-center space-x-4">
        <WeatherIcon code={current.weathercode} className="w-20 h-20" />
        <span className="text-6xl font-bold">{displayTemperature}</span>
        {/* Unit Toggle Button */}
        <span className="text-xl text-gray-500 font-semibold cursor-pointer">
          <span
            className={
              units.temperature === "celsius"
                ? "text-blue-600"
                : "hover:text-blue-400"
            }
            onClick={() => toggleTemperatureUnit("celsius")}
          >
            °C
          </span>
          <span className="mx-1">|</span>
          <span
            className={
              units.temperature === "fahrenheit"
                ? "text-blue-600"
                : "hover:text-blue-400"
            }
            onClick={() => toggleTemperatureUnit("fahrenheit")}
          >
            °F
          </span>
        </span>
      </div>

      <div className="flex flex-col flex-grow text-gray-700 dark:text-gray-300 text-left ml-8 mr-4">
        {/* Location, Date/Time, and Description - always at the top of this section */}
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
          Teriang, Pahang
        </p>
        <p className="text-gray-500">
          {realtimeDate.toLocaleString("en-US", {
            weekday: "long",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <p className="text-gray-500 capitalize">
          {getWeatherDescription(current.weathercode)}
        </p>

        {/* On small screens (sm:flex-col-reverse), the second column will appear first. */}
        {/* On medium screens and up (md:flex-row), they will be side-by-side in normal order. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-base w-full mt-2">
          <p>
            <span className="font-semibold">Precipitation:</span>{" "}
            {currentHourly.precipitation_probability !== undefined
              ? `${currentHourly.precipitation_probability.toFixed(0)}%`
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Dew Point:</span>{" "}
            {currentHourly.dewpoint_2m !== undefined
              ? `${displayDewPoint}°`
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Humidity:</span>{" "}
            {currentHourly.relative_humidity_2m !== undefined
              ? `${currentHourly.relative_humidity_2m.toFixed(0)}%`
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Pressure:</span>{" "}
            {currentHourly.surface_pressure !== undefined
              ? currentHourly.surface_pressure.toFixed(0)
              : "N/A"}{" "}
            hPa
          </p>
          <p>
            <span className="font-semibold">Wind:</span>{" "}
            {currentHourly.windspeed_10m !== undefined
              ? currentHourly.windspeed_10m.toFixed(0)
              : "N/A"}{" "}
            {units.windspeed_10m_unit || "km/h"}
          </p>
          <p>
            <span className="font-semibold">Visibility:</span>{" "}
            {currentHourly.visibility !== undefined
              ? `${(currentHourly.visibility / 1000).toFixed(0)} km`
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
