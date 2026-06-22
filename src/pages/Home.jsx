import { PageContainer } from '../components/layout'
import RelatedLinks from '../components/seo/RelatedLinks'
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

const projects = [
  {
    number: '01',
    title: 'Intellecte',
    category: 'Éducation internationale',
    summary:
      'Une présence web plus claire pour guider les étudiants vers le bon parcours, du premier intérêt jusqu’à la prise de contact.',
    result: 'Parcours simplifié, message clarifié et vitrine pensée pour convertir les demandes.',
    tags: ['Site web', 'UX', 'Conversion'],
    accent: '#004cff',
    soft: '#e5edff',
    mockTitle: 'Expand Your Horizons',
    mockText: 'Programmes, destinations et accompagnement réunis dans une expérience lisible.',
  },
  {
    number: '02',
    title: 'PME en croissance',
    category: 'Services professionnels',
    summary:
      'Une refonte orientée crédibilité pour expliquer l’offre, rassurer les prospects et générer des rendez-vous qualifiés.',
    result: 'Pages services plus précises, appels à l’action visibles et structure SEO plus solide.',
    tags: ['Positionnement', 'SEO', 'Landing pages'],
    accent: '#111827',
    soft: '#e5e7eb',
    mockTitle: 'Votre offre, enfin claire',
    mockText: 'Une structure simple pour comprendre, comparer et passer à l’action.',
  },
  {
    number: '03',
    title: 'OBNL local',
    category: 'Mission sociale',
    summary:
      'Un site plus accessible pour raconter la mission, présenter les services et faciliter les dons, bénévolats et prises de contact.',
    result: 'Contenus mieux hiérarchisés, expérience mobile plus directe et autonomie de mise à jour.',
    tags: ['Accessibilité', 'Contenu', 'Autonomie'],
    accent: '#8cc63f',
    soft: '#ecffd6',
    mockTitle: 'Votre mission à sa hauteur',
    mockText: 'Un parcours qui aide la communauté à comprendre vite et agir simplement.',
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
            width="720"
            height="356"
            className="tmg-logo-card-mark h-auto w-full object-contain"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </span>
      ))}
      <img
        src={heroStackImage}
        alt="Couches visuelles TMG superposées"
        width="343"
        height="361"
        className="tmg-stack-float relative z-10 w-[min(72vw,17rem)] drop-shadow-[0_34px_42px_rgba(0,0,0,0.24)] md:w-[18rem] lg:w-[20rem]"
        decoding="async"
        fetchPriority="high"
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

function ProjectPreview({ project }) {
  return (
    <div className="relative min-h-[20rem] overflow-hidden border border-black/20 bg-[var(--project-soft)] shadow-[0_24px_70px_rgba(0,0,0,0.14)] lg:min-h-[30rem]">
      <div className="flex items-center justify-between border-b border-black/15 bg-[var(--bg)]/88 px-4 py-3 text-[0.62rem] font-semibold uppercase text-black/55 sm:px-5">
        <span>{project.title}</span>
        <span className="text-[var(--project-accent)]">TMG build</span>
      </div>

      <div className="grid min-h-[17rem] gap-0 md:grid-cols-[0.52fr_0.48fr] lg:min-h-[26rem]">
        <div className="flex flex-col justify-between border-b border-black/15 bg-[rgba(255,255,255,0.48)] p-5 md:border-b-0 md:border-r md:p-7">
          <div className="space-y-5">
            <span className="inline-flex w-fit bg-[var(--project-accent)] px-3 py-1 text-xs font-semibold uppercase text-white">
              {project.category}
            </span>
            <h3 className="max-w-sm text-[clamp(2rem,5vw,4.6rem)] font-semibold uppercase leading-[0.86] tracking-normal text-black">
              {project.mockTitle}
            </h3>
            <p className="max-w-md text-sm leading-6 text-black/66 md:text-base md:leading-7">
              {project.mockText}
            </p>
          </div>

          <span className="mt-8 inline-flex w-fit border border-black/25 px-4 py-2 text-xs font-semibold uppercase text-black">
            Voir le parcours ↗
          </span>
        </div>

        <div className="relative min-h-[16rem] overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.62),rgba(255,255,255,0.18))] p-5 md:p-7">
          <span
            className="absolute -right-16 top-8 h-48 w-48 rounded-full bg-[var(--project-accent)] opacity-20 blur-3xl"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-0 left-0 h-24 w-full bg-[linear-gradient(90deg,var(--project-accent),transparent)] opacity-25"
            aria-hidden="true"
          />

          <div className="relative z-10 ml-auto flex h-full max-w-sm flex-col justify-between border border-black/15 bg-[var(--bg)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-black/15 pb-3">
                <span className="h-2.5 w-20 bg-[var(--project-accent)]" />
                <span className="h-2.5 w-10 bg-black/20" />
              </div>
              <span className="block h-24 bg-[linear-gradient(135deg,var(--project-accent),rgba(255,255,255,0.36))]" />
              <span className="block h-3 w-10/12 bg-black/18" />
              <span className="block h-3 w-7/12 bg-black/18" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-black/15 bg-white/45 px-2 py-3 text-[0.58rem] font-semibold uppercase leading-tight text-black/62"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectsShowcase() {
  return (
    <section className="border-b border-black/20 text-left">
      <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
        <aside className="py-20 lg:sticky lg:top-24 lg:flex lg:min-h-[calc(100svh-6rem)] lg:flex-col lg:justify-between">
          <div className="space-y-6">
            <SectionLabel>Nos projets</SectionLabel>
            <AnimatedText
              as="h2"
              split="words"
              className="max-w-xl text-[clamp(2.8rem,6vw,6.6rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              Ce qu’on a construit, concrètement.
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="max-w-sm text-lg leading-7 text-black/68">
              Chaque projet clarifie une offre, structure un parcours et donne
              aux visiteurs une raison simple de passer à l’action.
            </AnimatedText>
          </div>

          <div className="mt-10 hidden border-t border-black/25 pt-6 text-sm font-medium uppercase text-black/55 lg:block">
            <span className="text-[var(--blue)]">01</span> / {projects.length
              .toString()
              .padStart(2, '0')}{' '}
            projets sélectionnés
          </div>
        </aside>

        <div className="pb-20 lg:pb-0">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="relative border-t border-black/20 py-10 first:border-t-0 lg:sticky lg:top-24 lg:flex lg:min-h-[calc(100svh-6rem)] lg:items-center lg:bg-[var(--bg)]"
              style={{
                '--project-accent': project.accent,
                '--project-soft': project.soft,
                zIndex: index + 1,
              }}
            >
              <AnimatedSection
                className="grid w-full gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-center"
                delay={0.04}
                amount={0.18}
              >
                <div className="space-y-6">
                  <span className="text-sm font-semibold uppercase text-[var(--project-accent)]">
                    {project.number}
                  </span>
                  <h3 className="text-[clamp(2.6rem,5vw,5.7rem)] font-semibold uppercase leading-[0.88] tracking-normal text-black">
                    {project.title}
                  </h3>
                  <p className="text-lg leading-8 text-black/72">{project.summary}</p>
                  <p className="border-t border-black/20 pt-5 text-sm font-semibold uppercase leading-6 text-black/58">
                    {project.result}
                  </p>
                </div>

                <ProjectPreview project={project} />
              </AnimatedSection>
            </article>
          ))}
        </div>
      </div>
    </section>
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
              as="h2"
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

        <ProjectsShowcase />

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

        <RelatedLinks />

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
