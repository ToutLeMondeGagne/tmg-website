# 🚀 Guide de déploiement TMG

Ce guide explique comment déployer le site TMG en production sans perdre les modifications faites via l'admin.

## ⚡ Déploiement rapide (recommandé)

### 1️⃣ Première fois : configuration

```bash
npm run deploy:setup
```

Cela crée un fichier `.deployrc` (non versionné) où tu dois ajouter tes identifiants SiteGround :

```bash
# Ouvre et édite .deployrc
nano .deployrc
```

Remplis les infos :
```
DEPLOY_HOST=c-XX.web-hosting.com  # Ton hôte SiteGround
DEPLOY_USER=your_username          # Ton user SFTP/SSH
DEPLOY_PATH=/home/your_username/public_html  # Chemin distant
```

### 2️⃣ À chaque déploiement

```bash
npm run deploy
```

Cela va :
1. ✅ Lancer `npm run build` (compile le site)
2. ✅ Copier les fichiers vers SiteGround **sauf `content/` (modifications admin)**
3. ✅ Afficher un message de succès avec les URLs

## 🔒 Sécurité

- `.deployrc` est dans `.gitignore` → tes identifiants ne seront jamais committés
- Le script utilise `rsync` → transfert sécurisé et efficace
- Le dossier `content/` est exclu → tes textes éditables restent intacts

## 📋 Fichiers exclu du déploiement

Les fichiers **suivants ne seront JAMAIS overwrités** en prod :

```
content/site-content.json     ← Modifications admin
.env                           ← Variables d'environnement
```

## 🛠️ Dépannage

### Error: rsync command not found

SiteGround doit avoir rsync. Si c'est pas le cas, utilise **SFTP via File Manager** à la place (voir ci-dessous).

### Je veux vérifier avant de déployer

Lance simplement :

```bash
npm run build
# Puis vérifie le dossier dist/ avant de lancer le deploy
```

### Je préfère un déploiement manuel (SFTP/File Manager)

1. Lance `npm run build`
2. Via **File Manager SiteGround** :
   - Va dans `public_html`
   - Copie **tout** depuis le dossier `dist/` **SAUF le dossier `content/`**
3. Vérifiez que le site est à jour sur https://tmgconsultation.org

## 📝 Workflow recommandé

```bash
# 1. Fais tes changements en local
git checkout -b feature/xyz
# ... édite les fichiers ...
npm run build
npm run preview  # Vérifie en local

# 2. Commit et push
git add .
git commit -m "feat: description"
git push origin feature/xyz

# 3. Déploie en prod
npm run deploy

# 4. Vérifie sur le site en ligne
# https://tmgconsultation.org
```

## 🚨 Important : Admin vs Déploiement

- **Modifications via l'admin** (textes, images) → sauvegardées dans `content/site-content.json` → **jamais écrasées par le déploiement**
- **Modifications en code** (structure, components, CSS) → déployées via `npm run deploy`

Ça signifie : tu peux corriger le code en local et redéployer sans peur de perdre les textes que ton client a changés dans l'admin ! 🎯

---

Pour questions : vérifie que `.deployrc` est bien configuré et que `rsync` est disponible sur le serveur.
