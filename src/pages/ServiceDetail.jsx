import { PageContainer } from '../components/layout'
import RelatedLinks from '../components/seo/RelatedLinks'
import { AnimatedSection, AnimatedText, Button, Card, SectionLabel } from '../components/ui'

const webService = {
  label: 'Service web',
  title: (
    <>
      Création & <span className="text-[var(--blue)]">Refonte Web</span>
    </>
  ),
  description:
    "Un site web qui vous représente, qui se charge vite, qui se trouve sur Google, et qui guide vos visiteurs vers l'action. Livré en 4 à 8 semaines.",
  cta: 'Démarrer un projet web',
  facts: [
    { title: '4-8 semaines', text: 'Délai de livraison typique' },
    { title: 'Mobile-first', text: 'Optimisé pour tous les appareils' },
    { title: 'SEO inclus', text: 'Optimisation pour les moteurs de recherche' },
  ],
  deliverablesIntro:
    'Chaque mandat web inclut un ensemble de livrables concrets, pas de vague, pas de surprise.',
  deliverables: [
    {
      title: 'Design & maquettes',
      text: 'Maquettes haute-fidélité validées avec vous avant développement. Identité visuelle cohérente et moderne.',
    },
    {
      title: 'Développement complet',
      text: 'Site entièrement développé, testé sur tous les navigateurs et appareils. Code propre et documenté.',
    },
    {
      title: 'Optimisation SEO',
      text: 'Structure technique, balises, vitesse de chargement et meilleures pratiques SEO intégrées dès la base.',
    },
    {
      title: 'CMS & gestion de contenu',
      text: 'Interface d’administration simple pour que vous puissiez mettre à jour votre contenu sans coder.',
    },
    {
      title: 'Remise complète des fichiers',
      text: 'Tous les fichiers sources, accès CMS, domaine et hébergement remis à la fin. Aucune dépendance.',
    },
    {
      title: 'Analytique & suivi',
      text: 'Intégration de Google Analytics, configuration des objectifs de conversion et tableau de bord de base.',
    },
  ],
  closingTitle: 'Prêt à lancer votre projet web ?',
  closingText: 'Réservez un appel de 30 minutes pour discuter de votre vision.',
  related: {
    title: 'Stratégie & Audit Marketing',
    text: 'Positionnement, contenu, plan d’action - 2-4 semaines',
    to: '/services/marketing',
  },
}

const marketingService = {
  label: 'Service marketing',
  title: (
    <>
      Stratégie & <span className="text-[var(--blue)]">Audit Marketing</span>
    </>
  ),
  description:
    "Un diagnostic complet de votre présence marketing et un plan d'action structuré avec des objectifs clairs, des canaux identifiés et des indicateurs de succès. Livré en 2 à 4 semaines.",
  cta: 'Démarrer un audit',
  facts: [
    { title: '2-4 semaines', text: 'Délai de livraison typique' },
    { title: 'Audit complet', text: 'Analyse de votre situation actuelle' },
    { title: 'Plan d’action', text: 'Priorités, canaux et indicateurs définis' },
    { title: 'Présentation finale', text: 'Résultats expliqués à votre équipe' },
  ],
  deliverablesIntro:
    "Un audit sans plan d'action, ça ne sert à rien. On livre les deux.",
  deliverables: [
    {
      title: 'Audit de présence actuelle',
      text: 'Analyse de votre site, vos réseaux, votre contenu et votre positionnement par rapport aux concurrents.',
    },
    {
      title: 'Définition des personas',
      text: 'Identification de vos cibles principales avec leurs besoins, comportements et points de contact clés.',
    },
    {
      title: 'Stratégie de contenu',
      text: 'Plan de contenu adapté à vos cibles et canaux : sujets, formats, fréquence et ton de communication.',
    },
    {
      title: 'Plan d’action priorisé',
      text: 'Actions classées par priorité et impact estimé, avec responsables suggérés et échéancier réaliste.',
    },
    {
      title: 'Indicateurs de succès (KPIs)',
      text: "Définition des métriques à suivre pour mesurer l'efficacité de chaque action recommandée.",
    },
    {
      title: 'Présentation à votre équipe',
      text: 'Session de présentation des résultats et du plan - format questions/réponses inclus.',
    },
  ],
  closingTitle: 'Prêt à clarifier votre stratégie marketing ?',
  closingText:
    'Un appel de 30 minutes pour comprendre votre situation et vous proposer la meilleure approche.',
  related: {
    title: 'Création & Refonte Web',
    text: 'Site web, SEO, CMS et analytique - 4-8 semaines',
    to: '/services/web',
  },
}

