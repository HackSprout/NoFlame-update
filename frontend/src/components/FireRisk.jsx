import React, { useEffect, useState } from 'react';
import './FireRisk.css';
import { getWeatherByCoords } from '../Api';

const getFWI = (temperature, humidity, windSpeed) => {
  const ffmc = (temperature - 10) * (100 - humidity) / 100;
  const isi = windSpeed * (temperature / 10);
  const fwi = (ffmc * isi) / 100;
  return fwi;
};

const FireRisk = ({ latLon }) => {
  const [fireRisk, setFireRisk] = useState(null);

  useEffect(() => {

    if (latLon?.lat && latLon?.lon) {
      getWeatherByCoords(latLon.lat, latLon.lon)
        .then((data) => {
          console.log("📦 WeatherAPI response:", data);

          if (data.error) {
            setFireRisk(null);
            return;
          }

          const temp = data.current.temp_f;
          const humidity = data.current.humidity;
          const wind = data.current.wind_mph;


          const risk = getFWI(temp, humidity, wind);

          if (!isNaN(risk)) {
            setFireRisk(Math.round(risk)); 
          } else {
            setFireRisk(null);
          }
        })
        .catch((err) => {
          setFireRisk(null);
        });
    }
  }, [latLon]);

  const getFireColor = (risk) => {
    if (risk <= 25) return "linear-gradient(135deg, green, yellow)";
    if (risk <= 50) return "linear-gradient(135deg, yellow, orange)";
    if (risk <= 75) return "linear-gradient(135deg, orange, red)";
    return "linear-gradient(135deg, red, darkred)";
  };

  return (
    <div className='section'>
      <div className='FireLikelihood' style={{
        background: fireRisk !== null ? getFireColor(fireRisk) : "gray"
      }}>
        Likelihood of fire
      </div>
      <div className='FireAnimation'>
        <div className='fire'>
          Risk Factor: {fireRisk !== null ? `${fireRisk}%` : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default FireRisk;
