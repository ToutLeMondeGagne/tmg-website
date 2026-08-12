# Site web TMG — Guide technique

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Structure des fichiers](#structure-des-fichiers)
3. [Modifier le contenu du site](#modifier-le-contenu-du-site)
4. [Panneau d'administration](#panneau-dadministration)
5. [Déploiement sur SiteGround](#déploiement-sur-siteground)
6. [Changer le mot de passe admin](#changer-le-mot-de-passe-admin)
7. [Pages du site](#pages-du-site)
8. [Technologies utilisées](#technologies-utilisées)

---

## Vue d'ensemble

Le site TMG est une application React (Vite + Tailwind CSS) hébergée sur SiteGround. Tout le contenu textuel du site (titres, descriptions, boutons, etc.) est centralisé dans un seul fichier — ce qui permet de le modifier facilement via le panneau d'administration en ligne, sans toucher au code.

---

## Structure des fichiers

```
tmg-website/
├── public/
│   ├── api/                    ← Scripts PHP côté serveur (SiteGround)
│   │   ├── admin-auth.php      ← Authentification admin
│   │   ├── admin-config.php    ← MOT DE PASSE ADMIN (fichier privé, sur SiteGround uniquement)
│   │   ├── content.php         ← Sauvegarde/lecture du contenu JSON
│   │   └── contact.php         ← Envoi des formulaires de contact
│   └── content/
│       └── site-content.json   ← Contenu sauvegardé via l'admin (créé automatiquement)
├── src/
│   ├── content/
│   │   ├── defaultSiteContent.js   ← CONTENU PAR DÉFAUT de toutes les pages
│   │   └── siteContentFields.js    ← Définition des champs dans l'admin
│   ├── context/
│   │   └── SiteContentContext.jsx  ← Fournit le contenu à toutes les pages
│   ├── pages/                  ← Une page = un fichier
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Stage.jsx
│   │   ├── Contact.jsx
│   │   ├── QA.jsx
│   │   └── Admin.jsx           ← Panneau d'administration
│   └── components/             ← Composants réutilisables (boutons, cartes, etc.)
├── dist/                       ← Dossier de build (à uploader sur SiteGround)
└── package.json
```

---

## Modifier le contenu du site

### Option 1 — Via le panneau admin (recommandé, sans code)

Accéder à `https://tmgconsultation.org/admin`, se connecter, modifier les textes, puis cliquer **Enregistrer**. Les changements sont visibles immédiatement sur le site.

### Option 2 — Directement dans le code

Le fichier `src/content/defaultSiteContent.js` contient tout le contenu par défaut. Chaque section correspond à une page :

```js
export const defaultSiteContent = {
  global: { ... },   // Éléments communs (email, réseaux)
  home:   { ... },   // Page d'accueil
  about:  { ... },   // Page À propos
  services: { ... }, // Page Services
  stage:  { ... },   // Page Stagiaires
  contact: { ... },  // Page Contact
  faq:    { ... },   // Page FAQ/Questions
}
```

Après modification de ce fichier, il faut rebuilder et redéployer (voir section Déploiement).

---

## Panneau d'administration

**URL :** `https://tmgconsultation.org/admin`

Le panneau admin permet de :
- Modifier tous les textes du site (titres, descriptions, boutons)
- Gérer les candidatures de stagiaires
- Gérer les comptes partenaires
- Consulter les leads / demandes de contact

> Le panneau admin fonctionne **uniquement sur SiteGround** (pas en local), car il dépend des scripts PHP.

---

## Déploiement sur SiteGround

### Étapes à chaque modification de code

1. **Ouvrir un terminal** dans le dossier du projet

2. **Builder le projet :**
   ```bash
   npm run build
   ```
   Cela génère le dossier `dist/`.

3. **Zipper le contenu de `dist/` :**
   ```bash
   # Windows PowerShell
   Compress-Archive -Path dist\* -DestinationPath site.zip -Force
   ```

4. **Sur SiteGround (File Manager) :**
   - Aller dans `public_html/`
   - Supprimer les anciens fichiers (sauf `api/` et `content/`)
   - Uploader `site.zip` et l'extraire

> **Important :** Ne jamais supprimer le dossier `api/` sur SiteGround — il contient la config admin et les données.

---

## Changer le mot de passe admin

Le mot de passe est stocké **hashé** dans `public_html/api/admin-config.php` sur SiteGround.

### Étapes

1. **Générer le hash du nouveau mot de passe** (dans le terminal du projet) :
   ```bash
   php -r "echo password_hash('NOUVEAU_MOT_DE_PASSE', PASSWORD_DEFAULT);"
   ```

2. **Sur SiteGround (File Manager)**, ouvrir `public_html/api/admin-config.php` et remplacer la valeur de `password_hash` :
   ```php
   <?php
   return [
       'username'      => 'tmg',
       'password_hash' => '$2y$12$...hash généré...',
       'session_name'  => 'TMG_ADMIN_SESSION',
   ];
   ```

3. Sauvegarder. Le nouveau mot de passe est actif immédiatement.

---

## Pages du site

| URL | Fichier | Description |
|-----|---------|-------------|
| `/` | `Home.jsx` | Page d'accueil |
| `/about` | `About.jsx` | À propos de TMG |
| `/services` | `Services.jsx` | Services offerts |
| `/stage` | `Stage.jsx` | Offre de stage |
| `/contact` | `Contact.jsx` | Formulaire de contact |
| `/faq` | `QA.jsx` | Questions fréquentes |
| `/admin` | `Admin.jsx` | Panneau d'administration |
| `/partenaires` | `Partners.jsx` | Espace clients |

---

## Technologies utilisées

| Technologie | Rôle |
|-------------|------|
| React 18 | Framework JavaScript |
| Vite | Outil de build |
| Tailwind CSS | Styles |
| PHP (SiteGround) | API backend (auth, contenu, formulaires) |
| SiteGround | Hébergement |

---

## Développement local

```bash
# Installer les dépendances (une seule fois)
npm install

# Lancer le serveur de développement
npm run dev
# → Ouvrir http://localhost:5173

# Builder pour la production
npm run build
```

> En local, le panneau admin affiche un message d'avertissement — c'est normal. Il fonctionne uniquement sur SiteGround.
