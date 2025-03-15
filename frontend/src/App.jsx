import React, { useState } from 'react';
import Title from './components/Title';
import FireRisk from './components/FireRisk';
import Weather from './components/Weather';
import Map from './components/Map';
// import Temperature from './components/Temperature';

function App() {
  return (
    <>
      <Title />
      <FireRisk />
      <Weather />
      <Map />
    </>
  );
}

export default App;