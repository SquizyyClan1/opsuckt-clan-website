import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel({ token, apiUrl }) {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedPlayers, setApprovedPlayers] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Lade ausstehende Genehmigungen
      const pendingRes = await fetch(`${apiUrl}/api/admin/pending`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (pendingRes.ok) {
        const pending = await pendingRes.json();
        setPendingUsers(pending.filter(u => !u.approved));
      }

      // Lade genehmigte Spieler
      const playersRes = await fetch(`${apiUrl}/api/players`);
      if (playersRes.ok) {
        const players = await playersRes.json();
        setApprovedPlayers(players);
      }
    } catch (err) {
      setMessage('Fehler beim Laden der Daten: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/approve/${userId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ ${data.user.minecraftName} wurde genehmigt!`);
        loadData();
      } else {
        setMessage('Fehler: ' + data.error);
      }
    } catch (err) {
      setMessage('Fehler: ' + err.message);
    }
  };

  const rejectUser = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/reject/${userId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Benutzer wurde abgelehnt.');
        loadData();
      } else {
        setMessage('Fehler: ' + data.error);
      }
    } catch (err) {
      setMessage('Fehler: ' + err.message);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', color: '#4CAF50' }}><h2>⏳ Lädt...</h2></div>;

  return (
    <div className="admin-container">
      <div className="container">
        <h1>🔧 Admin Panel</h1>
        <p className="admin-subtitle">Verwalte Clan-Mitglieder und Genehmigungen</p>

        {message && (
          <div className="alert" style={{
            backgroundColor: message.includes('✅') ? '#4CAF50' : '#f44336',
            color: 'white',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px',
            maxWidth: '600px',
            margin: '0 auto 20px'
          }}>
            {message}
          </div>
        )}

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            ⏳ Ausstehend ({pendingUsers.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            ✅ Genehmigt ({approvedPlayers.length})
          </button>
        </div>

        {activeTab === 'pending' && (
          <div className="admin-section">
            <h2>Ausstehende Anmeldungen</h2>
            {pendingUsers.length > 0 ? (
              <div className="users-list">
                {pendingUsers.map(user => (
                  <div key={user.id} className="user-item pending">
                    <div className="user-info">
                      <h3>{user.minecraftName}</h3>
                      <p><strong>Account:</strong> {user.username}</p>
                      <p><strong>Discord:</strong> {user.discordName}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                    </div>
                    <div className="user-actions">
                      <button
                        className="btn-approve"
                        onClick={() => approveUser(user.id)}
                      >
                        ✅ Genehmigen
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => rejectUser(user.id)}
                      >
                        ❌ Ablehnen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">Keine ausstehenden Anmeldungen</p>
            )}
          </div>
        )}

        {activeTab === 'approved' && (
          <div className="admin-section">
            <h2>Genehmigte Clan-Mitglieder</h2>
            {approvedPlayers.length > 0 ? (
              <div className="players-list">
                {approvedPlayers.map(player => (
                  <div key={player.id} className="player-item">
                    <img
                      src={`https://mc-heads.net/head/${player.minecraftName}/100`}
                      alt={player.minecraftName}
                      className="player-head-admin"
                    />
                    <div className="player-info">
                      <h3>{player.minecraftName}</h3>
                      <p><strong>Discord:</strong> {player.discordName}</p>
                      <p><strong>Genehmigt:</strong> {new Date(player.approvedAt).toLocaleDateString('de-DE')}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">Noch keine genehmigten Mitglieder</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
