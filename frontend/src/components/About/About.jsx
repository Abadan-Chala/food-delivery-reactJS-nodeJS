import React from 'react';
import './About.css';
import aboutImage from '../../assets/about.jpg';

const About = () => {
  return (
    <div className='about-us' id='about'>
      <h2>About Us</h2>
      <div className="about-us-content">
        <div className="about-us-left">
          <img src={aboutImage} alt="About Us" className="about-us-image" />
        </div>
        <div className="about-us-right">
          <h3>Our Aim</h3>
          <p>
            Our aim is to provide the best food delivery service in Haramaya University. We strive to connect our customers with their favorite restaurants and deliver their favorite meals right to their doorstep.
          </p>
          <h3>Our Goal</h3>
          <p>
            Our goal is to ensure customer satisfaction by offering a wide variety of food options, timely delivery, and excellent customer service. We are committed to making food ordering and delivery a seamless and enjoyable experience.
          </p>
          <h3>Our Mission</h3>
          <p>
            Our mission is to revolutionize the food delivery industry by leveraging technology and innovation. We aim to create a platform that is user-friendly, efficient, and reliable, ensuring that our customers can enjoy their meals without any hassle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;