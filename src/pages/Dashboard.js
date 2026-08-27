import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ user }) {
  const [profile, setProfile] = useState(user);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find(u => u.id === user.id);
    if (currentUser) {
      setProfile(currentUser);
    }
  }, [user]);

  return (
    <div className="dashboard-container">
      <div className="container">
        <h1>📊 Mein Dashboard</h1>

        <div className="dashboard-grid">
          <div className="card">
            <h2>Profil Informationen</h2>
            <div className="profile-section">
              <img
                src={`https://mc-heads.net/head/${profile.minecraftName}/150`}
                alt={profile.minecraftName}
                className="profile-head"
              />
              <div className="profile-info">
                <p><strong>Benutzername:</strong> {profile.username}</p>
                <p><strong>Minecraft Name:</strong> {profile.minecraftName}</p>
                <p><strong>Discord:</strong> {profile.discordName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p>
                  <strong>Status:</strong>
                  <span className={profile.approved ? 'status-approved' : 'status-pending'}>
                    {profile.approved ? '✅ Genehmigt' : '⏳ Ausstehend'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>Clan Info</h2>
            <div className="clan-info">
              <p>⚔️ <strong>Clan Name:</strong> OPSucht</p>
              <p>🎮 <strong>Server:</strong> Minecraft Java Edition</p>
              <p>📍 <strong>Gegründet:</strong> 2024</p>
              <p>👥 <strong>Mitglieder:</strong> {JSON.parse(localStorage.getItem('players') || '[]').length}</p>
              {message && (
                <div className="alert alert-info">{message}</div>
              )}
            </div>
          </div>
        </div>

        {!profile.approved && (
          <div className="pending-notice">
            <h3>⏳ Freischaltung Ausstehend</h3>
            <p>Dein Account wurde noch nicht vom Admin genehmigt. Du erscheinst noch nicht in der Clan-Liste.</p>
            <p>Der Admin wird dich in Kürze überprüfen und freischalten.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
