import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import AuthContext
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext); // Get setIsLoggedIn from context
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login by checking if email and password are not empty
    if (email && password) {
      setIsLoggedIn(true); // Set the user as logged in
      navigate('/dashboard'); // Redirect to dashboard upon successful login
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );
};

export default Login;
