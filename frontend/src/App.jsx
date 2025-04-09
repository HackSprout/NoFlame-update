import React, { useState, useEffect } from 'react';
import Title from './components/Title';
import FireRisk from './components/FireRisk';
import Weather from './components/Weather';
import Map from './components/Map';
import './App.css';

function App() {
  const [latLon, setLatLon] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLatLon({ lat: latitude, lon: longitude });
        },
        (err) => {
          console.warn("Geolocation failed. Falling back to LA.");
          setLatLon({ lat: 34.1, lon: -118.1 }); 
        }
      );
    } else {
      console.warn("Geolocation not supported. Using fallback.");
      setLatLon({ lat: 34.1, lon: -118.1 }); 
    }
  }, []);

  return (
    <>
      <Title />
      <FireRisk latLon={latLon} />
      <Weather latLon={latLon} />
      <Map
        setLatLon={(lat, lon) => setLatLon({ lat, lon })}
        defaultLatLon={latLon}
      />

    </>
  );
}

export default App;