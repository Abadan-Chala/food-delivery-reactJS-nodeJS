import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Order from './pages/Orders/Order';
import AdminLogin from './components/AdminLogin/AdminLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route
            path='/admin-login'
            element={<AdminLogin onLogin={handleAdminLogin} />}
          />
          <Route
            path='/add'
            element={
              isAdminAuthenticated ? (
                <Add url={url} />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            }
          />
          <Route
            path='/list'
            element={
              isAdminAuthenticated ? (
                <List url={url} />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            }
          />
          <Route
            path='/orders'
            element={
              isAdminAuthenticated ? (
                <Order url={url} />
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