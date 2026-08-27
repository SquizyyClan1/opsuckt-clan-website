import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedPlayers, setApprovedPlayers] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    loadPendingUsers();
    loadApprovedPlayers();
  }, []);

  const loadPendingUsers = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const pending = users.filter(u => !u.approved && u.role === 'user');
    setPendingUsers(pending);
  };

  const loadApprovedPlayers = () => {
    const players = JSON.parse(localStorage.getItem('players') || '[]');
    setApprovedPlayers(players);
  };

  const approveUser = (userId) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === userId);

    if (user) {
      user.approved = true;

      // Speichere als Player
      const players = JSON.parse(localStorage.getItem('players') || '[]');
      players.push({
        id: userId,
        minecraftName: user.minecraftName,
        discordName: user.discordName,
        username: user.username,
        approved: true,
        approvedAt: new Date().toLocaleString('de-DE')
      });

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('players', JSON.stringify(players));

      loadPendingUsers();
      loadApprovedPlayers();
      alert(`${user.minecraftName} wurde genehmigt!`);
    }
  };

  const rejectUser = (userId) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadPendingUsers();
    alert('Benutzer wurde abgelehnt.');
  };

  const removePlayer = (userId) => {
    const players = JSON.parse(localStorage.getItem('players') || '[]');
    const updatedPlayers = players.filter(p => p.id !== userId);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
    loadApprovedPlayers();
    alert('Spieler wurde entfernt.');
  };

  return (
    <div className="admin-container">
      <div className="container">
        <h1>🔧 Admin Panel</h1>
        <p className="admin-subtitle">Verwalte Clan-Mitglieder und Genehmigungen</p>

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
                      <p><strong>Genehmigt:</strong> {player.approvedAt}</p>
                    </div>
                    <button
                      className="btn-remove"
                      onClick={() => removePlayer(player.id)}
                    >
                      🗑️ Entfernen
                    </button>
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
