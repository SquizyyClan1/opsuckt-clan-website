# 🎮 OPSucht Clan Website

Eine moderne Clan-Website für den Minecraft Server OPSucht mit Admin Panel und echtem Backend!

## 🚀 Architektur

```
├── Frontend (GitHub Pages)
│   └── React App
│       ├── Login/Register
│       ├── Dashboard
│       └── Admin Panel
│
└── Backend (Replit)
    └── Node.js Express
        ├── JWT Authentication
        ├── User Management
        └── Approval System
```

## ✨ Features

✅ **Echtes Login-System** mit JWT Token  
✅ **Sichere Passwörter** mit bcryptjs  
✅ **Admin Panel** zum Freischalten von Spielern  
✅ **Minecraft Spielerkopf** Integration  
✅ **Responsive Design** für alle Geräte  
✅ **Echte Datenbank** (Backend)

## 🔗 URLs

### Frontend (GitHub Pages)
```
https://SquizyyClan1.github.io/opsuckt-clan-website/
```

### Backend (Replit)
```
https://opsuckt-clan-backend.replit.dev
```

## 🔑 Admin-Daten (Demo)

- **Username:** `admin`
- **Passwort:** `admin123`
- **Minecraft:** `AdminSpieler`

⚠️ WICHTIG: Ändere dies in der Produktion!

## 📱 So funktioniert's

### Für Spieler:
1. Auf der Website registrieren
2. Admin genehmigt die Anmeldung
3. Du erscheinst automatisch in der Clan-Liste

### Für Admins:
1. Mit Admin-Account anmelden
2. Admin Panel öffnen
3. Ausstehende Spieler genehmigen/ablehnen
4. Genehmigte Spieler verwalten

## 🛠️ Setup

### Backend auf Replit

1. Öffne https://replit.com
2. Klick "Create" → "Import from GitHub"
3. Paste: `https://github.com/SquizyyClan1/opsuckt-clan-website-backend`
4. Klick "Import" und "Run"
5. Kopiere die Replit-URL (z.B. https://opsuckt-clan-backend.replit.dev)

### Frontend Config

In `src/App.js` Zeile 9 ggf. anpassen:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'https://opsuckt-clan-backend.replit.dev';
```

## 📦 Installation lokal

```bash
# Frontend
cd opsuckt-clan-website
npm install
npm start

# Backend (anderen Terminal)
cd opsuckt-clan-website-backend
npm install
npm start
```

## 🌍 Deployment

### Frontend zu GitHub Pages
```bash
npm run deploy
```

### Backend zu Replit
1. Push zu GitHub
2. Replit importiert automatisch
3. Klick "Run"

## 📚 API Dokumentation

Siehe: `opsuckt-clan-website-backend/README.md`

## 📝 Lizenz

MIT License - frei nutzbar

## 👨‍💻 Support

Bei Fragen: GitHub Issues erstellen
