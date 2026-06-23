import { Link } from 'react-router-dom'
import { PageContainer } from '../components/layout'
import RelatedLinks from '../components/seo/RelatedLinks'
import {
  AnimatedSection,
  AnimatedText,
  Button,
  Card,
  ChallengePair,
  SectionLabel,
} from '../components/ui'

const promises = [
  {
    title: 'Budget respecté',
    text: 'Pas de surprise en cours de mandat.',
  },
  {
    title: 'Équipe dédiée',
    text: 'Profils complémentaires sur votre projet.',
  },
  {
    title: '100 % vôtre',
    text: 'Tous les accès et fichiers remis à la fin.',
  },
  {
    title: 'Transparence & autonomie',
    text: 'Vous restez décideur à chaque étape.',
  },
]

const constraints = [
  {
    challengeTitle: 'Budget limité, besoins réels',
    challenge:
      "Les OBNL ont souvent peu de ressources pour investir en marketing ou en refonte web, mais en ont pourtant besoin pour rejoindre leurs donateurs et bénéficiaires.",
    answerTitle: 'Le modèle stage rend ça possible',
    answer:
      "En faisant travailler des étudiants supervisés, TMG peut offrir des livrables professionnels à des coûts adaptés aux réalités des organismes à mission sociale.",
  },
  {
    challengeTitle: 'Pas de ressources internes en numérique',
    challenge:
      "Beaucoup d'OBNL n'ont pas de gestionnaire de site web ou de stratège marketing à l'interne. Le numérique reste une boîte noire.",
    answerTitle: 'Formation et passation incluses',
    answer:
      "Chaque livrable est accompagné d'une formation adaptée à vos équipes. Vous repartez autonomes, sans dépendance envers TMG.",
  },
]

const obnlServices = [
  {
    title: 'Site web pour OBNL',
    text: "Site accessible, clair, optimisé pour les dons et l'engagement communautaire. Mobile-first, facile à gérer.",
    timeline: '4-8 semaines',
    href: '/services/web',
  },
  {
    title: 'Stratégie de communication',
    text: 'Plan de contenu adapté à votre mission pour rejoindre donateurs, bénévoles et bénéficiaires sur les bons canaux.',
    timeline: '2-4 semaines',
    href: '/services/marketing',
  },
]

export default function Obnl() {
  return (
    <main>
      <PageContainer>
        <section className="grid min-h-[calc(100svh-6rem)] gap-12 border-b border-black/20 py-20 text-left lg:grid-cols-[0.52fr_0.48fr] lg:items-center">
          <div className="space-y-8">
            <SectionLabel>Pour les OBNL & organismes</SectionLabel>
            <h1 className="max-w-4xl text-[clamp(2.6rem,12vw,4.8rem)] font-medium leading-[0.92] tracking-normal text-black sm:text-[clamp(3.2rem,7vw,8rem)]">
              <AnimatedText split="words">Votre mission mérite une présence</AnimatedText>{' '}
              <AnimatedText split="words" delay={0.24} className="text-[var(--blue)]">
                à sa hauteur.
              </AnimatedText>
            </h1>
            <AnimatedText
              as="p"
              delay={0.18}
              className="max-w-xl text-xl leading-8 text-black/70"
            >
              Des solutions numériques accessibles pour les organismes à but non
              lucratif qui veulent rejoindre leur communauté sans se ruiner en
              frais d&apos;agence.
            </AnimatedText>
            <Button href="/contact" variant="secondary">
              Démarrer un projet
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {promises.map((promise, index) => (
              <AnimatedSection key={promise.title} delay={index * 0.06}>
                <Card
                  className="min-h-44 text-left text-black"
                  padding="p-8"
                >
                  <span className="mb-8 flex h-10 w-10 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-sm font-medium text-white">
                    0{index + 1}
                  </span>
                  <h2 className="mb-2 text-3xl font-semibold leading-none text-black">
                    {promise.title}
                  </h2>
                  <p className="text-base leading-6 text-black/65">{promise.text}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section className="border-b border-black/20 py-20 text-left">
          <div className="mb-12 max-w-3xl space-y-5">
            <span className="text-sm font-medium uppercase text-[var(--blue)]">
              On comprend votre contexte
            </span>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              Les contraintes des OBNL.
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              Et comment TMG les adresse concrètement.
            </AnimatedText>
          </div>

          <div className="space-y-5">
            {constraints.map((item) => (
              <AnimatedSection
                key={item.challengeTitle}
                className="min-w-0"
              >
                <ChallengePair
                  problemLabel="Défi"
                  problemTitle={item.challengeTitle}
                  problemText={item.challenge}
                  solutionLabel="Réponse TMG"
                  solutionTitle={item.answerTitle}
                  solutionText={item.answer}
                />
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section className="border-b border-black/20 py-20 text-left">
          <div className="mb-12 max-w-3xl space-y-5">
            <span className="text-sm font-medium uppercase text-[var(--blue)]">
              Ce qu&apos;on vous offre
            </span>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              Nos services pour les OBNL
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              Chaque service est adapté aux réalités et aux objectifs des
              organismes à but non lucratif.
            </AnimatedText>
          </div>

          <div className="space-y-5">
            {obnlServices.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.06}>
                <Link
                  to={service.href}
                  className="grid gap-6 border border-black/20 bg-[var(--card)] p-8 text-left text-black transition duration-200 hover:-translate-y-0.5 hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)] md:grid-cols-[0.08fr_1fr_auto] md:items-center"
                >
                  <span className="text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="mb-2 text-2xl font-semibold leading-tight text-black">
                      {service.title}
                    </h3>
                    <p className="max-w-4xl text-base leading-7 text-black/70">
                      {service.text}
                    </p>
                  </div>
                  <span className="text-sm font-medium uppercase text-[var(--blue)]">
                    {service.timeline}
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-20 text-left lg:grid-cols-[0.6fr_0.4fr] lg:items-end">
          <AnimatedText
            as="h2"
            split="words"
            className="max-w-4xl text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
          >
            Un budget adapté à votre mission.
          </AnimatedText>
          <div className="space-y-6">
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              Votre organisme mérite une présence claire sans modèle compliqué
              ni frais inutiles.
            </AnimatedText>
            <Button href="/contact">Lancer un projet OBNL</Button>
          </div>
        </section>

        <RelatedLinks />
      </PageContainer>
    </main>
  )
}
