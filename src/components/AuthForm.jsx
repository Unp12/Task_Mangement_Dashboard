import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      setLoading(true);
      try {
      const res = await axios.post(`/api/users/login`, {
        username,
        password,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/tasks');
      } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error(err);
      } finally {
      setLoading(false);
      }
    } else {
      setLoading(true);
      try {
      await axios.post(`/api/users/register`, {
        username,
        password,
      });
      // On successful registration, clear error and navigate to login form
      setError('');
      navigate('/login');
      } catch (err) {
      // Show specific error message from server if available
      if (err.response && err.response.data && (err.response.data.message || err.response.data.error)) {
        setError(`Registration failed: ${err.response.data.message || err.response.data.error}`);
      } else if (err.response && err.response.status === 500) {
        setError('Registration failed due to a server error. Please try again later.');
      } else if (err.message) {
        setError(`Registration failed: ${err.message}`);
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error(err);
      } finally {
      setLoading(false);
      }
    }
    return; 
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h1>Task Management Dashboard</h1>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <div className="error">{error}</div>}
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
      <button type="submit" disabled={loading}>
        {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;