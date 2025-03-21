import React, { useEffect, useState } from 'react';
import './Weather.css'

const Weather = () => {
  return (
    <div className='format'>
        <div className='main-weather'>
            Location
            <br/>
            Temperature
            <br/>
            Feels like
            <br/>
            Cloud classification
            <br/>
            Wind speed
            <br/>
            Wind direction
            
        </div>

        <div className='week-forecast'>
            monday
        </div>
    </div>
  );
}

export default Weather;