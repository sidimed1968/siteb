# Guide : Mode Maintenance et Gestion des Pages

## Fonctionnalités de maintenance

L'admin peut maintenant gérer facilement la maintenance du site en contrôlant deux modes :

### 1. Mode Maintenance Global

Lorsque activé, **tous les visiteurs** voir une page de maintenance et ne peuvent accéder à aucune page du site (sauf `/api/*` et `/connexion`).

**Utilisation :**
- Aller à : `Admin → Paramètres du site → 🔧 Mode maintenance`
- Cocher : `🟠 Activé`
- Configurer :
  - **Titre (FR/AR)** : Titre affiché sur la page de maintenance
  - **Message (FR/AR)** : Message expliquant la maintenance
  - **Image** : Image optionnelle pour décorer la page

### 2. Pages Désactivées Individuelles

Désactiver des pages spécifiques **sans activer le mode maintenance global**. Les pages désactivées affichent une page 404.

**Pages disponibles :**
- `annuaire` - Annuaire des professionnels
- `inscription` - Formulaire d'inscription
- `actualites` - Actualités
- `professions` - Professions couvertes
- `contact` - Formulaire de contact
- `a-propos` - Page à propos

**Utilisation :**
- Aller à : `Admin → Paramètres du site → 🔧 Mode maintenance`
- Dans la section "Pages à désactiver individuellement"
- Entrer les noms (une par ligne) :
  ```
  annuaire
  inscription
  ```
- Enregistrer

### 3. Pages Accessibles Même en Maintenance

- ✅ Admin (`/admin/*`)
- ✅ API (`/api/*`)
- ✅ Connexion (`/connexion`)
- ✅ Accueil (`/`)
- ✅ Page maintenance (`/maintenance`)

## Workflow Recommandé

### Avant une maintenance majeure

```
1. Activer mode maintenance global
2. Configurer le titre et le message
3. Enregistrer
4. Effectuer la maintenance
5. Désactiver le mode maintenance
```

### Pour des mises à jour de sections

```
1. Désactiver la page spécifique (ex: annuaire)
2. Travailler sur le contenu
3. Valider les changements
4. Réactiver la page
```

## Configuration recommandée

### Titre de maintenance (FR)
```
Site en maintenance
```

### Titre de maintenance (AR)
```
الموقع قيد الصيانة
```

### Message (FR)
```
Nous effectuons une maintenance importante pour vous offrir une meilleure expérience. 
Veuillez revenir dans quelques minutes.
```

### Message (AR)
```
نقوم بصيانة مهمة لتحسين تجربتك.
يرجى العودة في غضون دقائق قليلة.
```

## Vérification

Pour tester que le mode maintenance fonctionne :

```bash
# Vérifier l'état de la maintenance
curl https://votre-site.vercel.app/api/admin/maintenance

# Accéder à la page de maintenance
curl https://votre-site.vercel.app/maintenance
```

## Dépannage

**Le mode maintenance n'est pas appliqué immédiatement**
→ Rafraîchir le cache navigateur ou attendre quelques secondes

**Les pages désactivées ne retournent pas une 404**
→ Le middleware gère les redirections. Vérifier que les noms de pages sont corrects

**Les visiteurs voient toujours l'ancienne page**
→ Vérifier que l'enregistrement des paramètres a réussi (message ✅)
