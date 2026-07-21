import { socialProfileUrls } from './socialLinks.js'

export const SITE_URL = 'https://tmgconsultation.org'
export const SITE_NAME = 'TMG - Tout le Monde Gagne'
export const SITE_LOCALE = 'fr_CA'
export const SITE_LANGUAGE = 'fr-CA'
export const SITE_EMAIL = 'ensemble@tmgconsultation.org'
export const SITE_LOCATION = 'Montréal, Québec'
export const SITE_REGION = 'CA-QC'
export const SITE_COUNTRY = 'CA'
export const DEFAULT_OG_IMAGE = '/og-image.svg'

const defaultDescription =
  'TMG aide les PME et OBNL à créer des sites web, clarifier leur marketing et transformer leur présence numérique en résultats concrets.'

const baseKeywords = [
  'agence marketing Montréal',
  'création site web PME',
  'site web OBNL',
  'refonte site web',
  'audit marketing',
  'stratégie numérique',
  'Tout le Monde Gagne',
]

const serviceArea = [
  {
    '@type': 'City',
    name: 'Montréal',
  },
  {
    '@type': 'AdministrativeArea',
    name: 'Québec',
  },
  {
    '@type': 'Country',
    name: 'Canada',
  },
]

const serviceOffers = [
  {
    path: '/services/web',
    name: 'Création et refonte de sites web',
    description:
      'Création, refonte, optimisation SEO, design mobile-first et suivi analytique pour PME, startups et OBNL.',
    serviceType: 'Création de site web',
    audience: ['PME', 'Startups', 'OBNL'],
  },
  {
    path: '/services/marketing',
    name: 'Audit marketing et stratégie de contenu',
    description:
      'Audit de présence actuelle, personas, stratégie de contenu, plan d’action et indicateurs de succès.',
    serviceType: 'Audit marketing',
    audience: ['PME', 'Startups', 'OBNL'],
  },
  {
    path: '/pme',
    name: 'Accompagnement web et marketing pour PME',
    description:
      'Sites web, audits marketing et stratégies numériques adaptés aux budgets et objectifs de croissance des PME.',
    serviceType: 'Marketing PME',
    audience: ['PME', 'Startups'],
  },
  {
    path: '/obnl',
    name: 'Sites web et stratégie numérique pour OBNL',
    description:
      'Solutions numériques accessibles pour clarifier le message, mobiliser la communauté et soutenir la mission des OBNL.',
    serviceType: 'Marketing OBNL',
    audience: ['OBNL', 'Organismes communautaires'],
  },
]

