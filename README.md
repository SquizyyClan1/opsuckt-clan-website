# 🎮 OPSucht Clan Website

Eine moderne Clan-Website für den Minecraft Server OPSucht mit Admin Panel und Spielerkopf-Integration.

## 🚀 Features

- **👤 User Authentication**
  - Login & Registrierung
  - Sichere Speicherung via localStorage

- **🔧 Admin Panel**
  - Verwalte ausstehende Anmeldungen
  - Genehmige oder lehne Spieler ab
  - Entferne genehmigte Mitglieder

- **🎨 Minecraft Integration**
  - Automatische Spielerkopf-Anzeige
  - Nur der Minecraft-Name muss eingegeben werden
  - Nutzt mc-heads.net API

- **📊 Dashboard**
  - Persönliches Profil
  - Status der Freischaltung
  - Clan-Statistiken

- **📱 Responsive Design**
  - Funktioniert auf allen Geräten
  - Modern Dark Theme
  - Smooth Animations

## 📦 Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm start

# Für Production bauen
npm run build

# Deployen auf GitHub Pages
npm run deploy
```

## 🏗️ Technologie Stack

- **Frontend:** React 18
- **Routing:** React Router v6
- **Styling:** CSS3
- **Storage:** localStorage
- **Minecraft API:** mc-heads.net
- **Deployment:** GitHub Pages

## 🎯 Bedienung

### Als normaler Spieler:
1. Registrierung mit Minecraft-Name
2. Warten auf Admin-Genehmigung
3. Nach Genehmigung im Clan-Verzeichnis sichtbar

### Als Admin:
1. Login mit Admin-Account
2. Admin Panel aufrufen
3. Ausstehende Anmeldungen überprüfen
4. Genehmigen oder Ablehnen
5. Genehmigte Mitglieder verwalten

## 📝 Admin Account erstellen

Um einen Admin-Account zu erstellen:

1. Browser Console öffnen (F12)
2. Folgendes ausführen:

```javascript
const adminUser = {
  id: Date.now(),
  username: 'admin',
  password: 'admin123',
  email: 'admin@opsuckt.de',
  minecraftName: 'AdminName',
  discordName: 'Admin#1234',
  role: 'admin',
  approved: true
};

const users = JSON.parse(localStorage.getItem('users') || '[]');
users.push(adminUser);
localStorage.setItem('users', JSON.stringify(users));
```

3. Seite neu laden und mit Admin-Daten anmelden

## 🌍 Live Demo

https://SquizyyClan1.github.io/opsuckt-clan-website/

## 📄 Lizenz

MIT License - frei nutzbar

## 👨‍💻 Entwickelt von

SquizyyClan1
