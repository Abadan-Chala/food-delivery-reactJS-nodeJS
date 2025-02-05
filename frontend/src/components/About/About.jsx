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
          <img src={aboutImage} alt="About Us" className="about-us-image" />
          <img src={aboutImage} alt="About Us" className="about-us-image" />
        </div>
        <div className="about-us-right">
          <p>
            We are a group of students from the Department of IT at Haramaya University, working on our final project to develop a food delivery system. Our team consists of four dedicated members, each with a specific role to ensure the success of our project.
          </p>
          <h3>Our Team</h3>
          <table className="team-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Name</th>
                <th>ID No.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Project Manager</td>
                <td>Lalisa Teshoma</td>
                <td>3266/14</td>
              </tr>
              <tr>
                <td>Requirement Gathering and Analysis</td>
                <td>Lamesa Tesfaye</td>
                <td>3267/14</td>
              </tr>
              <tr>
                <td>System Design</td>
                <td>Gemechis Beshana</td>
                <td>3014/14</td>
              </tr>
              <tr>
                <td>Implementation and Testing</td>
                <td>Muzemil Nura</td>
                <td>1312/14</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default About;