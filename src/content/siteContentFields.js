export const siteContentFields = [
  {
    title: 'Accueil - Hero',
    description: 'Premier écran visible sur la page d’accueil.',
    fields: [
      { path: 'home.hero.title', label: 'Grand titre', type: 'textarea', rows: 3 },
      { path: 'home.hero.subtitle', label: 'Texte sous le visuel', type: 'textarea', rows: 3 },
      { path: 'home.hero.primaryCta', label: 'Bouton principal' },
      { path: 'home.hero.secondaryCta', label: 'Bouton secondaire' },
      { path: 'global.scrollHint', label: 'Indication de scroll' },
    ],
  },
  {
    title: 'Accueil - À propos',
    description: 'Texte de la section située avant les projets.',
    fields: [
      { path: 'home.about.label', label: 'Label de section' },
      { path: 'home.about.title', label: 'Titre', type: 'textarea', rows: 3 },
      { path: 'home.about.body', label: 'Paragraphe', type: 'textarea', rows: 4 },
      { path: 'home.about.cta', label: 'Bouton' },
    ],
  },
  {
    title: 'Accueil - Trois piliers',
    description: 'Les trois cases Sites web, Marketing et Systèmes.',
    fields: [
      { path: 'home.highlights.0.title', label: 'Case 1 - titre' },
      { path: 'home.highlights.0.text', label: 'Case 1 - texte', type: 'textarea', rows: 3 },
      { path: 'home.highlights.1.title', label: 'Case 2 - titre' },
      { path: 'home.highlights.1.text', label: 'Case 2 - texte', type: 'textarea', rows: 3 },
      { path: 'home.highlights.2.title', label: 'Case 3 - titre' },
      { path: 'home.highlights.2.text', label: 'Case 3 - texte', type: 'textarea', rows: 3 },
    ],
  },
  {
    title: 'Accueil - Ticket',
    description: 'Carte de première rencontre gratuite.',
    fields: [
      { path: 'home.ticket.title', label: 'Titre du ticket' },
      { path: 'home.ticket.subtitle', label: 'Texte du ticket', type: 'textarea', rows: 3 },
    ],
  },
]