function ServiceDetail({ service }) {
  return (
    <main>
      <PageContainer>
        <section className="grid min-h-[calc(100svh-6rem)] gap-12 border-b border-black/20 py-20 text-left lg:grid-cols-[0.5fr_0.5fr] lg:items-center">
          <div className="space-y-8">
            <SectionLabel>{service.label}</SectionLabel>
            <AnimatedText
              as="h1"
              className="max-w-4xl text-[clamp(2.6rem,12vw,4.8rem)] font-medium leading-[0.92] tracking-normal text-black sm:text-[clamp(3rem,7vw,7.5rem)]"
            >
              {service.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.16}
              className="max-w-xl text-xl leading-8 text-black/70"
            >
              {service.description}
            </AnimatedText>
            <Button href="/contact" variant="secondary">
              {service.cta}
            </Button>
          </div>

          <div className="space-y-5">
            {service.facts.map((fact, index) => (
              <AnimatedSection key={fact.title} delay={index * 0.06}>
                <Card
                  className="grid gap-5 text-left text-black sm:grid-cols-[3.5rem_1fr] sm:items-center"
                  padding="p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-sm font-medium text-white">
                    0{index + 1}
                  </span>
                  <span>
                    <strong className="block text-2xl font-semibold leading-tight text-black">
                      {fact.title}
                    </strong>
                    <span className="text-base leading-6 text-black/65">
                      {fact.text}
                    </span>
                  </span>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section className="border-b border-black/20 py-20 text-left">
          <div className="mb-12 max-w-3xl space-y-5">
            <span className="text-sm font-medium uppercase text-[var(--blue)]">
              Ce qu&apos;on livre
            </span>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              Vos livrables, en détail
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              {service.deliverablesIntro}
            </AnimatedText>
          </div>

          <div className="grid border border-black/20 md:grid-cols-2 xl:grid-cols-3">
            {service.deliverables.map((deliverable, index) => (
              <AnimatedSection
                key={deliverable.title}
                as="article"
                className="group relative overflow-hidden border-b border-r border-black/15 bg-[var(--card)] p-8 text-left text-black transition-colors duration-300 hover:z-10 hover:border-[var(--blue)] hover:bg-[rgba(215,215,212,0.94)]"
                delay={(index % 3) * 0.05}
                whileHover={{
                  y: -7,
                  scale: 1.012,
                  boxShadow: '0 28px 90px rgba(0, 76, 255, 0.14)',
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--blue)] transition-transform duration-500 ease-out group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 opacity-0 blur-md transition duration-700 group-hover:translate-x-[420%] group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="mb-8 flex h-10 w-10 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-sm font-medium text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                  0{index + 1}
                </span>
                <h3 className="mb-4 text-2xl font-semibold leading-tight text-black">
                  {deliverable.title}
                </h3>
                <p className="text-base leading-7 text-black/70">
                  {deliverable.text}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-b border-black/20 py-20 text-left lg:grid-cols-[0.6fr_0.4fr] lg:items-center">
          <div>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(2.6rem,5vw,5.5rem)] font-medium leading-[0.94] tracking-normal text-black"
            >
              {service.closingTitle}
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="mt-5 text-xl leading-8 text-black/70">
              {service.closingText}
            </AnimatedText>
          </div>
          <Button href="/contact" className="justify-self-start lg:justify-self-end">
            Nous contacter
          </Button>
        </section>

        <RelatedLinks />
      </PageContainer>
    </main>
  )
}

export function WebService() {
  return <ServiceDetail service={webService} />
}

export function MarketingService() {
  return <ServiceDetail service={marketingService} />
}
