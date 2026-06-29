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

## 3. Configurer le token admin

Sur SiteGround, créer ce fichier :

```text
public_html/api/admin-config.php
```

Mettre ce contenu en remplaçant le token :

```php
<?php
return [
    'token' => 'un-token-long-secret-a-changer',
];
```

Ce fichier n’est pas versionné par Git.

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

Entrer le token admin, modifier les champs, prévisualiser, puis sauvegarder.

## Notes importantes

- La première version admin couvre les textes principaux de la page d’accueil.
- Le même système peut être étendu aux pages PME, OBNL, Stagiaires, Services et Contact.
- Le token protège la sauvegarde, mais l’URL `/admin` reste accessible. Le vrai contrôle est côté API PHP.
- Le contenu public reste lisible dans `/content/site-content.json`, ce qui est normal pour un site vitrine.
