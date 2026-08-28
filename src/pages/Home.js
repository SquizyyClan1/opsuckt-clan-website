import React, { useState, useEffect } from 'react';
import './Home.css';

function Home({ user, token, apiUrl }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchPlayers();
  }, [apiUrl]);

  if (loading) return <div className="home"><p style={{ textAlign: 'center', padding: '50px' }}>⏳ Lädt...</p></div>;

  return (
    <div className="home">
      <div className="hero">
        <h1>⚔️ Willkommen zum OPSucht Clan</h1>
        <p>Der beste Minecraft Clan auf dem Server!</p>
        {!user && (
          <div className="hero-buttons">
            <a href="/register" className="btn btn-primary">Jetzt Beitreten</a>
            <a href="/login" className="btn btn-secondary">Anmelden</a>
          </div>
        )}
      </div>

      <div className="container">
        <section className="section">
          <h2>📊 Clan Statistik</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{players.length}</h3>
              <p>Mitglieder</p>
            </div>
            <div className="stat-card">
              <h3>🏆</h3>
              <p>Gegründet 2024</p>
            </div>
            <div className="stat-card">
              <h3>⭐</h3>
              <p>Top Clan</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>👥 Clan Mitglieder</h2>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="players-grid">
            {players.length > 0 ? (
              players.map((player, idx) => (
                <div key={idx} className="player-card">
                  <img
                    src={`https://mc-heads.net/head/${player.minecraftName}/100`}
                    alt={player.minecraftName}
                    className="player-head"
                  />
                  <h3>{player.minecraftName}</h3>
                  <p>Discord: {player.discordName}</p>
                  <p className="player-status">✅ Mitglied</p>
                </div>
              ))
            ) : (
              <p>Noch keine genehmigten Mitglieder...</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
