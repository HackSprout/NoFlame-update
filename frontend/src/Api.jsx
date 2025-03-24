// import axios from 'axios';
// const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
// const BASE_URL = 'https://104.35.175.95:5000';

// const API_KEY = '3dc5d0d5d4d6875d4a1a5b1b5cc54ac4';
const API_KEY = '43bb1aa3c583481495202526252403';

// export async function getWeatherByCity(city) {
//     const res = await fetch (
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
//     );

//     const data = await res.json();
//     // console.log(data);
//     return data;
// }

// export async function getWeatherByCoords(lat, lon) {
//     const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
//     );
//     const data = await res.json();
//     return data;
// }

// export async function getWeekForecast(lat, lon) {
//     const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${API_KEY}`
//     );
//     const data = await res.json();
//     return data.daily?.slice(0, 7);
// } 

export async function getWeatherByCoords(lat, lon) {
    const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`
    );
    const data = await res.json();
    return data;
}

export async function getWeekForecast(lat, lon) {
    const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7`
    );
    const data = await res.json();
    return data.forecast?.forecastday || [];
}