import React, { useContext, useState } from 'react'
import './Navbar.css'
import search from '../../assets/search-icon.png'
import basket from '../../assets/basket.png'
import order from '../../assets/order.png'
import profile from '../../assets/profile.png'
import logout from '../../assets/logout.png'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState("home")
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

  const navigate = useNavigate()

  const logout = () =>{
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }
  return (
    <div className='navbar'>
      <Link to='/'><h1 className='logo'>HUFOOD</h1></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={search} alt="search"/>
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={basket} alt="basket"/></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign Up</button>
        :<div className='navbar-profile'>
          <img src={profile} alt="" />
          <ul className="nav-profile-dropdown">
            <li><img src={order} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={logout} alt="" />Logout</li>
          </ul>
          </div>}
        
      </div>
    </div>
  )
}

export default Navbar
