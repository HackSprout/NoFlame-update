import React, { useEffect, useState } from 'react';
import './Title.css';

function Title() {
  const date = new Date();
  const options = { month: 'long', day: 'numeric', year: 'numeric' };

  return (
    <div className='NoFlame'>
      <div className='logo-name'>
        <img className = 'logo' src='./src/assets/noFlameLogo.jpg'>
        </img>
        <h1 className='name'>NoFlame</h1>
      </div>
      
      <h1 className='date'>
        {date.toLocaleDateString('en-US', options).replace(
          /\d+/, 
          (day) => day + (["st", "nd", "rd"][(day % 10 - 1)] || "th")
        )}
      </h1>

      <h2 className='link'>Picture</h2>
    </div>
  );
}

export default Title;
