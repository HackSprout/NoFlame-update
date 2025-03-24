import React, { useState } from 'react';
import Title from './components/Title';
import FireRisk from './components/FireRisk';
import Weather from './components/Weather';
import Map from './components/Map';

function App() {
  const [latLon, setLatLon] = useState( {lat: 34.1, lon: -118.1 });

  return (
    <>
      <Title />
      <FireRisk />
      <Weather latLon={latLon} />
      <Map setLatLon={(lat, lon) => setLatLon({ lat, lon })} />
    </>
  );
}

export default App;