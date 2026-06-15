# CLAUDE.md — TMG Consultation

Ce fichier est lu automatiquement par Claude Code à chaque session.
Il résume les règles, conventions et architecture du projet TMG Consultation.
Les documents sources complets sont dans le dossier `/docs` du repo.

---

## Stack technique

| Élément | Choix |
|---|---|
| Frontend | React + Vite |
| Style | Tailwind CSS |
| Animations | Framer Motion |
| Navigation | React Router v7 |
| Formulaires | React Hook Form + EmailJS ou Formspree |
| Hébergement | SiteGround (export statique) |

> ⚠️ Pas de backend Node.js. Le build doit produire un `dist/` entièrement statique via `npm run build`.

---

## Structure des dossiers

```
src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── logos/
├── components/
│   ├── layout/       → Navbar, Footer, PageContainer
│   ├── sections/     → Hero, About, Process, Services, Projects, Testimonials, LeadMagnet
│   ├── ui/           → Button, Card, SectionLabel, AnimatedText, TicketCard, AnimatedSection
│   └── forms/        → ContactForm, DropdownField, TextInput, TextArea
├── pages/            → Home.jsx, Contact.jsx, Services.jsx, Stage.jsx, About.jsx, QA.jsx
├── data/             → services.js, testimonials.js, process.js, siteContent.js
├── hooks/
├── utils/
├── styles/
├── App.jsx
└── main.jsx
```

---

## Routing

| Route | Page |
|---|---|
| `/` | Home.jsx |
| `/contact` | Contact.jsx |
| `/services` | Services.jsx |
| `/stage` | Stage.jsx |
| `/a-propos` | About.jsx |
| `/faq` | QA.jsx |

Les 404 redirigent vers Home. Un `.htaccess` est nécessaire sur SiteGround pour que React Router fonctionne au refresh.

---

## Design System

### Couleurs

| Nom | Hex | Usage |
|---|---|---|
| Navy Dark | `#050816` | Fond sombre, sections premium |
| Blue Primary | `#2563EB` | Boutons, liens, accents |
| Blue Light | `#60A5FA` | Hover, détails lumineux |
| Accent Green | `#A3FF12` | Éléments wow, ticket/lead magnet |
| White | `#FFFFFF` | Texte sur fond sombre |
| Light Gray | `#F8FAFC` | Fond clair |
| Text Gray | `#64748B` | Paragraphes secondaires |

> Toutes les couleurs sont centralisées dans la config Tailwind. Ne pas hardcoder les hex dans les composants.

### Typographie (desktop / mobile)

| Type | Desktop | Mobile |
|---|---|---|
| Hero title | 72–96px | 42–56px |
| Section title | 48–64px | 32–40px |
| Card title | 24–32px | 20–24px |
| Body | 16–18px | 16px |
| Label | 12–14px | 12px |

### Espacements

Système basé sur multiples de 8 : `8, 16, 24, 32, 48, 64, 96, 128px`.

### Animations (Framer Motion)

| Animation | Usage |
|---|---|
| Fade up | Apparition des sections au scroll (`whileInView`) |
| Hover lift | Cartes qui montent légèrement au survol |
| 3D tilt | TicketCard et cartes premium |
| Parallax léger | Images Hero et LeadMagnet |
| Magnetic button | Boutons CTA principaux |

---

## Composants — Règles

- **PascalCase** pour les composants : `HeroSection.jsx`
- **camelCase** pour les fichiers data : `siteContent.js`
- Un composant = une responsabilité. Découper si trop long.
- Les composants UI partagés (`components/ui/`) doivent être créés **avant** d'être utilisés ailleurs.
- Les textes du site sont centralisés dans `data/siteContent.js`. Ne pas hardcoder les strings dans les composants.

### Composants UI — Styles attendus

| Composant | Style |
|---|---|
| Button Primary | Fond `#2563EB`, texte blanc, `border-radius: 12px`, hover glow |
| Button Secondary | Transparent, bordure bleue, texte bleu |
| Card | Glassmorphism ou fond blanc, `radius: 24px`, shadow douce |
| SectionLabel | Badge bleu, uppercase, petit |
| DropdownField | Bordure bleue, label bleu, chevron à droite |
| TicketCard | Carte 3D bleue, glow, effet tilt au hover |

---

## Responsive — Breakpoints

| Breakpoint | Règles |
|---|---|
| Desktop 1440px | Design principal |
| Laptop 1024px | Réduire tailles titres, garder 2 colonnes si possible |
| Tablet 768px | Passer plusieurs sections en 1 colonne |
| Mobile 390px | Titres 42px max, cartes empilées, menu burger |

---

## Git Workflow

### Branches

| Branche | Usage |
|---|---|
| `main` | Production stable — aucun push direct |
| `develop` | Branche commune de dev |
| `feature/*` | Nouvelles sections ou fonctionnalités |
| `fix/*` | Corrections de bugs |
| `hotfix/*` | Correction urgente en production |

### Convention des commits

```
feat: add services section
fix: correct mobile navbar
style: improve button spacing
refactor: split contact form fields
docs: update deployment guide
chore: install framer motion
```

### Workflow PR

1. Créer une branche depuis `develop`
2. Développer la tâche
3. Tester en local (`npm run dev`)
4. PR vers `develop` avec description claire
5. Revue par au moins un membre
6. Corriger les commentaires
7. Merger après validation

### Checklist avant PR

- [ ] `npm run dev` démarre sans erreur
- [ ] Aucune erreur console
- [ ] Responsive vérifié sur mobile
- [ ] Noms de composants propres (PascalCase)
- [ ] Pas de fichier inutile
- [ ] Code formaté
- [ ] Images optimisées

---

## Répartition équipe

| Développeur | Responsabilités | Branches |
|---|---|---|
| Dev 1 | Navbar, Hero, Footer | `feature/navbar`, `feature/hero-section`, `feature/footer` |
| Dev 2 | About, Process | `feature/about-section`, `feature/process-section` |
| Dev 3 | Services, Projects | `feature/services-section`, `feature/projects-section` |
| Dev 4 | Testimonials, LeadMagnet, TicketCard | `feature/testimonials`, `feature/lead-magnet`, `feature/ticket-card` |
| Dev 5 | Contact page, formulaire, validation | `feature/contact-page`, `feature/contact-form` |
| Intégration | Revue PR, merge, cohérence design | `develop` |

### Règles anti-conflits

- Une personne par section principale
- Ne pas modifier `App.jsx` sans prévenir l'équipe
- Centraliser les textes dans `data/siteContent.js`
- Centraliser les couleurs dans la config Tailwind
- Créer les composants UI partagés avant de les utiliser

---

## Pages — Structure attendue

### Home
`Hero → About → Process → Services → Projects → Testimonials → LeadMagnet → Footer`

### Contact (formulaire en 3 blocs)
- **01 Projet** : type de projet, objectif, budget, délai
- **02 Organisation** : nom, secteur, site web, description
- **03 Contact** : nom, email, téléphone, message

---

## Variables d'environnement

Les clés EmailJS sont stockées dans `.env` (jamais commitées).
Un fichier `.env.example` doit exister à la racine avec les clés vides documentées.

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

---

## Déploiement

```bash
npm run build
# Envoyer le contenu de dist/ dans public_html sur SiteGround
```

Un `.htaccess` est nécessaire pour que React Router fonctionne (toutes les routes → `index.html`).
