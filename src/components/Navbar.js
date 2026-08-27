import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ⚔️ OPSucht Clan
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Startseite</Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
              {user.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link admin-link">Admin Panel</Link>
                </li>
              )}
              <li className="nav-item">
                <span className="nav-user">{user.username}</span>
              </li>
              <li className="nav-item">
                <button onClick={onLogout} className="btn-logout">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Registrieren</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