export const seoPages = {
  '/': {
    title: 'TMG | Sites web et marketing pour PME et OBNL à Montréal',
    description: defaultDescription,
    keywords: baseKeywords,
  },
  '/services': {
    title: 'Services web et marketing pour PME et OBNL | TMG',
    description:
      'Découvrez les services TMG : création de sites web, refonte, audit marketing, stratégie de contenu et systèmes simples pour convertir plus clairement.',
    keywords: [
      'services marketing PME',
      'services web OBNL',
      'agence web Montréal',
      'stratégie marketing Montréal',
    ],
  },
  '/services/web': {
    title: 'Création et refonte de sites web pour PME et OBNL | TMG',
    description:
      'TMG crée des sites web rapides, clairs, mobile-first et optimisés SEO pour aider les PME et OBNL à être trouvés, compris et contactés.',
    keywords: [
      'création site web PME Montréal',
      'refonte site web PME',
      'site web pour OBNL',
      'site web optimisé SEO',
    ],
  },
  '/services/marketing': {
    title: 'Audit marketing et stratégie de contenu pour PME | TMG',
    description:
      'Audit marketing, analyse de positionnement, personas, plan de contenu et indicateurs de succès pour clarifier vos priorités et mieux attirer vos clients.',
    keywords: [
      'audit marketing Montréal',
      'stratégie marketing PME',
      'plan de contenu',
      'positionnement marketing',
    ],
  },
  '/pme': {
    title: 'Marketing et sites web abordables pour PME | TMG',
    description:
      'TMG accompagne les PME et startups avec des sites web, audits marketing et stratégies numériques adaptés à leurs budgets et objectifs de croissance.',
    keywords: [
      'marketing PME Montréal',
      'site web PME',
      'agence marketing abordable',
      'startup Montréal marketing',
    ],
  },
  '/entreprises': {
    title: 'Marketing et sites web abordables pour PME | TMG',
    description:
      'TMG accompagne les PME et startups avec des sites web, audits marketing et stratégies numériques adaptés à leurs budgets et objectifs de croissance.',
    canonicalPath: '/pme',
    keywords: [
      'marketing PME Montréal',
      'site web PME',
      'agence marketing abordable',
      'startup Montréal marketing',
    ],
  },
  '/obnl': {
    title: 'Sites web et stratégie numérique pour OBNL | TMG',
    description:
      'TMG aide les OBNL à clarifier leur message, créer des sites accessibles et mobiliser donateurs, bénévoles et bénéficiaires sans frais inutiles.',
    keywords: [
      'site web OBNL',
      'marketing OBNL',
      'communication organisme sans but lucratif',
      'stratégie numérique OBNL',
    ],
  },
  '/stage': {
    title: 'Stages marketing, web et contenu à Montréal | TMG',
    description:
      'TMG accueille des stagiaires en marketing, design, contenu et web sur de vrais mandats clients, avec accompagnement, portfolio et responsabilités concrètes.',
    keywords: [
      'stage marketing Montréal',
      'stage web Montréal',
      'stage contenu numérique',
      'stage design web',
    ],
  },
  '/a-propos': {
    title: 'À propos de TMG | Agence web et marketing propulsée par la relève',
    description:
      'Découvrez TMG - Tout le Monde Gagne : une agence qui relie PME, OBNL et stagiaires autour de projets web et marketing concrets.',
    keywords: [
      'agence TMG',
      'Tout le Monde Gagne',
      'agence web Montréal',
      'agence marketing relève',
    ],
  },
  '/faq': {
    title: 'FAQ | Questions fréquentes sur les services TMG',
    description:
      'Réponses aux questions fréquentes sur les services TMG, les types de clients accompagnés, les mandats web, marketing et les premières étapes.',
    keywords: [
      'FAQ agence web',
      'questions marketing PME',
      'questions site web OBNL',
    ],
  },
  '/contact': {
    title: 'Contact | Lancer un projet web ou marketing avec TMG',
    description:
      'Contactez TMG pour discuter de votre site web, refonte, audit marketing, stratégie de contenu ou projet numérique pour PME et OBNL.',
    keywords: [
      'contact agence marketing Montréal',
      'lancer projet web',
      'demande site web PME',
    ],
  },
  '/admin': {
    title: 'Admin contenu | TMG',
    description: 'Interface privée pour modifier les textes du site TMG.',
    robots: 'noindex, nofollow',
    keywords: [],
  },
  '/partenaires': {
    title: 'Espace partenaires | TMG',
    description: 'Espace privé réservé aux clients accompagnés par TMG.',
    robots: 'noindex, nofollow',
    keywords: [],
  },
  '/partenaire': {
    title: 'Espace partenaires | TMG',
    description: 'Espace privé réservé aux clients accompagnés par TMG.',
    canonicalPath: '/partenaires',
    robots: 'noindex, nofollow',
    keywords: [],
  },
  '/espace-partenaire': {
    title: 'Espace partenaires | TMG',
    description: 'Espace privé réservé aux clients accompagnés par TMG.',
    canonicalPath: '/partenaires',
    robots: 'noindex, nofollow',
    keywords: [],
  },
}

