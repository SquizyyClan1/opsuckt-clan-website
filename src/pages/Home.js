import React, { useState, useEffect } from 'react';
import './Home.css';

function Home({ user }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Lade Spieler aus localStorage
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      const allPlayers = JSON.parse(savedPlayers);
      setPlayers(allPlayers.filter(p => p.approved));
    }
  }, []);

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
