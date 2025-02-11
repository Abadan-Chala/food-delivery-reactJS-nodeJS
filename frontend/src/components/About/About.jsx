import React from 'react';
import './About.css';
import aboutImage from '../../assets/about.jpg';
import gemechis from '../../assets/gemechis.jpg';
import lamesa from '../../assets/lamesa.jpg';
import lalisa from '../../assets/lalisa.jpg';
import muzemil from '../../assets/muzemil.jpg';

const About = () => {
  return (
    <div className='about-us' id='about'>
      <h2>About Us</h2>
      <div className="about-us-content">
        <div className="about-us-right">
          <p>
            We are a group of students from the Department of INFOSA at Haramaya University, working on our final project to develop a food delivery system. Our team consists of four dedicated members, each with a specific role to ensure the success of our project.
          </p>
          <h3>Our Team</h3>
           <div className="team-member">
              <img src={aboutImage} alt="team members" className="team-member-image" />
              <div className="team-member-info">
                <p><b>HUFOOD Order</b></p>
                <p>Team Members</p>
              </div>
            </div>
          <div className="team-members">
            <div className="team-member">
              <img src={lalisa} alt="Lalisa Teshoma" className="team-member-image" />
              <div className="team-member-info">
                <p><b>Lalisa Teshoma</b></p>
                <p>Project Manager</p>
              </div>
            </div>
            <div className="team-member">
              <img src={lamesa} alt="Lamesa Tesfaye" className="team-member-image" />
              <div className="team-member-info">
                <p><b>Lamesa Tesfaye</b></p>
                <p>Requirement Gathering and Analysis</p>
              </div>
            </div>
            <div className="team-member">
              <img src={gemechis} alt="Gemechis Beshana" className="team-member-image" />
              <div className="team-member-info">
                <p><b>Gemechis Beshana</b></p>
                <p>System Design</p>
              </div>
            </div>
            <div className="team-member">
              <img src={muzemil} alt="Muzemil Nura" className="team-member-image" />
              <div className="team-member-info">
                <p><b>Muzemil Nura</b></p>
                <p>Implementation and Testing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;