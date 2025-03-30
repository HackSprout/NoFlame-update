import React, { useEffect, useState } from 'react';
import './Weather.css';
import { getWeatherByCoords, getWeekForecast } from '../Api.jsx';

function Weather({ latLon }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (latLon?.lat && latLon?.lon) {
      getWeatherByCoords(latLon.lat, latLon.lon)
        .then((data) => {
          if (data.error) {
            console.warn("WeatherAPI error:", data.error.message);
            setWeather(null);
          } else {
            setWeather(data);
          }
        })
        .catch((err) => {
          console.error("Weather fetch failed:", err.message);
          setWeather(null);
        });
  
      getWeekForecast(latLon.lat, latLon.lon)
        .then((data) => {
          if (!Array.isArray(data)) {
            console.warn("Invalid forecast data");
            setForecast([]);
          } else {
            setForecast(data);
          }
        })
        .catch((err) => {
          console.error("Forecast fetch failed:", err.message);
          setForecast([]);
        });
    }
  }, [latLon]);
  

  const formatToWeekday = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
  };

  const getConditionEmoji = (conditionText) => {
    const lower = conditionText.toLowerCase();
    if (lower.includes("sunny")) return "☀️";
    if (lower.includes("clear")) return "🌤️";
    if (lower.includes("cloud")) return "☁️";
    if (lower.includes("overcast")) return "🌥️";
    if (lower.includes("drizzle")) return "🌦️";
    if (lower.includes("rain")) return "🌧️";
    if (lower.includes("thunder")) return "⛈️";
    if (lower.includes("snow")) return "❄️";
    if (lower.includes("blizzard")) return "🌨️❄️";
    if (lower.includes("fog") || lower.includes("mist")) return "🌫️";
    if (lower.includes("wind")) return "💨";
    return "🌈"; // default/fallback emoji
  };  
  

  return (
    <div className='format'>
      <div className='main-weather'>
      {weather ? (
        <>
          {weather.location.name}, {weather.location.region}
          <br />
          Temperature: {weather.current.temp_f}°F
          <br />
          Feels like: {weather.current.feelslike_f}°F
          <br />
          Condition: {getConditionEmoji(weather.current.condition.text)} {weather.current.condition.text}
          <br />
          Humidity: {weather.current.humidity}
          <br />
          Wind: {weather.current.wind_mph} mph, {weather.current.wind_dir}
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
      </div>

      <div className='week-forecast'>
        {forecast.length > 0 ? (
          forecast.map((day, index) => (
            <div key={index}>
              {formatToWeekday(day.date)}: {day.day.maxtemp_f}°F
            </div>
          ))
        ) : (
          <p>Loading weekly forecast...</p>
        )}
      </div>
    </div>
  );
}

export default Weather;
