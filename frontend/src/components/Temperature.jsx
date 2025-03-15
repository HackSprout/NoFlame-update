import React, { useEffect, useState } from 'react';
import './Temperature.css';

function Temperature({ lat, lon }) {
  const [weatherData, setWeatherData] = useState({
    temp: "--",
    condition: "Loading...",
    city: "Detecting..."
  });

  useEffect(() => {
    if (lat !== null && lon !== null) {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log("✅ Weather Data:", data);
          if (data.main && data.weather) {
            setWeatherData({
              temp: data.main.temp,
              condition: data.weather[0]?.description,
              city: data.name || "Unknown Location"
            });
          }
        })
        .catch(error => console.error("❌ Error fetching weather data:", error));
    }
  }, [lat, lon]); // Re-run when lat/lon change

  return (
    <div className="temperature-container">
      <h3>🌍 {weatherData.city}</h3>
      <p>🌡️ {weatherData.temp}°C</p>
      <p>☁️ {weatherData.condition}</p>
    </div>
  );
}

export default Temperature;

