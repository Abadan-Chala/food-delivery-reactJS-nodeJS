import React from 'react';
import './Header.css';
import videoSrc from '../../assets/bgVideo.mp4';

const Header = () => {
  return (
    <div className='header'>
      <video autoPlay loop muted className="header-video">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="header-contents">
        <h2><b>Welcome to <span>HUFOOD</span> website</b></h2>
        <h3>Order your favourite food from your favourite restaurant</h3>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;