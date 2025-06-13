// src/components/WeatherIcon.js
import React from 'react'; 
import cloudyPng from '../img/cloudy.png';
import fogPng from '../img/fog.png';
import clearSkyPng from '../img/clear_sky.png';
import drizzlePng from '../img/drizzle.png';
import rainPng from '../img/rain.png';
import snowPng from '../img/snow.png';
import thunderPng from '../img/thunder.png';
import sunnyPng from '../img/sun.png';

function WeatherIcon({ code, className = "w-10 h-10" }) {
    let iconSrc;
    // This is a highly simplified mapping. You'd have actual icons here.
    if (code === 0) iconSrc = clearSkyPng; // Clear sky
    else if (code >= 1 && code <= 3) iconSrc = cloudyPng;// Cloudy
    else if (code >= 45 && code <= 48)iconSrc = fogPng; // Fog
    else if (code >= 51 && code <= 55) iconSrc = drizzlePng; // Drizzle
    else if (code >= 61 && code <= 65) iconSrc = rainPng; // Rain
    else if (code >= 71 && code <= 75) iconSrc = snowPng; // Snow
    else if (code >= 95 && code <= 99) iconSrc = thunderPng; // Thunderstorm
    else iconSrc = sunnyPng; // Default sunny

    return (
        <img src={iconSrc} alt="Weather Icon" className={className} />
    );
}

export default WeatherIcon;