export const relatedPageLinks = {
  '/': [
    {
      title: 'Services web et marketing',
      description: 'Voir comment TMG structure les sites, le marketing et les systèmes.',
      to: '/services',
    },
    {
      title: 'Solutions pour PME',
      description: 'Des sites et audits adaptés aux équipes qui veulent croître clairement.',
      to: '/pme',
    },
    {
      title: 'Solutions pour OBNL',
      description: 'Une présence numérique accessible pour soutenir votre mission.',
      to: '/obnl',
    },
  ],
  '/services': [
    {
      title: 'Création et refonte web',
      description: 'Site rapide, clair, mobile-first et pensé pour convertir.',
      to: '/services/web',
    },
    {
      title: 'Audit marketing',
      description: 'Clarifier vos priorités, vos contenus et vos indicateurs.',
      to: '/services/marketing',
    },
    {
      title: 'PME et startups',
      description: 'Des livrables réalistes pour avancer sans modèle d’agence lourd.',
      to: '/pme',
    },
  ],
  '/services/web': [
    {
      title: 'Audit marketing',
      description: 'Compléter votre site avec une stratégie claire et mesurable.',
      to: '/services/marketing',
    },
    {
      title: 'Services pour PME',
      description: 'Voir l’approche TMG pour les entreprises en croissance.',
      to: '/pme',
    },
    {
      title: 'Services pour OBNL',
      description: 'Adapter votre site à une mission, une communauté et des dons.',
      to: '/obnl',
    },
  ],
  '/services/marketing': [
    {
      title: 'Création et refonte web',
      description: 'Transformer la stratégie en pages claires et performantes.',
      to: '/services/web',
    },
    {
      title: 'Services pour PME',
      description: 'Prioriser les actions marketing d’une petite équipe.',
      to: '/pme',
    },
    {
      title: 'Contact',
      description: 'Discuter de votre situation et de la meilleure prochaine étape.',
      to: '/contact',
    },
  ],
  '/pme': [
    {
      title: 'Création et refonte web',
      description: 'Un site vitrine ou e-commerce mobile-first et optimisé SEO.',
      to: '/services/web',
    },
    {
      title: 'Audit marketing',
      description: 'Positionnement, contenu, concurrents et plan d’action.',
      to: '/services/marketing',
    },
    {
      title: 'À propos de TMG',
      description: 'Comprendre le modèle propulsé par la relève.',
      to: '/a-propos',
    },
  ],
  '/obnl': [
    {
      title: 'Création et refonte web',
      description: 'Un site accessible pour mobiliser donateurs, bénévoles et bénéficiaires.',
      to: '/services/web',
    },
    {
      title: 'Audit marketing',
      description: 'Clarifier votre communication et les bons canaux pour votre mission.',
      to: '/services/marketing',
    },
    {
      title: 'À propos de TMG',
      description: 'Voir comment l’équipe encadre les mandats et la transmission.',
      to: '/a-propos',
    },
  ],
  '/stage': [
    {
      title: 'À propos de TMG',
      description: 'Comprendre l’atelier, l’équipe et le modèle de supervision.',
      to: '/a-propos',
    },
    {
      title: 'Services TMG',
      description: 'Voir les vrais mandats clients sur lesquels les stagiaires contribuent.',
      to: '/services',
    },
    {
      title: 'Questions fréquentes',
      description: 'Lire les réponses sur les mandats, clients et premières étapes.',
      to: '/faq',
    },
  ],
  '/a-propos': [
    {
      title: 'Services TMG',
      description: 'Passer du modèle à ce que l’équipe peut construire concrètement.',
      to: '/services',
    },
    {
      title: 'Stagiaires',
      description: 'Découvrir les mandats réels et la place de la relève.',
      to: '/stage',
    },
    {
      title: 'Contact',
      description: 'Présenter votre projet ou poser une question à TMG.',
      to: '/contact',
    },
  ],
  '/faq': [
    {
      title: 'Services web et marketing',
      description: 'Explorer les services avant de lancer un mandat.',
      to: '/services',
    },
    {
      title: 'Solutions pour PME',
      description: 'Voir l’approche pour les entreprises en croissance.',
      to: '/pme',
    },
    {
      title: 'Solutions pour OBNL',
      description: 'Voir l’approche pour les organismes à mission.',
      to: '/obnl',
    },
  ],
  '/contact': [
    {
      title: 'Création et refonte web',
      description: 'Préparer une demande de site ou de refonte.',
      to: '/services/web',
    },
    {
      title: 'Audit marketing',
      description: 'Préparer une demande de stratégie ou de diagnostic.',
      to: '/services/marketing',
    },
    {
      title: 'Questions fréquentes',
      description: 'Répondre aux questions avant de nous écrire.',
      to: '/faq',
    },
  ],
}

