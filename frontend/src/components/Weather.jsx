import React, { useEffect, useState } from 'react';
import './Weather.css';
import { getWeatherByCoords, getWeekForecast } from '../Api.jsx';

function Weather({ latLon }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (latLon?.lat && latLon?.lon) {
      getWeatherByCoords(latLon.lat, latLon.lon).then(setWeather);
      getWeekForecast(latLon.lat, latLon.lon).then(setForecast);
    }
  }, [latLon]);

  const formatToWeekday = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
  };
  

  return (
    <div className='format'>
      {weather ? (
        <div className='main-weather'>
          Location: {weather.location.name}, {weather.location.region}
          <br />
          Temperature: {weather.current.temp_f}°F
          <br />
          Feels like: {weather.current.feelslike_f}°F
          <br />
          Condition: {weather.current.condition.text}
          <br />
          Wind: {weather.current.wind_mph} mph, {weather.current.wind_dir}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}

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
