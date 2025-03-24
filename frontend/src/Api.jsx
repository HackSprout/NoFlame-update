// import axios from 'axios';
// const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
// const BASE_URL = 'https://104.35.175.95:5000';

// const API_KEY = '3dc5d0d5d4d6875d4a1a5b1b5cc54ac4';
const API_KEY = '43bb1aa3c583481495202526252403';

const normalizeCoord = (coord) => {
    return {
      lat: Math.min(90, Math.max(-90, coord.lat)),
      lon: ((coord.lon + 180) % 360 + 360) % 360 - 180
    };
  };

export async function getWeatherByCoords(lat, lon) {
    const { lat: safeLat, lon: safeLon } = normalizeCoord({ lat, lon });

    const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${safeLat},${safeLon}`
    );
    const data = await res.json();
    return data;
}

export async function getWeekForecast(lat, lon) {
    const { lat: safeLat, lon: safeLon } = normalizeCoord({ lat, lon });

    const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${safeLat},${safeLon}&days=7`
    );
    const data = await res.json();
    // return data.forecast?.forecastday || [];
    return data.forecast?.forecastday;
}