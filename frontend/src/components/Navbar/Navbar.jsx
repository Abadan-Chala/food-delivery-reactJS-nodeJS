import React, { useState } from 'react'
import './Navbar.css'
import search from '../../assets/search-icon.png'
import basket from '../../assets/basket.png'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [menu, setMenu] = useState("home")
  return (
    <div className='navbar'>
      <h1 className='logo'>HUFOOD</h1>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={search} alt="search"/>
        <div className="navbar-search-icon">
            <img src={basket} alt="basket"/>
            <div className="dot"></div>
        </div>
        <button>Sign Up</button>
      </div>
    </div>
  )
}

export default Navbar
