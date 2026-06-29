# Déploiement SiteGround avec admin de contenu

Ce projet reste un site React/Vite statique, mais l’admin utilise une petite API PHP compatible avec un hébergement mutualisé SiteGround.

## 1. Construire le site

Utiliser Node 20, puis lancer :

```bash
npm run build
```

Le dossier à envoyer sur SiteGround est `dist/`.

## 2. Envoyer les fichiers sur SiteGround

Dans SiteGround, ouvrir le gestionnaire de fichiers ou utiliser FTP/SFTP.

Envoyer le contenu de `dist/` dans le dossier public du domaine, généralement :

```text
public_html/
```

Il faut envoyer le contenu de `dist/`, pas le dossier `dist` lui-même.

Le fichier `.htaccess` inclus dans le build est important : il permet aux routes React comme `/contact`, `/services/web` et `/admin` de fonctionner même après rafraîchissement.

Le build retire automatiquement `dist/api/admin-config.php` s’il existe, pour éviter d’envoyer un fichier secret local. Ce fichier doit être créé directement sur SiteGround.

## 3. Configurer le compte admin

Sur SiteGround, créer ce fichier :

```text
public_html/api/admin-config.php
```

Générer d’abord un hash du mot de passe sur votre machine :

```bash
php -r 'echo password_hash("votre-mot-de-passe-fort", PASSWORD_DEFAULT), PHP_EOL;'
```

Mettre ensuite ce contenu en remplaçant `admin` au besoin et en collant le hash généré :

```php
<?php
return [
    'username' => 'admin',
    'password_hash' => 'coller-le-hash-du-mot-de-passe',
    'session_name' => 'TMG_ADMIN_SESSION',
];
```

Ce fichier n’est pas versionné par Git.

Si un ancien `public_html/api/admin-config.php` existe déjà avec l’ancien format `token`, le remplacer par le nouveau format `username` + `password_hash`.

## 4. Vérifier les permissions

Le fichier suivant doit être modifiable par PHP :

```text
public_html/content/site-content.json
```

Si la sauvegarde admin échoue, donner les permissions d’écriture au fichier ou au dossier `content`.

## 5. Utiliser l’admin

Ouvrir :

```text
https://votre-domaine.com/admin
```

Entrer l’identifiant admin et le mot de passe, modifier les champs,
prévisualiser, puis sauvegarder.

## Notes importantes

- L’admin couvre les textes centralisés dans `defaultSiteContent.js`.
- La sauvegarde est protégée par une session PHP créée après connexion.
- L’URL `/admin` reste accessible, mais les actions de modification exigent le compte admin.
- Le contenu public reste lisible dans `/content/site-content.json`, ce qui est normal pour un site vitrine.
