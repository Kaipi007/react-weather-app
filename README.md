# React Weather App - Mobile & Web

## Screenshots

### Web Version
![React Weather App - Web Version](https://raw.githubusercontent.com/Kaipi007/react-weather-app/main/web%20version.png)

### Mobile Version
![React Weather App - Mobile Version](https://raw.githubusercontent.com/Kaipi007/react-weather-app/main/mobile%20version.png)

*(**Tip:** For an even cleaner presentation, you could combine these two screenshots into a single image that shows both the web and mobile views side-by-side or stacked!)*

## Live Demo

🚀 **View Live Demo:** [https://react-weather-app-aob.pages.dev/]
*Deployed on CloudFlare*

This application is designed to be fully responsive and works seamlessly on both mobile and web browsers.

## Table of Contents

* [About the Project](#about-the-project)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)

## About the Project

This project is a modern and responsive weather application built with React. It provides users with current weather conditions, daily forecasts, and hourly predictions for various locations. The goal is to deliver an intuitive and user-friendly interface for checking weather information, **accessible on both mobile devices and web browsers.**

## Features

* **Current Weather Display:** Shows real-time weather conditions for a selected location (temperature, humidity, wind speed, etc.).
* **Daily Forecast:** Provides a multi-day weather outlook.
* **Hourly Forecast:** Offers detailed hourly weather predictions.
* **Location Search:** Allows users to search for weather information by city or location.
* **Dynamic UI Updates:** Responds to user input and API data seamlessly.
* **Responsive Design:** Optimized for viewing on a wide range of devices, from small mobile screens to large desktop monitors.
* **Intuitive Weather Icons/Animations:** Uses a variety of custom icons/animations (like `clear_sky.png`, `rain.png`, `cat.png`, etc.) to visually represent weather conditions.
* *(Add any other specific features your app might have, e.g., unit conversion, etc.)*

## Technologies Used

* **Frontend:**
    * [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces.
    * [Vite](https://vitejs.dev/) - A fast build tool for modern web projects.
    * [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
    * JavaScript (ES6+)
    * HTML5
    * CSS3
* **API:**
    * [Open-Meteo](https://open-meteo.com/) - For fetching weather data. *(Open-Meteo typically does not require an API key for basic usage, but if you're using a specific feature that does, please add a note about it).*
* **Package Manager:**
    * [npm](https://www.npmjs.com/)

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (LTS version recommended)
* [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Kaipi007/react-weather-app.git](https://github.com/Kaipi007/react-weather-app.git)
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd react-weather-app
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will typically open in your browser at `http://localhost:5173` (Vite's default port).

    *(Note: If Open-Meteo requires an API key for the specific features you are using, you would still need to add an instruction here for creating a `.env` file and adding the key. Based on common Open-Meteo usage, it's often not required for basic forecasts.)*

## Project Structure

This project follows a standard React application structure, organized for modularity and maintainability.

         react-weather-app/
         ├── public/
         │   └── ...
         ├── src/
         │   ├── assets/
         │   │   └── react.svg
         │   ├── components/
         │   │   ├── CatAnimation.jsx
         │   │   ├── CurrentWeatherCard.jsx
         │   │   ├── DailyForecast.jsx
         │   │   ├── DailyForecastCard.jsx
         │   │   ├── ForecastTabs.jsx
         │   │   ├── HourlyTempSection.jsx
         │   │   ├── LocationSearch.jsx
         │   │   ├── PrecipitationSection.jsx
         │   │   └── WindSection.jsx
         │   ├── img/
         │   │   ├── WindSection_wind.png
         │   │   ├── cat.png
         │   │   ├── clear_sky.png
         │   │   ├── cloudy.png
         │   │   ├── drizzle.png
         │   │   ├── fog.png
         │   │   ├── heart.png
         │   │   ├── rain.png
         │   │   ├── react_weather_app_icon.png
         │   │   ├── snow.png
         │   │   ├── sun.png
         │   │   └── under.png
         │   ├── App.css
         │   ├── App.jsx
         │   ├── index.css
         │   ├── main.jsx
         │   └── ...
         ├── .gitignore
         ├── eslint.config.js
         ├── index.html
         ├── mobile version.png
         ├── package-lock.json
         ├── package.json
         ├── postcss.config.js
         ├── tailwind.config.js
         ├── vite.config.js
         ├── web version.png
         └── README.md


## Contributing

Contributions are welcome! If you find a bug, have a feature request, or want to improve the code, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch:** `git checkout -b feature/your-feature-name` or `bugfix/issue-description`
3.  **Make your changes.**
4.  **Commit your changes:** `git commit -m 'feat: Add new feature' ` or `fix: Resolve bug`
5.  **Push to your branch:** `git push origin feature/your-feature-name`
6.  **Open a Pull Request** against the `main` branch of this repository.

Please ensure your code adheres to the project's coding style and includes relevant tests if applicable.

## License

This project is licensed under the **MIT License**.

**MIT License**

Copyright (c) 2025 Kaipi007

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgements

* [Open-Meteo](https://open-meteo.com/)
* [React Documentation](https://reactjs.org/docs)
* [Vite Documentation](https://vitejs.dev/guide/)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Contact

* **GitHub:** [Kaipi007](https://github.com/Kaipi007)
* **Project Link:** [https://github.com/Kaipi007/react-weather-app](https://github.com/Kaipi007/react-weather-app)
