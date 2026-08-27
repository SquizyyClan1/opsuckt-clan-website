import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === formData.username && u.password === formData.password);

    if (user) {
      onLogin(user);
      navigate('/dashboard');
    } else {
      setError('Benutzername oder Passwort falsch!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>⚔️ Login</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Benutzername:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Passwort:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Anmelden</button>
        </form>
        <p>Noch kein Account? <a href="/register">Hier registrieren</a></p>
      </div>
    </div>
  );
}

export default Login;
