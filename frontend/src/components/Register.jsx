import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setToken, setUserId, setShowRegister }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', { email, username, password });
      setToken(res.data.token);
      setUserId(res.data._id);
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register for SecureShop</h2>
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div>
          <label>Username: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <button onClick={() => setShowRegister(false)} style={{ marginTop: '10px' }}>
        Back to Login
      </button>
    </div>
  );
};

export default Register;
