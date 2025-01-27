import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.png'
import facebook from '../../assets/facebook.png'
import twitter from '../../assets/twitter.png'
import linkedin from '../../assets/linkedin.png'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={logo} alt="" />
                <p>Food Delivery Website</p>
                <div className="footer-social-icon">
                    <img src={facebook} alt="" />
                    <img src={twitter} alt="" />
                    <img src={linkedin} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>HUFOOD</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div className="footer-content-right">
                <h2>Contact Us</h2>
                <ul>
                    <li><b>Phone:</b> +251917145545</li>
                    <li><b>Email:</b> haramaya@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 © haramaya. All Rights Reserved.</p>
    </div>
  )
}

export default Footer
