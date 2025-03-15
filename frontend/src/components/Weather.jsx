import React, { useEffect, useState } from 'react';
import './Weather.css'

const Weather = () => {
  return (
    <div className='format'>
        <div className='main-weather'>
            Location
            Temperature
            Feels like
            Cloud classification
            Wind speed
            Wind direction
        </div>

        <div className='week-forecast'>
            monday
        </div>
    </div>
  );
}

export default Weather;