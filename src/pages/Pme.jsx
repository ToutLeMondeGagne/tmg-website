import { Link } from 'react-router-dom'
import { PageContainer } from '../components/layout'
import RelatedLinks from '../components/seo/RelatedLinks'
import { AnimatedSection, AnimatedText, Button, Card, SectionLabel } from '../components/ui'

const promises = [
  {
    title: 'Coûts réduits',
    text: 'Sans compromettre la qualité des livrables.',
  },
  {
    title: '100 % vôtre',
    text: 'Tous les accès et fichiers remis à la fin.',
  },
  {
    title: 'Livraison rapide',
    text: 'Des délais respectés, sans étirer le budget.',
  },
  {
    title: 'Supervisé & révisé',
    text: 'Chaque livrable validé avant remise.',
  },
]

const challenges = [
  {
    problemTitle: 'Les agences traditionnelles coûtent trop cher',
    problem:
      "Les devis des grandes agences dépassent souvent le budget d'une PME, surtout en phase de démarrage ou de croissance.",
    answerTitle: 'Un modèle qui réduit les coûts sans réduire la qualité',
    answer:
      "Le modèle stage permet d'offrir des services à des tarifs accessibles. Chaque livrable est supervisé et révisé avant remise.",
  },
  {
    problemTitle: "Vous n'avez pas le temps de gérer le marketing",
    problem:
      "Gérer son site, ses réseaux et sa stratégie en plus de son cœur de métier, c'est souvent trop pour une petite équipe.",
    answerTitle: 'On prend en charge, vous validez',
    answer:
      "TMG gère l'exécution complète. Vous n'avez qu'à approuver les jalons clés. Aucune micro-gestion requise de votre côté.",
  },
]

const pmeServices = [
  {
    title: 'Création & Refonte Web',
    text: 'Site vitrine ou e-commerce, mobile-first, optimisé SEO, avec formation à la prise en main incluse.',
    timeline: '4-8 semaines',
    href: '/services/web',
  },
  {
    title: 'Stratégie & Audit Marketing',
    text: "Analyse de votre positionnement, de vos concurrents et plan d'action détaillé avec indicateurs de succès.",
    timeline: '2-4 semaines',
    href: '/services/marketing',
  },
]

export default function Pme() {
  return (
    <main>
      <PageContainer>
        <section className="grid min-h-[calc(100svh-6rem)] gap-12 border-b border-black/20 py-20 text-left lg:grid-cols-[0.52fr_0.48fr] lg:items-center">
          <div className="space-y-8">
            <SectionLabel>Pour les entreprises</SectionLabel>
            <h1 className="max-w-4xl text-[clamp(3.2rem,7vw,8rem)] font-medium leading-[0.92] tracking-normal text-black">
              <AnimatedText split="words">Croissez sans vous ruiner en</AnimatedText>{' '}
              <AnimatedText split="words" delay={0.24} className="text-[var(--blue)]">
                marketing.
              </AnimatedText>
            </h1>
            <AnimatedText
              as="p"
              delay={0.18}
              className="max-w-xl text-xl leading-8 text-black/70"
            >
              Des stratégies marketing et des sites web de qualité
              professionnelle, à un coût adapté à la réalité d&apos;une PME ou
              d&apos;une startup en croissance.
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
                  variant="blue"
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
              On vous comprend
            </span>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              Les défis que vous connaissez.
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              Et les solutions qu&apos;on apporte.
            </AnimatedText>
          </div>

          <div className="space-y-5">
            {challenges.map((item) => (
              <AnimatedSection
                key={item.problemTitle}
                className="grid gap-5 lg:grid-cols-2"
              >
                <Card className="text-left text-black" padding="p-8" variant="blue">
                  <span className="mb-3 block text-sm font-medium uppercase text-red-500">
                    Problème
                  </span>
                  <h3 className="mb-4 text-2xl font-semibold leading-tight text-black">
                    {item.problemTitle}
                  </h3>
                  <p className="text-lg leading-8 text-black/70">{item.problem}</p>
                </Card>

                <Card className="text-left text-black" padding="p-8" variant="blue">
                  <span className="mb-3 block text-sm font-medium uppercase text-[var(--blue)]">
                    Solution TMG
                  </span>
                  <h3 className="mb-4 text-2xl font-semibold leading-tight text-black">
                    {item.answerTitle}
                  </h3>
                  <p className="text-lg leading-8 text-black/70">{item.answer}</p>
                </Card>
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
              Nos services pour les PME
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              Des livrables concrets, des délais réalistes, une supervision
              professionnelle.
            </AnimatedText>
          </div>

          <div className="space-y-5">
            {pmeServices.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.06}>
                <Link
                  to={service.href}
                  className="tmg-blue-card grid gap-6 border border-[rgba(0,76,255,0.45)] bg-[linear-gradient(135deg,#07111f_0%,#0b2f86_52%,#004cff_100%)] p-8 text-left text-white shadow-[0_20px_65px_rgba(0,0,0,0.14)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_26px_80px_rgba(0,76,255,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)] md:grid-cols-[0.08fr_1fr_auto] md:items-center"
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
          <div>
            <AnimatedText
              as="h2"
              split="words"
              className="max-w-4xl text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              Un budget adapté à votre réalité.
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.12}
              className="mt-6 max-w-xl text-xl leading-8 text-black/70"
            >
              On ne pratique pas les tarifs d&apos;une grande agence. On discute
              de votre projet, de vos contraintes, et on trouve ensemble une
              approche qui vous convient.
            </AnimatedText>
          </div>
          <Button href="/contact" className="justify-self-start lg:justify-self-end">
            Démarrer un projet
          </Button>
        </section>

        <RelatedLinks />
      </PageContainer>
    </main>
  )
}
