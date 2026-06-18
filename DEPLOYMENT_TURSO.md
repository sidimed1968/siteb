# Guide de Déploiement avec Turso

## Correction de la Base de Données

Les corrections apportées au code :

1. **Ajout de `ensureDatabase()` à tous les endpoints API** - Cette fonction initialise les tables de base de données au premier appel, ce qui est crucial pour Turso.

2. **Routes corrigées** :
   - `POST /api/registrations` - Création des demandes d'inscription
   - `POST /api/inscription` - Inscription des professionnels
   - `POST /api/contact` - Formulaire de contact
   - `POST /api/seed` - Création de données de démonstration
   - Tous les endpoints `/api/admin/*` - Gestion admin

## Configuration Turso

### 1. Créer une base de données Turso

```bash
# Installer Turso CLI
npm install -g turso

# Se connecter
turso auth login

# Créer une nouvelle base de données
turso db create onps-prod

# Obtenir l'URL et le token
turso db tokens create onps-prod
```

### 2. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your_token_here
NODE_ENV=production
ADMIN_PASSWORD=votre_mot_de_passe_securise
```

### 3. Déployer sur Netlify

1. Pusher le code vers GitHub
2. Connecter le repository à Netlify
3. Ajouter les variables d'environnement dans Netlify :
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `ADMIN_PASSWORD`

### 4. Vérifier le déploiement

```bash
# Endpoint de santé
curl https://votre-site.netlify.app/api/health

# Créer un utilisateur admin
curl https://votre-site.netlify.app/api/seed -X POST
```

## Architecture de la Base de Données

Turso utilise SQLite avec réplication, parfait pour :
- ✅ Performances rapides
- ✅ Pas de serveur à gérer
- ✅ Réplication multi-région
- ✅ Backup automatique

## Points Importants

- Les tables sont créées automatiquement au premier appel via `ensureDatabase()`
- Le compte admin par défaut (admin/admin123) est créé automatiquement
- Les données sont persistent dans Turso cloud
- Temps de réponse très rapide (~100ms)
