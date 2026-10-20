# Ma Watchlist : corrigé

Corrigé de référence du sujet « Ma Watchlist » : composants, useState, useEffect, useNavigate, sans API.

```bash
npm install
npm run dev      # http://localhost:5173
npx vitest run   # 8 tests
```

Les quatre effets :

| Effet | Fichier | Nettoyage |
|---|---|---|
| Sauvegarde dans le localStorage | `App.jsx` | aucun |
| Titre de l'onglet | `App.jsx` | aucun |
| Notification qui disparaît après 3 s | `components/Notification.jsx` | `clearTimeout` |
| Redirection après 5 s | `pages/Introuvable.jsx` | `clearTimeout` |
