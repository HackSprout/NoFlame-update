import React, { useEffect, useState } from 'react';
import './FireRisk.css';
// import { getCurrentForecast, getFireRisk, getCityName } from "./Api.jsx";

const FireRisk = () => {
  // const [fireRisk, setFireRisk] = useState(null);
  
  return (
    <div className='section'>
      <div className='FireLikelihood' style={{
        background: "linear-gradient(135deg, green, yellow)"
        //   fireRisk <= 25
        //     ? "linear-gradient(135deg, green, yellow)"
        //     : fireRisk <= 50
        //     ? "linear-gradient(135deg, yellow, orange)"
        //     : fireRisk <= 75
        //     ? "linear-gradient(135deg, orange 20%, red 80%)"
        //     : "linear-gradient(135deg, red 50%, darkred 100%)",
        // transition: "background 0.5s ease",
      }}>
        Likelihood of fire
      </div>
      <div className='FireAnimation'>
        <div className='fire'>
          Risk Factor: some percentage %
        </div>
      </div>
    </div>
  );
}

export default FireRisk;
