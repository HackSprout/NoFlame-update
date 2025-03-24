import React, { useEffect, useState } from 'react';
import './Weather.css'
// import { getWeatherByCity } from '../Api.jsx'
import { getWeatherByCoords, getWeekForecast } from '../Api.jsx';

function Weather({ latLon }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (latLon?.lat && latLon?.lon) {
      getWeatherByCoords(latLon.lat, latLon.lon).then(data => setWeather(data) );
      getWeekForecast(latLon.lat, latLon.lon).then(data => setForecast(data) );
    }
  }, [latLon]);

  const getWindDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {weekday: 'long'});
  }

  return (
    <div className='format'>
      {weather ? (
        <div className='main-weather'>
          Location: {weather.name}
          <br/>
          Temperature: {weather.main.temp}°F
          <br/>
          Feels like: {weather.main.feels_like}°F
          <br/>
          Cloud: {weather.weather[0].description} 
          <br/>
          Wind speed: {weather.wind.speed} mph
          <br/>
          Wind direction: {getWindDirection(weather.wind.deg)}
          
      </div>
      ): (
        <p> Loading weather data...</p>
      )}

        <div className='week-forecast'>
          {forecast.length > 0 ? (
            forecast.map((day, index) => (
              <div key={index}>
                {formatDate(day.dt)}: {day.temp.day}°F
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