export const notFoundSeo = {
  title: 'Page introuvable | TMG',
  description:
    'La page demandée est introuvable. Retournez à l’accueil de TMG pour découvrir nos services web et marketing.',
  robots: 'noindex, follow',
}

export function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/'
  }

  return pathname.replace(/\/+$/, '') || '/'
}

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) {
    return path
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function getSeoForPath(pathname) {
  const path = normalizePath(pathname)
  const pageSeo = seoPages[path]

  if (!pageSeo) {
    return {
      ...notFoundSeo,
      canonicalUrl: absoluteUrl(path),
      ogImage: absoluteUrl(DEFAULT_OG_IMAGE),
    }
  }

  const canonicalPath = pageSeo.canonicalPath || path

  return {
    robots: 'index, follow',
    ...pageSeo,
    canonicalUrl: absoluteUrl(canonicalPath),
    ogImage: absoluteUrl(pageSeo.ogImage || DEFAULT_OG_IMAGE),
  }
}

export function getRelatedLinksForPath(pathname) {
  const path = normalizePath(pathname)
  const canonicalPath = seoPages[path]?.canonicalPath || path

  return relatedPageLinks[canonicalPath] || []
}

function buildBreadcrumbItems(path) {
  const labels = {
    services: 'Services',
    web: 'Création et refonte web',
    marketing: 'Audit marketing',
    pme: 'PME',
    entreprises: 'PME',
    obnl: 'OBNL',
    stage: 'Stagiaires',
    'a-propos': 'À propos',
    faq: 'FAQ',
    contact: 'Contact',
    partenaire: 'Espace partenaires',
    partenaires: 'Espace partenaires',
    'espace-partenaire': 'Espace partenaires',
  }

  const segments = normalizePath(path).split('/').filter(Boolean)
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: SITE_URL,
    },
  ]

  segments.forEach((segment, index) => {
    const pathname = `/${segments.slice(0, index + 1).join('/')}`

    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: labels[segment] || segment,
      item: absoluteUrl(pathname),
    })
  })

  return items
}

function buildOrganizationSchema() {
  return {
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: 'Tout le Monde Gagne',
    alternateName: 'TMG',
    slogan: 'Tout le Monde Gagne',
    url: SITE_URL,
    sameAs: socialProfileUrls,
    logo: absoluteUrl('/favicon.svg'),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    email: SITE_EMAIL,
    priceRange: 'Sur devis',
    availableLanguage: ['fr-CA', 'fr'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montréal',
      addressRegion: 'Québec',
      addressCountry: 'CA',
    },
    foundingLocation: {
      '@type': 'Place',
      name: SITE_LOCATION,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Montréal',
        addressRegion: 'Québec',
        addressCountry: SITE_COUNTRY,
      },
    },
    areaServed: serviceArea,
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_EMAIL,
      contactType: 'customer support',
      areaServed: SITE_REGION,
      availableLanguage: ['fr-CA', 'fr'],
    },
    knowsAbout: [
      'Création de sites web',
      'Refonte de sites web',
      'Marketing numérique',
      'Audit marketing',
      'SEO',
      'Stratégie de contenu',
      'PME',
      'OBNL',
    ],
    hasOfferCatalog: {
      '@id': `${SITE_URL}/#offer-catalog`,
    },
    description: defaultDescription,
  }
}

function buildWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: SITE_LANGUAGE,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
  }
}

function buildWebPageSchema(seo, path) {
  const pageTypes = {
    '/a-propos': ['WebPage', 'AboutPage'],
    '/contact': ['WebPage', 'ContactPage'],
    '/faq': ['WebPage', 'FAQPage'],
  }

  const relatedLinks = getRelatedLinksForPath(path)

  return {
    '@type': pageTypes[path] || 'WebPage',
    '@id': `${seo.canonicalUrl}#webpage`,
    url: seo.canonicalUrl,
    name: seo.title,
    description: seo.description,
    inLanguage: SITE_LANGUAGE,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    breadcrumb: {
      '@id': `${seo.canonicalUrl}#breadcrumb`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: seo.ogImage,
    },
    relatedLink: relatedLinks.length
      ? relatedLinks.map((link) => absoluteUrl(link.to))
      : undefined,
    mainEntity:
      path === '/services'
        ? {
            '@id': `${SITE_URL}/#offer-catalog`,
          }
        : path === '/contact' || path === '/a-propos'
          ? {
              '@id': `${SITE_URL}/#organization`,
            }
          : undefined,
    potentialAction:
      path === '/contact'
        ? {
            '@type': 'ContactAction',
            target: seo.canonicalUrl,
          }
        : undefined,
  }
}

function buildServiceNode(service) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(service.path)}#service`,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    url: absoluteUrl(service.path),
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: serviceArea,
    audience: service.audience.map((audienceName) => ({
      '@type': 'Audience',
      name: audienceName,
    })),
  }
}

function buildOfferCatalogSchema() {
  return {
    '@type': 'OfferCatalog',
    '@id': `${SITE_URL}/#offer-catalog`,
    name: 'Services web et marketing TMG',
    itemListElement: serviceOffers.map((service, index) => ({
      '@type': 'Offer',
      position: index + 1,
      url: absoluteUrl(service.path),
      itemOffered: buildServiceNode(service),
    })),
  }
}

function buildServiceItemListSchema(path) {
  if (path !== '/services') {
    return null
  }

  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl('/services')}#services-list`,
    name: 'Services TMG pour PME et OBNL',
    itemListElement: serviceOffers.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.name,
      url: absoluteUrl(service.path),
      item: {
        '@id': `${absoluteUrl(service.path)}#service`,
      },
    })),
  }
}

function buildBreadcrumbSchema(seo, path) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${seo.canonicalUrl}#breadcrumb`,
    itemListElement: buildBreadcrumbItems(path),
  }
}

function buildServiceSchema(path) {
  const service = serviceOffers.find((serviceOffer) => serviceOffer.path === path)

  if (!service) {
    return null
  }

  return buildServiceNode(service)
}

function buildFaqSchema(path) {
  if (path !== '/faq') {
    return null
  }

  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl('/faq')}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Avec quels types de clients travaillez-vous ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TMG travaille principalement avec des PME, OBNL et équipes qui veulent clarifier leur présence numérique.',
        },
      },
      {
        '@type': 'Question',
        name: 'Pouvez-vous partir d’un site existant ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui. TMG peut auditer, simplifier et faire évoluer une base déjà en place.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment commence un mandat ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un mandat commence par la compréhension de vos objectifs, de vos contraintes et des actions prioritaires.',
        },
      },
    ],
  }
}

export function getStructuredData(pathname, seo = getSeoForPath(pathname)) {
  const path = normalizePath(pathname)
  const graph = [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildOfferCatalogSchema(),
    buildWebPageSchema(seo, path),
    buildBreadcrumbSchema(seo, path),
    buildServiceSchema(path),
    buildServiceItemListSchema(path),
    buildFaqSchema(path),
  ].filter(Boolean)

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
