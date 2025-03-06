import React, { useState } from 'react';
import Map from './components/Map';
import Title from './components/Title';
import Temperature from './components/Temperature';

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  return (
    <>
      <Title />
      {/* Temperature component updates when lat/lon change */}
      {lat !== null && lon !== null && <Temperature lat={lat} lon={lon} />}
      <div style={{ width: "50vw", height: "50vh" }}>
        <Map setLatLon={(latitude, longitude) => {
          setLat(latitude);
          setLon(longitude);
        }} />
      </div>
    </>
  );
}

export default App;