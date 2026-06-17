import { PageContainer } from '../components/layout'
import {
  AnimatedSection,
  AnimatedText,
  Button,
  Card,
  SectionLabel,
  TicketCard,
} from '../components/ui'
import heroStackImage from '../assets/hero.png'
import tmgLogo from '../assets/logos/tmg-logo.png'

const highlights = [
  {
    title: 'Sites web',
    text: 'Des pages rapides, claires et pensées pour convertir les bons visiteurs.',
  },
  {
    title: 'Marketing',
    text: 'Des campagnes simples à comprendre, solides à mesurer et faciles à ajuster.',
  },
  {
    title: 'Systèmes',
    text: 'Une expérience structurée pour guider les prospects du premier clic au rendez-vous.',
  },
]

const heroLogoOrbitItems = [
  {
    x: 'clamp(-8.5rem, -28vw, -5.8rem)',
    y: 'clamp(-5.6rem, -18vw, -3.9rem)',
    driftX: '0.8rem',
    driftY: '-0.35rem',
    rotateStart: '-8deg',
    rotateEnd: '5deg',
    puzzleX: 'calc(var(--logo-piece-w) * -1)',
    puzzleY: 'calc(var(--logo-piece-h) * -0.5)',
    bgPosition: '0% 0%',
    delay: '0s',
  },
  {
    x: 'clamp(-1.8rem, -6vw, -1rem)',
    y: 'clamp(-7.3rem, -22vw, -5.4rem)',
    driftX: '0.55rem',
    driftY: '0.65rem',
    rotateStart: '5deg',
    rotateEnd: '-6deg',
    puzzleX: '0rem',
    puzzleY: 'calc(var(--logo-piece-h) * -0.5)',
    bgPosition: '50% 0%',
    delay: '0s',
  },
  {
    x: 'clamp(5.9rem, 28vw, 8.6rem)',
    y: 'clamp(-5.5rem, -18vw, -3.7rem)',
    driftX: '-0.75rem',
    driftY: '-0.25rem',
    rotateStart: '7deg',
    rotateEnd: '-4deg',
    puzzleX: 'var(--logo-piece-w)',
    puzzleY: 'calc(var(--logo-piece-h) * -0.5)',
    bgPosition: '100% 0%',
    delay: '0s',
  },
  {
    x: 'clamp(-8.2rem, -27vw, -5.6rem)',
    y: 'clamp(3.8rem, 17vw, 5.6rem)',
    driftX: '0.7rem',
    driftY: '0.45rem',
    rotateStart: '4deg',
    rotateEnd: '-7deg',
    puzzleX: 'calc(var(--logo-piece-w) * -1)',
    puzzleY: 'calc(var(--logo-piece-h) * 0.5)',
    bgPosition: '0% 100%',
    delay: '0s',
  },
  {
    x: 'clamp(-1.4rem, -4vw, -0.8rem)',
    y: 'clamp(5.4rem, 22vw, 7.2rem)',
    driftX: '-0.45rem',
    driftY: '-0.6rem',
    rotateStart: '-6deg',
    rotateEnd: '6deg',
    puzzleX: '0rem',
    puzzleY: 'calc(var(--logo-piece-h) * 0.5)',
    bgPosition: '50% 100%',
    delay: '0s',
  },
  {
    x: 'clamp(5.7rem, 27vw, 8.3rem)',
    y: 'clamp(3.5rem, 17vw, 5.4rem)',
    driftX: '-0.85rem',
    driftY: '0.35rem',
    rotateStart: '-5deg',
    rotateEnd: '8deg',
    puzzleX: 'var(--logo-piece-w)',
    puzzleY: 'calc(var(--logo-piece-h) * 0.5)',
    bgPosition: '100% 100%',
    delay: '0s',
  },
]

