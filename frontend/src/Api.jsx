// import axios from 'axios';
// const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
// const BASE_URL = 'https://104.35.175.95:5000';

const API_KEY = '3dc5d0d5d4d6875d4a1a5b1b5cc54ac4';

export async function getWeatherByCity(city) {
    const res = await fetch (
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
    );

    const data = await res.json();
    // console.log(data);
    return data;
}