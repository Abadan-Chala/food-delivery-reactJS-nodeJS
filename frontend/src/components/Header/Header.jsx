import React from 'react';
import './Header.css';
import videoSrc from '../../assets/bgVideo.mp4';

const Header = () => {
  return (
    <>
      <div className='header'>
        <video autoPlay loop muted className="header-video">
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="header-contents">
          <h2><b>Welcome to <span>HUFOOD</span> website</b></h2>
          <h3>Order your favourite food from your favourite restaurant</h3>
          <a href='#explore-menu' onClick={() => setMenu("menu")}><button>View Menu</button></a>
        </div>
      </div>
      <div className="map-container">
        <iframe
          title="Haramaya University Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2823.8618119974562!2d42.03477337314924!3d9.423014382700797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1631a5a8e441e64d%3A0xdafe11071687f9d!2sHaramaya%20University!5e1!3m2!1sen!2set!4v1739275336098!5m2!1sen!2set"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
};

export default Header;