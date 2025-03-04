import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminLogin from '../AdminLogin/AdminLogin';

const Sidebar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const handleSidebarClick = (path) => {
    if (!userRole) {
      setShowLogin(true); // Show login modal if not authenticated
    } else if (userRole === 'delivery' && path !== '/delivery-chat') {
      alert('You do not have access to this page.'); // Restrict delivery person to only Delivery Chat
    } else {
      navigate(path); // Navigate to the selected page
    }
  };

  const handleLogin = (role) => {
    setUserRole(role);
    setShowLogin(false);
  };

  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink
          to='/add'
          className="sidebar-option"
          onClick={() => handleSidebarClick('/add')}
        >
          <img src={assets.add} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink
          to='/list'
          className="sidebar-option"
          onClick={() => handleSidebarClick('/list')}
        >
          <img src={assets.order} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink
          to='/orders'
          className="sidebar-option"
          onClick={() => handleSidebarClick('/orders')}
        >
          <img src={assets.order} alt="" />
          <p>Orders</p>
        </NavLink>
        <NavLink
          to='/delivery-chat'
          className="sidebar-option"
          onClick={() => handleSidebarClick('/delivery-chat')}
        >
          <img src={assets.deliver} alt="" />
          <p>Delivery Chat</p>
        </NavLink>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="login-modal">
          <AdminLogin onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;