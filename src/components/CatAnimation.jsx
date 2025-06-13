// src/components/WeatherAnimation.js
import React, { useState } from 'react';
import WeatherIcon from './WeatherIcon';

// Import your cat image
import catImage from '../img/cat.png'; // Adjust path as needed
// Import your heart image
import loveIconImage from '../img/heart.png'; // <--- NEW: Import your heart image

// Helper to determine weather category for animations
const getWeatherCategory = (code) => {
    if (code === 0) return 'clear';
    if (code >= 1 && code <= 3) return 'cloudy';
    if (code >= 45 && code <= 48) return 'fog';
    if (code >= 51 && code <= 65) return 'rain';
    if (code >= 71 && code <= 77) return 'snow';
    if (code >= 80 && code <= 82) return 'rain_showers';
    if (code >= 85 && code <= 86) return 'snow_showers';
    if (code >= 95 && code <= 99) return 'thunderstorm';
    return 'default';
};

function CatAnimation({ currentWeatherCode }) {
    const weatherCategory = getWeatherCategory(currentWeatherCode);
    const [loveIcons, setLoveIcons] = useState([]);

    const handleCatClick = (e) => {
        
        const rect = e.target.getBoundingClientRect();
        const startX = rect.width * 2.5; // 70% from the left edge of the cat image

        // Y position remains the same, nearer to the cat's body
        const startY = rect.height * 0.7; // 75% down from the top edge of the cat image

        const newIcon = {
            id: Date.now() + Math.random(),
            x: startX, // Now always the right side
            y: startY,
            duration: Math.random() * 0.5 + 1.5,
            delay: Math.random() * 0.1,
        };
        setLoveIcons(prevIcons => [...prevIcons, newIcon]);
    };

    const handleAnimationEnd = (id) => {
        setLoveIcons(prevIcons => prevIcons.filter(icon => icon.id !== id));
    };

    // --- Weather Effects (Rain & Snow) ---
    const renderRainDrops = () => {
        const drops = [];
        for (let i = 0; i < 50; i++) {
            const style = {
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random()
            };
            drops.push(<div key={`rain-${i}`} className="rain-drop" style={style}></div>);
        }
        return drops;
    };

    const renderSnowFlakes = () => {
        const flakes = [];
        for (let i = 0; i < 30; i++) {
            const style = {
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                width: `${3 + Math.random() * 4}px`,
                height: `${3 + Math.random() * 4}px`,
                opacity: Math.random()
            };
            flakes.push(<div key={`snow-${i}`} className="snow-flake" style={style}></div>);
        }
        return flakes;
    };

    return (
        <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center relative overflow-hidden dark:bg-gray-300">
            {/* Background Cat Image */}
            <img
                src={catImage}
                alt="Weather Cat"
                className="w-24 h-24 object-contain z-0 cursor-pointer"
                style={{ objectPosition: 'center bottom' }}
                onClick={handleCatClick}
            />

            {/* Weather Icon Overlay */}
            <div className="absolute top-2 right-2 z-20">
                <WeatherIcon code={currentWeatherCode} className="w-12 h-12" />
            </div>

            {/* Conditional Weather Effects */}
            {weatherCategory === 'rain' && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {renderRainDrops()}
                </div>
            )}
            {weatherCategory === 'snow' && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {renderSnowFlakes()}
                </div>
            )}

            {/* Love Icons (now using your heart.png) */}
            {loveIcons.map(icon => (
                <img
                    key={icon.id}
                    src={loveIconImage} // <--- CHANGED: Use the imported image
                    alt="Love"
                    className="absolute z-30 animate-love-flow"
                    style={{
                        left: icon.x,
                        top: icon.y,
                        width: '24px', // Adjust size of the heart image (e.g., 24px)
                        height: '24px', // Adjust size of the heart image
                        '--animation-duration': `${icon.duration}s`,
                        '--animation-delay': `${icon.delay}s`,
                        transform: 'translate(-50%, -50%)', // Center the image on click point
                        pointerEvents: 'none',
                    }}
                    onAnimationEnd={() => handleAnimationEnd(icon.id)}
                />
            ))}

            {/* Overlay to dim cat slightly and make effects/icon pop */}
            <div className="absolute inset-0 bg-black bg-opacity-10 z-0 pointer-events-none"></div>
        </div>
    );
}

export default CatAnimation;