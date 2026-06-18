# Instructions de Déploiement sur Vercel

## ✅ Préparation complète - Prêt pour le déploiement !

Le projet a été préparé avec :
- ✅ Build Next.js qui fonctionne
- ✅ Configuration Vercel (vercel.json)
- ✅ Git repository initialisé
- ✅ .gitignore optimisé
- ✅ Documentation (README.md)

## 📋 Prochaines étapes

### 1️⃣ Créer un repository GitHub

**Option A : Depuis la ligne de commande**

```bash
# Créer un nouveau repository sur GitHub (vide, sans README)
# Puis pousser le code :

git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git branch -M main
git push -u origin main
```

**Option B : Via l'interface GitHub**

1. Aller sur https://github.com/new
2. Créer un nouveau repository nommé `onps-site` (vide)
3. Copier le lien HTTPS/SSH
4. Exécuter :
```bash
git remote add origin <lien_copié>
git branch -M main
git push -u origin main
```

### 2️⃣ Préparer les identifiants Turso

1. Aller sur https://app.turso.io
2. Créer une nouvelle base de données (ex: "onps-prod")
3. Récupérer :
   - `TURSO_DATABASE_URL` - URL de la base
   - `TURSO_AUTH_TOKEN` - Token d'authentification

### 3️⃣ Connecter Vercel

1. Aller sur https://vercel.com/new
2. Importer le repository GitHub
3. Remplir les variables d'environnement :
   - `TURSO_DATABASE_URL` = URL Turso
   - `TURSO_AUTH_TOKEN` = Token Turso
   - `ADMIN_PASSWORD` = Mot de passe admin (optionnel)

4. Cliquer "Deploy" 🚀

### 4️⃣ Initialiser la base de données

Une fois déployé sur Vercel :

```bash
# Initialiser les tables et créer l'utilisateur admin
curl -X POST https://votre-domaine.vercel.app/api/seed

# Vérifier la connexion
curl https://votre-domaine.vercel.app/api/health
```

## 🔒 Sécurité

- ⚠️ **Ne jamais pusher** `.env.local` sur GitHub
- ✅ `.env.local` est dans `.gitignore`
- ✅ Les secrets Turso doivent être configurés dans Vercel uniquement

## 📊 Monitoring

Après le déploiement :

- Dashboard Vercel : https://vercel.com/dashboard
- Logs temps réel : Cliquer sur le projet > Deployments
- Performance : Analytics dans Vercel

## 🐛 Troubleshooting

### Build échoue
→ Vérifier les logs dans Vercel Dashboard > Deployments > Build Logs

### API inaccessible
→ Vérifier les variables d'environnement dans Vercel Settings > Environment Variables

### Erreurs de base de données
→ Vérifier que Turso est accessible : `curl TURSO_DATABASE_URL`

---

**Besoin d'aide ?**
- Vercel: https://vercel.com/docs
- Turso: https://docs.turso.tech
- Next.js: https://nextjs.org/docs
