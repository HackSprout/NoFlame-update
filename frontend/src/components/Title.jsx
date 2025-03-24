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
      
      <div className='links'>
        {/* allows hyperlink */}
        <a
          href='https://github.com/NoFlame-Dev/NoFlame-update'
          className='github-link'
          target='_blank'
          rel='noopener noreferrer'
        >
          <span className='github_text'>GitHub</span>
          <img className='github_logo' src='./src/assets/white_github.png' alt='GitHub Logo' />
        </a>

        <a
          href='https://devpost.com/software/noflame'
          className='devpost-link'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img className='devpost_logo' src='./src/assets/white_devpost.png' alt='Devpost Logo' />
          <span className='devpost_text'>Devpost</span>
        </a>
      </div>
    </div>
  );
}

export default Title;
