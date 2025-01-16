import React, { useState } from 'react'
import './Navbar.css'
import search from '../../assets/search-icon.png'
import basket from '../../assets/basket.png'

const Navbar = () => {

  const [menu, setMenu] = useState("home")
  return (
    <div className='navbar'>
      <h1 className='logo'>HUFOOD</h1>
      <ul className="navbar-menu">
        <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</li>
        <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li>
        <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</li>
        <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</li>
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
