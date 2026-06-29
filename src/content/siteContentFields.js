export const siteContentFields = [
  // ─── Accueil ───────────────────────────────────────────────────────────────
  {
    title: 'Accueil - Hero',
    description: 'Premier écran visible sur la page d\'accueil.',
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

  // ─── À propos ──────────────────────────────────────────────────────────────
  {
    title: 'À propos - Hero',
    description: 'Première section de la page À propos.',
    fields: [
      { path: 'about.hero.label', label: 'Label de section' },
      { path: 'about.hero.title', label: 'Titre principal', type: 'textarea', rows: 2 },
      { path: 'about.hero.subtitle', label: 'Paragraphe intro', type: 'textarea', rows: 3 },
      { path: 'about.hero.cta', label: 'Bouton' },
      { path: 'about.hero.imageCaption', label: 'Légende de l\'image' },
    ],
  },
  {
    title: 'À propos - Notre modèle',
    description: 'Section expliquant l\'approche de TMG.',
    fields: [
      { path: 'about.model.label', label: 'Label de section' },
      { path: 'about.model.title', label: 'Titre', type: 'textarea', rows: 2 },
      { path: 'about.model.body', label: 'Paragraphe', type: 'textarea', rows: 4 },
    ],
  },
  {
    title: 'À propos - Chiffres clés',
    description: 'Les trois grandes cases PME, OBNL et Stage.',
    fields: [
      { path: 'about.proofPoints.0.value', label: 'Case 1 - valeur' },
      { path: 'about.proofPoints.0.label', label: 'Case 1 - label' },
      { path: 'about.proofPoints.1.value', label: 'Case 2 - valeur' },
      { path: 'about.proofPoints.1.label', label: 'Case 2 - label' },
      { path: 'about.proofPoints.2.value', label: 'Case 3 - valeur' },
      { path: 'about.proofPoints.2.label', label: 'Case 3 - label' },
    ],
  },
  {
    title: 'À propos - Équipe',
    description: 'Titre et description de la section équipe, avec les trois rôles.',
    fields: [
      { path: 'about.team.label', label: 'Label de section' },
      { path: 'about.team.title', label: 'Titre', type: 'textarea', rows: 2 },
      { path: 'about.team.subtitle', label: 'Paragraphe', type: 'textarea', rows: 3 },
      { path: 'about.team.roles.0.title', label: 'Rôle 1 - titre' },
      { path: 'about.team.roles.0.text', label: 'Rôle 1 - texte', type: 'textarea', rows: 2 },
      { path: 'about.team.roles.1.title', label: 'Rôle 2 - titre' },
      { path: 'about.team.roles.1.text', label: 'Rôle 2 - texte', type: 'textarea', rows: 2 },
      { path: 'about.team.roles.2.title', label: 'Rôle 3 - titre' },
      { path: 'about.team.roles.2.text', label: 'Rôle 3 - texte', type: 'textarea', rows: 2 },
    ],
  },
  {
    title: 'À propos - Valeurs',
    description: 'Les trois valeurs fondatrices de TMG.',
    fields: [
      { path: 'about.values.0.title', label: 'Valeur 1 - titre' },
      { path: 'about.values.0.text', label: 'Valeur 1 - texte', type: 'textarea', rows: 2 },
      { path: 'about.values.1.title', label: 'Valeur 2 - titre' },
      { path: 'about.values.1.text', label: 'Valeur 2 - texte', type: 'textarea', rows: 2 },
      { path: 'about.values.2.title', label: 'Valeur 3 - titre' },
      { path: 'about.values.2.text', label: 'Valeur 3 - texte', type: 'textarea', rows: 2 },
    ],
  },
  {
    title: 'À propos - CTA final',
    description: 'Section d\'appel à l\'action en bas de page.',
    fields: [
      { path: 'about.cta.title', label: 'Titre', type: 'textarea', rows: 2 },
      { path: 'about.cta.body', label: 'Paragraphe', type: 'textarea', rows: 3 },
      { path: 'about.cta.button', label: 'Bouton' },
    ],
  },

  // ─── Services ──────────────────────────────────────────────────────────────
  {
    title: 'Services - Hero',
    description: 'En-tête de la page Services.',
    fields: [
      { path: 'services.hero.label', label: 'Label de section' },
      { path: 'services.hero.title', label: 'Titre principal', type: 'textarea', rows: 2 },
    ],
  },
  {
    title: 'Services - Liste',
    description: 'Les trois grandes lignes de services (PME, OBNL, Audit).',
    fields: [
      { path: 'services.list.0.title', label: 'Service 1 - titre' },
      { path: 'services.list.0.text', label: 'Service 1 - texte', type: 'textarea', rows: 2 },
      { path: 'services.list.0.cta', label: 'Service 1 - bouton' },
      { path: 'services.list.1.title', label: 'Service 2 - titre' },
      { path: 'services.list.1.text', label: 'Service 2 - texte', type: 'textarea', rows: 2 },
      { path: 'services.list.1.cta', label: 'Service 2 - bouton' },
      { path: 'services.list.2.title', label: 'Service 3 - titre' },
      { path: 'services.list.2.text', label: 'Service 3 - texte', type: 'textarea', rows: 2 },
      { path: 'services.list.2.cta', label: 'Service 3 - bouton' },
    ],
  },
  {
    title: 'Services - Ce qu\'on construit',
    description: 'Titre, intro et trois piliers Sites web / Marketing / Systèmes.',
    fields: [
      { path: 'services.focus.label', label: 'Label de section' },
      { path: 'services.focus.title', label: 'Titre', type: 'textarea', rows: 2 },
      { path: 'services.focus.body', label: 'Paragraphe', type: 'textarea', rows: 3 },
      { path: 'services.focus.items.0.title', label: 'Pilier 1 - titre' },
      { path: 'services.focus.items.0.text', label: 'Pilier 1 - texte', type: 'textarea', rows: 2 },
      { path: 'services.focus.items.0.detail', label: 'Pilier 1 - détail' },
      { path: 'services.focus.items.1.title', label: 'Pilier 2 - titre' },
      { path: 'services.focus.items.1.text', label: 'Pilier 2 - texte', type: 'textarea', rows: 2 },
      { path: 'services.focus.items.1.detail', label: 'Pilier 2 - détail' },
      { path: 'services.focus.items.2.title', label: 'Pilier 3 - titre' },
      { path: 'services.focus.items.2.text', label: 'Pilier 3 - texte', type: 'textarea', rows: 2 },
      { path: 'services.focus.items.2.detail', label: 'Pilier 3 - détail' },
    ],
  },

  // ─── Stage ─────────────────────────────────────────────────────────────────
  {
    title: 'Stage - Hero',
    description: 'En-tête de la page Stagiaires.',
    fields: [
      { path: 'stage.hero.label', label: 'Label de section' },
      { path: 'stage.hero.title', label: 'Titre principal', type: 'textarea', rows: 2 },
      { path: 'stage.hero.subtitle', label: 'Paragraphe intro', type: 'textarea', rows: 3 },
      { path: 'stage.hero.cta', label: 'Bouton' },
    ],
  },
  {
    title: 'Stage - Process',
    description: 'Les quatre qualités recherchées chez les stagiaires.',
    fields: [
      { path: 'stage.process.label', label: 'Label de section' },
      { path: 'stage.process.items.0.title', label: 'Étape 1 - titre' },
      { path: 'stage.process.items.0.text', label: 'Étape 1 - texte', type: 'textarea', rows: 2 },
      { path: 'stage.process.items.1.title', label: 'Étape 2 - titre' },
      { path: 'stage.process.items.1.text', label: 'Étape 2 - texte', type: 'textarea', rows: 2 },
      { path: 'stage.process.items.2.title', label: 'Étape 3 - titre' },
      { path: 'stage.process.items.2.text', label: 'Étape 3 - texte', type: 'textarea', rows: 2 },
      { path: 'stage.process.items.3.title', label: 'Étape 4 - titre' },
      { path: 'stage.process.items.3.text', label: 'Étape 4 - texte', type: 'textarea', rows: 2 },
    ],
  },
  {
    title: 'Stage - Bénéfices',
    description: 'Les six avantages du stage TMG.',
    fields: [
      { path: 'stage.benefits.label', label: 'Label de section' },
      { path: 'stage.benefits.title', label: 'Titre', type: 'textarea', rows: 2 },
      { path: 'stage.benefits.subtitle', label: 'Sous-titre', type: 'textarea', rows: 2 },
      { path: 'stage.benefits.items.0.title', label: 'Bénéfice 1 - titre' },
      { path: 'stage.benefits.items.0.text', label: 'Bénéfice 1 - texte', type: 'textarea', rows: 2 },
      { path: 'stage.benefits.items.1.title', label: 'Bénéfice 2 - titre' },
      { path: 'stage.benefits.items.1.text', label: 'Bénéfice 2 - texte', type: 'textarea', rows: 2 },
      { path: 'stage.benefits.items.2.title', label: 'Bénéfice 3 - titre' },
      { path: 'stage.benefits.items.2.text', label: 'Bénéfice 3 - texte', type: 'textarea', rows: 2 },
      { path: 'stage.benefits.items.3.title', label: 'Bénéfice 4 - titre' },
      { path: 'stage.benefits.items.3.text', label: 'Bénéfice 4 - texte', type: 'textarea', rows: 2 },
      { path: 'stage.benefits.items.4.title', label: 'Bénéfice 5 - titre' },
      { path: 'stage.benefits.items.4.text', label: 'Bénéfice 5 - texte', type: 'textarea', rows: 2 },
      { path: 'stage.benefits.items.5.title', label: 'Bénéfice 6 - titre' },
      { path: 'stage.benefits.items.5.text', label: 'Bénéfice 6 - texte', type: 'textarea', rows: 2 },
    ],
  },
  {
    title: 'Stage - Formulaire de candidature',
    description: 'Texte affiché à côté du formulaire stagiaire.',
    fields: [
      { path: 'stage.application.label', label: 'Label de section' },
      { path: 'stage.application.title', label: 'Titre', type: 'textarea', rows: 2 },
      { path: 'stage.application.body', label: 'Paragraphe', type: 'textarea', rows: 3 },
      { path: 'stage.application.contactLabel', label: 'Texte avant l\'email de contact' },
      { path: 'stage.application.contactEmail', label: 'Email stagiaire' },
    ],
  },

  // ─── Contact ───────────────────────────────────────────────────────────────
  {
    title: 'Contact - Hero',
    description: 'En-tête de la page Contact.',
    fields: [
      { path: 'contact.hero.label', label: 'Label de section' },
      { path: 'contact.hero.title', label: 'Titre principal', type: 'textarea', rows: 2 },
    ],
  },
  {
    title: 'Contact - Barre latérale',
    description: 'Texte affiché à gauche du formulaire de contact.',
    fields: [
      { path: 'contact.sidebar.body', label: 'Paragraphe principal', type: 'textarea', rows: 3 },
      { path: 'contact.sidebar.note', label: 'Note secondaire', type: 'textarea', rows: 2 },
      { path: 'contact.sidebar.coordLabel', label: 'Titre coordonnées' },
      { path: 'contact.sidebar.locationDesc', label: 'Description localisation', type: 'textarea', rows: 2 },
      { path: 'global.contactEmail', label: 'Email de contact' },
    ],
  },

  // ─── FAQ ───────────────────────────────────────────────────────────────────
  {
    title: 'FAQ - Hero',
    description: 'En-tête de la page FAQ.',
    fields: [
      { path: 'faq.hero.label', label: 'Label de section' },
      { path: 'faq.hero.title', label: 'Titre principal', type: 'textarea', rows: 2 },
    ],
  },
  {
    title: 'FAQ - Questions',
    description: 'Les questions-réponses affichées sur la page.',
    fields: [
      { path: 'faq.questions.0.question', label: 'Question 1' },
      { path: 'faq.questions.0.answer', label: 'Réponse 1', type: 'textarea', rows: 2 },
      { path: 'faq.questions.1.question', label: 'Question 2' },
      { path: 'faq.questions.1.answer', label: 'Réponse 2', type: 'textarea', rows: 2 },
      { path: 'faq.questions.2.question', label: 'Question 3' },
      { path: 'faq.questions.2.answer', label: 'Réponse 3', type: 'textarea', rows: 2 },
    ],
  },
]
