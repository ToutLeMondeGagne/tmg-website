import gabrielaDimaImage from '../assets/images/Gabriela Dima Site Web.png'
import lachanistImage from '../assets/images/Lachanista Site Web.png'

// URL du site live de chaque client : a remplir des confirmation.
// Laisser vide ('') masque le bouton « Voir le site en live ».
export const projects = [
  {
    slug: 'gabriela-dima',
    number: '01',
    eyebrow: 'Conseils financiers',
    title: 'Gabriela Dima',
    description:
      'Maximisation du réseau professionnel, partenariats stratégiques et déploiement du site internet pour structuration financière.',
    summary: [
      'Gabriela Dima accompagne les entrepreneurs et les organisations en structuration financière et stratégique. Sa promesse : l’excellence financière alliée à l’approche humaine — une écoute active pour comprendre les enjeux profonds, bien au-delà des chiffres, et des solutions concrètes, actionnables dès la prochaine réunion.',
      'TMG a accompagné Gabriela Dima dans la maximisation de son réseau professionnel, la mise en place de partenariats stratégiques et le déploiement complet de son site internet.',
    ],
    services: [
      'Déploiement du site internet',
      'Partenariats stratégiques',
      'Maximisation du réseau professionnel',
    ],
    year: '2026',
    mandate: 'Web & stratégie',
    liveUrl: '',
    image: gabrielaDimaImage,
    accent: '#004cff',
    imagePosition: 'left center',
  },
  {
    slug: 'lachanista',
    number: '02',
    eyebrow: 'Bien-être digital',
    title: 'Lachanista',
    description:
      "Dynamisation des réseaux sociaux, création de contenu visuel et perfectionnement de l'expérience web pour la communauté.",
    summary: [
      'Lachanista est une compagnie de bien-être qui rassemble une communauté autour d’une expérience à la fois naturelle et raffinée, où l’image de marque joue un rôle central.',
      'TMG a accompagné Lachanista dans la dynamisation de ses réseaux sociaux, la création de contenu visuel à la hauteur de son identité et le perfectionnement de son expérience web.',
    ],
    services: [
      'Dynamisation des réseaux sociaux',
      'Création de contenu visuel',
      'Perfectionnement de l’expérience web',
    ],
    year: '2026',
    mandate: 'Contenu & web',
    liveUrl: 'https://lachanista.com/',
    image: lachanistImage,
    accent: '#8cc63f',
    imagePosition: 'left center',
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
