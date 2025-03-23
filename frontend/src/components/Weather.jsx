import React, { useEffect, useState } from 'react';
import './Weather.css'
import { getWeatherByCity } from '../Api.jsx'

function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeatherByCity("Temple City").then(data => { setWeather(data); });
    // 
  }, []);

  const getWindDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
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
            monday
        </div>
    </div>
  );
}

export default Weather;