import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Order from './pages/Orders/Order';
import AdminLogin from './components/AdminLogin/AdminLogin.jsx';
import DeliveryChat from './pages/DeliveryChat/DeliveryChat.jsx'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Track user role (admin or delivery)

  const handleAdminLogin = (role) => {
    setIsAdminAuthenticated(true);
    setUserRole(role); // Set the user role
  };

  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        {/* Conditionally render the Sidebar */}
        {isAdminAuthenticated && <Sidebar isAdmin={userRole === 'admin'} />}
        <Routes>
          {/* Admin Login Route */}
          <Route
            path='/admin-login'
            element={<AdminLogin onLogin={handleAdminLogin} />}
          />

          {/* Add Route */}
          <Route
            path='/add'
            element={
              isAdminAuthenticated && userRole === 'admin' ? (
                <Add url={url} />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            }
          />

          {/* List Route */}
          <Route
            path='/list'
            element={
              isAdminAuthenticated && userRole === 'admin' ? (
                <List url={url} />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            }
          />

          {/* Orders Route */}
          <Route
            path='/orders'
            element={
              isAdminAuthenticated && userRole === 'admin' ? (
                <Order url={url} />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            }
          />

          {/* Delivery Chat Route */}
          <Route
            path='/delivery-chat'
            element={
              isAdminAuthenticated ? (
                <DeliveryChat userRole={userRole} />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            }
          />

          {/* Default Route (Redirect to Admin Login if not authenticated) */}
          <Route
            path='*'
            element={
              isAdminAuthenticated ? (
                <Order url={url} /> // Or any other default page for authenticated users
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;