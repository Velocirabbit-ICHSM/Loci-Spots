import React from 'react';
import Logo from '../src/media/LociSpotLogo.png';

const NavBar = () => {
  // Nav Bar will contain the logo of the app

  // each object will contain key value pair of the city and an array of restaurants

  return (
    <div className="nav">
      <div className="nav-container">
        <img className="logo" src={Logo} />
      </div>
    </div>
  );
};

export default NavBar;
