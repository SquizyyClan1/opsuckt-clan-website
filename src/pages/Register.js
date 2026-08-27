import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    minecraftName: '',
    discordName: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(u => u.username === formData.username)) {
      setError('Benutzername existiert bereits!');
      return;
    }

    const newUser = {
      ...formData,
      role: 'user',
      approved: false,
      id: Date.now()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Registrierung erfolgreich! Der Admin muss dich noch freischalten.');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>📝 Registrieren</h1>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
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
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Minecraft Name (wird angezeigt):</label>
            <input
              type="text"
              name="minecraftName"
              value={formData.minecraftName}
              onChange={handleChange}
              placeholder="z.B. Steve"
              required
            />
          </div>
          <div className="form-group">
            <label>Discord Name:</label>
            <input
              type="text"
              name="discordName"
              value={formData.discordName}
              onChange={handleChange}
              placeholder="z.B. User#1234"
              required
            />
          </div>
          <button type="submit" className="btn-submit">Registrieren</button>
        </form>
        <p>Bereits ein Account? <a href="/login">Hier anmelden</a></p>
      </div>
    </div>
  );
}

export default Register;