function HeroStackVisual() {
  return (
    <div
      className="relative mx-auto flex min-h-[19rem] w-full max-w-[22rem] items-center justify-center md:min-h-[22rem] lg:max-w-[24rem]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-6 left-1/2 w-px bg-black/15"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute left-3 top-8 h-2.5 w-2.5 bg-[var(--green)] shadow-[0_0_0_1px_rgba(0,76,255,0.22)]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-10 right-4 h-2 w-2 bg-[var(--blue)]"
        aria-hidden="true"
      />
      {heroLogoOrbitItems.map((item) => (
        <span
          key={`${item.x}-${item.y}`}
          className="tmg-logo-orbit pointer-events-none absolute left-1/2 top-1/2 z-30 flex items-center justify-center overflow-hidden border border-black/15 bg-[var(--bg)]/86 p-1.5 shadow-[0_14px_34px_rgba(0,0,0,0.12)] backdrop-blur-sm"
          style={{
            '--orbit-x': item.x,
            '--orbit-y': item.y,
            '--orbit-drift-x': item.driftX,
            '--orbit-drift-y': item.driftY,
            '--orbit-rotate-start': item.rotateStart,
            '--orbit-rotate-end': item.rotateEnd,
            '--puzzle-x': item.puzzleX,
            '--puzzle-y': item.puzzleY,
            '--puzzle-bg-position': item.bgPosition,
            '--puzzle-image': `url(${tmgLogo})`,
            '--orbit-delay': item.delay,
          }}
          aria-hidden="true"
        >
          <span className="tmg-logo-puzzle-slice" />
          <img
            src={tmgLogo}
            alt=""
            className="tmg-logo-card-mark h-auto w-full object-contain"
            draggable="false"
          />
        </span>
      ))}
      <img
        src={heroStackImage}
        alt="Couches visuelles TMG superposées"
        className="tmg-stack-float relative z-10 w-[min(72vw,17rem)] drop-shadow-[0_34px_42px_rgba(0,0,0,0.24)] md:w-[18rem] lg:w-[20rem]"
      />
      <span
        className="tmg-stack-scan pointer-events-none absolute left-1/2 top-1/2 z-20 h-28 w-[72%] -translate-x-1/2 -translate-y-1/2 border-y border-[var(--blue)]/60 bg-[linear-gradient(90deg,transparent,rgba(0,76,255,0.1),transparent)]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-7 left-1/2 h-px w-[82%] -translate-x-1/2 bg-black/25"
        aria-hidden="true"
      />
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <PageContainer>
        <section className="relative flex min-h-[calc(100svh-6rem)] flex-col justify-center border-b border-black/20 py-16 text-left">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.42fr)] lg:items-center xl:grid-cols-[minmax(0,1fr)_26rem]">
            <AnimatedText
              as="h1"
              split="words"
              wordClassName="!pb-[0.04em] !pt-0"
              className="max-w-full text-[clamp(2rem,9vw,3rem)] font-semibold uppercase leading-[0.8] tracking-normal text-black md:text-[clamp(4rem,9.2vw,9rem)] md:leading-[0.76] xl:text-[clamp(7rem,8.8vw,10rem)] xl:leading-[0.74]"
            >
              Sites web et marketing qui transforment votre trafic en clients.
            </AnimatedText>

            <div className="space-y-8 lg:translate-y-16 xl:translate-y-20">
              <HeroStackVisual />
              <div className="space-y-7">
                <AnimatedText
                  as="p"
                  delay={0.18}
                  className="max-w-md text-xl leading-7 text-black/75"
                >
                  On construit des sites et systèmes marketing pour les équipes qui
                  veulent être vues, comprises et choisies.
                </AnimatedText>
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Button href="/contact" className="w-full sm:w-auto">
                    Construisons le vôtre
                  </Button>
                  <Button href="/services" variant="outline" className="w-full sm:w-auto">
                    Voir les services ↗
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-5 hidden items-center justify-between text-xs font-medium uppercase tracking-normal text-black md:flex">
            <span>Instagram, LinkedIn</span>
            <span className="text-[var(--blue)]">↓ Scroll down</span>
            <span>bonjour@toutlemondegagne.ca</span>
          </div>
        </section>

        <section className="grid gap-10 border-b border-black/20 py-20 text-left lg:grid-cols-[0.28fr_1fr]">
          <div>
            <SectionLabel>À propos de TMG</SectionLabel>
          </div>
          <div className="space-y-8">
            <AnimatedText
              as="h1"
              split="words"
              className="max-w-5xl text-[clamp(2.6rem,5vw,5.8rem)] font-medium leading-[0.98] tracking-normal text-black"
            >
              La plupart des sites restent là. Le vôtre doit devenir la raison
              pour laquelle on vous contacte.
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.12}
              className="max-w-3xl border-t border-black/30 pt-8 text-xl leading-8 text-black/70"
            >
              TMG cartographie votre offre, clarifie votre message et transforme
              votre présence web en expérience qui éduque, rassure et convertit.
            </AnimatedText>
            <AnimatedSection delay={0.18}>
              <Button href="/a-propos" variant="outline">
                Découvrir TMG ↗
              </Button>
            </AnimatedSection>
          </div>
        </section>

        <section className="grid gap-5 border-b border-black/20 py-20 md:grid-cols-3">
          {highlights.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.08}>
              <Card className="text-left text-black">
                <h2 className="mb-8 text-5xl font-semibold uppercase leading-none tracking-normal text-[var(--blue)]">
                  {item.title}
                </h2>
                <p className="leading-7 text-black/70">{item.text}</p>
              </Card>
            </AnimatedSection>
          ))}
        </section>

        <section className="py-20">
          <AnimatedSection>
            <TicketCard
              title="Première rencontre gratuite"
              subtitle="Un billet pour 30 minutes de clarté: on regarde votre projet, vos besoins et la meilleure prochaine étape."
              href="/contact"
            />
          </AnimatedSection>
        </section>
      </PageContainer>
    </main>
  )
}
