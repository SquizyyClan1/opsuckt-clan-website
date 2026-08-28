import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ user, token, apiUrl }) {
  const [profile, setProfile] = useState(user);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Fehler beim Laden des Profils');
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/players`);
        if (!response.ok) throw new Error('Fehler beim Laden der Spieler');
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchPlayers();
  }, [apiUrl, token]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', color: '#4CAF50' }}><h2>⏳ Lädt...</h2></div>;

  return (
    <div className="dashboard-container">
      <div className="container">
        <h1>📊 Mein Dashboard</h1>
        {error && <div className="alert alert-error" style={{ maxWidth: '600px', margin: '20px auto' }}>{error}</div>}

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
              <p>📋 <strong>Gegründet:</strong> 2024</p>
              <p>👥 <strong>Mitglieder:</strong> {players.length}</p>
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
