import React, { useState } from 'react';
import './AdminLogin.css';

const validUsers = [
  { username: 'admin1', password: 'pass1', role: 'admin' },
  { username: 'del1', password: 'pass1', role: 'delivery' },
];

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const user = validUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      onLogin(user.role); // Pass the user's role (admin or delivery)
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AdminLogin;