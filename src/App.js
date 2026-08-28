import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard';

const API_URL = process.env.REACT_APP_API_URL || 'https://opsuckt-clan-backend.replit.dev';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Überprüfe localStorage für Token
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAdmin(JSON.parse(savedUser).role === 'admin');
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsAdmin(userData.role === 'admin');
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (loading) {
    return (
      <div className="App">
        <div style={{ textAlign: 'center', padding: '50px', color: '#4CAF50' }}>
          <h2>⏳ Lädt...</h2>
        </div>
      </div>
    );
  }

  return (
    <Router basename="/opsuckt-clan-website">
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} token={token} apiUrl={API_URL} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} apiUrl={API_URL} />} />
        <Route path="/register" element={<Register apiUrl={API_URL} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} token={token} apiUrl={API_URL} /> : <Login onLogin={handleLogin} apiUrl={API_URL} />} />
        <Route path="/admin" element={isAdmin ? <AdminPanel token={token} apiUrl={API_URL} /> : <Home user={user} token={token} apiUrl={API_URL} />} />
      </Routes>
    </Router>
  );
}

export default App;
