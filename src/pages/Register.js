import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Register({ apiUrl }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    minecraftName: '',
    discordName: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registrierung fehlgeschlagen');
      }

      setSuccess('Registrierung erfolgreich! Der Admin muss dich noch freischalten.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? '⏳ Registriert...' : 'Registrieren'}
          </button>
        </form>
        <p>Bereits ein Account? <a href="/login">Hier anmelden</a></p>
      </div>
    </div>
  );
}

export default Register;
