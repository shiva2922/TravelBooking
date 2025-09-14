import { useState } from 'react';
import api from '../services/api';
import { setToken } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import '../cssfiles/Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      alert('Logged in successfully');
      navigate('/');
    } catch (error) {
      alert(error.response.data.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="logo">✈️</div>
        <h2>Log In to Journey Booking Platform</h2>
        <p>Welcome back! Please enter your credentials to continue.</p>
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot">
            <a>Forgot password?</a>
          </div>
          <button type="submit">Log In</button>
        </form>
        <p className="signup-text">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
