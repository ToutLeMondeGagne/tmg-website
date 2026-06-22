import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
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
import projectPlaceholderImage from '../assets/images/tmg-team-studio.webp'
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
    title: 'Projet client 01',
    category: 'Nos projets',
    date: 'Photo temporaire',
    summary:
      'Un espace pour présenter le prochain site réalisé par TMG: le contexte, les objectifs et le résultat livré.',
    result:
      'La photo est volontairement temporaire: elle pourra être remplacée par la capture du site final.',
    image: projectPlaceholderImage,
    imageAlt: 'Photo temporaire pour un projet client TMG',
    objectPosition: 'center',
    accent: '#004cff',
  },
  {
    number: '02',
    title: 'Projet client 02',
    category: 'Refonte web',
    date: 'Photo temporaire',
    summary:
      'Une deuxième fiche prête à recevoir une capture de projet: objectif, parcours utilisateur et résultat visible.',
    result:
      'Elle sert de placeholder pour montrer le rythme de la section avant d’ajouter les vrais visuels.',
    image: projectPlaceholderImage,
    imageAlt: 'Photo temporaire pour un second projet client TMG',
    objectPosition: 'left center',
    accent: '#8cc63f',
  },
  {
    number: '03',
    title: 'Projet client 03',
    category: 'Stratégie marketing',
    date: 'Photo temporaire',
    summary:
      'Une troisième entrée pour compléter l’effet de défilement et donner une vraie sensation de portfolio vivant.',
    result:
      'Quand le dernier projet est passé, le scroll continue naturellement vers la section suivante.',
    image: projectPlaceholderImage,
    imageAlt: 'Photo temporaire pour un troisième projet client TMG',
    objectPosition: 'right center',
    accent: '#111827',
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
    <figure className="relative overflow-hidden border border-black/15 bg-black/10 shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
      <span
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[length:25%_100%,100%_72px]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_52%,rgba(0,0,0,0.24))]"
        aria-hidden="true"
      />
      <img
        src={project.image}
        alt={project.imageAlt}
        width="1600"
        height="1000"
        className="aspect-[16/10] h-full w-full object-cover"
        style={{ objectPosition: project.objectPosition }}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="absolute bottom-4 left-4 z-20 flex items-center gap-3 bg-[var(--bg)]/90 px-3 py-2 text-xs font-semibold uppercase text-black backdrop-blur-sm">
        <span className="h-2 w-2 bg-[var(--project-accent)]" aria-hidden="true" />
        {project.number} / Image temporaire
      </figcaption>
    </figure>
  )
}

function ProjectStackCard({ project, index, total, progress }) {
  const segment = 1 / total
  const start = index * segment
  const exit = Math.min(1, start + segment)
  const enter = Math.max(0, start - segment * 0.65)
  const isFirst = index === 0
  const isLast = index === total - 1
  const opacityInput = isFirst
    ? [0, exit - segment * 0.16, exit]
    : isLast
      ? [enter, start + segment * 0.16, 1]
      : [enter, start + segment * 0.12, exit - segment * 0.14, exit]
  const opacityOutput = isFirst ? [1, 1, 0] : isLast ? [0.52, 1, 1] : [0.5, 1, 1, 0]
  const yInput = opacityInput
  const yOutput = isFirst
    ? [0, 0, -74]
    : isLast
      ? [66, 0, 0]
      : [48, 0, 0, -74]
  const scaleOutput = isFirst
    ? [1, 1, 0.94]
    : isLast
      ? [0.9, 1, 1]
      : [0.92, 1, 1, 0.94]
  const rotateOutput = isFirst
    ? [-1.2, -1.2, -4]
    : isLast
      ? [3.4, 0, 0]
      : [2.4, 0, 0, -4]
  const imageY = useTransform(
    progress,
    [Math.max(0, start - segment * 0.5), Math.min(1, exit)],
    ['2%', '-5%'],
  )
  const opacity = useTransform(progress, opacityInput, opacityOutput)
  const y = useTransform(progress, yInput, yOutput)
  const scale = useTransform(progress, yInput, scaleOutput)
  const rotate = useTransform(progress, yInput, rotateOutput)

  return (
    <motion.figure
      className="absolute inset-0 overflow-hidden border border-black/15 bg-black/10 shadow-[0_24px_70px_rgba(0,0,0,0.16)]"
      style={{
        '--project-accent': project.accent,
        opacity,
        y,
        scale,
        rotate,
        zIndex: total - index,
        transformOrigin: 'center bottom',
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[length:25%_100%,100%_72px]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_52%,rgba(0,0,0,0.28))]"
        aria-hidden="true"
      />
      <motion.img
        src={project.image}
        alt={project.imageAlt}
        width="1600"
        height="1000"
        className="h-full w-full scale-110 object-cover"
        style={{ y: imageY, objectPosition: project.objectPosition }}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="absolute bottom-4 left-4 z-20 flex items-center gap-3 bg-[var(--bg)]/90 px-3 py-2 text-xs font-semibold uppercase text-black backdrop-blur-sm">
        <span className="h-2 w-2 bg-[var(--project-accent)]" aria-hidden="true" />
        {project.number} / Image temporaire
      </figcaption>
    </motion.figure>
  )
}

function ProjectMeta({ project }) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={project.image}
        alt=""
        width="96"
        height="72"
        className="h-12 w-16 border border-black/15 object-cover"
        loading="lazy"
        decoding="async"
      />
      <div>
        <p className="text-base font-medium text-black">{project.title}</p>
        <p className="text-sm text-black/55">{project.date}</p>
      </div>
    </div>
  )
}

function ProjectStory({ project, index, total, progress }) {
  const segment = 1 / total
  const start = index * segment
  const exit = Math.min(1, start + segment)
  const enter = Math.max(0, start - segment * 0.54)
  const isFirst = index === 0
  const isLast = index === total - 1
  const input = isFirst
    ? [0, exit - segment * 0.18, exit]
    : isLast
      ? [enter, start + segment * 0.12, 1]
      : [enter, start + segment * 0.12, exit - segment * 0.16, exit]
  const opacity = useTransform(
    progress,
    input,
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0],
  )
  const y = useTransform(
    progress,
    input,
    isFirst ? [0, 0, -28] : isLast ? [28, 0, 0] : [28, 0, 0, -28],
  )

  return (
    <motion.article
      className="absolute inset-0 flex flex-col justify-between"
      style={{
        '--project-accent': project.accent,
        opacity,
        y,
      }}
    >
      <div className="space-y-5">
        <SectionLabel>{index === 0 ? 'Nos projets' : project.category}</SectionLabel>
        <span className="block text-sm font-semibold uppercase text-[var(--project-accent)]">
          {project.number}
        </span>
        <h2 className="text-[clamp(2.8rem,5.5vw,5.8rem)] font-semibold uppercase leading-[0.9] tracking-normal text-black">
          {project.title}
        </h2>
      </div>

      <div className="space-y-8">
        <p className="max-w-md text-lg leading-8 text-black/72 lg:text-xl">
          {project.summary}
        </p>
        <p className="max-w-md border-t border-black/20 pt-5 text-sm font-semibold uppercase leading-6 text-black/58">
          {project.result}
        </p>
        <ProjectMeta project={project} />
      </div>
    </motion.article>
  )
}

function MobileProjectItem({ project, index }) {
  return (
    <AnimatedSection
      as="article"
      className="border-b border-black/20 py-12 last:border-b-0"
      delay={index * 0.05}
      amount={0.16}
      style={{ '--project-accent': project.accent }}
    >
      <div className="space-y-6">
        <SectionLabel>{index === 0 ? 'Nos projets' : project.category}</SectionLabel>
        <span className="block text-sm font-semibold uppercase text-[var(--project-accent)]">
          {project.number}
        </span>
        <h2 className="text-[clamp(2.5rem,13vw,4.8rem)] font-semibold uppercase leading-[0.9] tracking-normal text-black">
          {project.title}
        </h2>
        <ProjectPreview project={project} />
        <div className="space-y-6">
          <p className="text-lg leading-8 text-black/72">{project.summary}</p>
          <p className="border-t border-black/20 pt-5 text-sm font-semibold uppercase leading-6 text-black/58">
            {project.result}
          </p>
          <ProjectMeta project={project} />
        </div>
      </div>
    </AnimatedSection>
  )
}

function ProjectsShowcase() {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="nos-projets"
      ref={sectionRef}
      className="scroll-mt-24 border-b border-black/20 text-left"
    >
      <div className="border-t border-black/20 lg:hidden">
        {projects.map((project, index) => (
          <MobileProjectItem key={project.title} project={project} index={index} />
        ))}
      </div>

      {!shouldReduceMotion ? (
        <div
          className="relative hidden border-t border-black/20 lg:block"
          style={{ height: `${projects.length * 100}svh` }}
        >
          <div className="sticky top-24 flex min-h-[calc(100svh-6rem)] items-center py-10">
            <div className="grid w-full gap-10 lg:grid-cols-[0.29fr_0.71fr] lg:items-center">
              <div className="relative min-h-[34rem]">
                {projects.map((project, index) => (
                  <ProjectStory
                    key={project.title}
                    project={project}
                    index={index}
                    total={projects.length}
                    progress={scrollYProgress}
                  />
                ))}
              </div>

              <div
                className="relative h-[min(62svh,46rem)]"
                style={{ perspective: '1200px' }}
              >
                {projects.map((project, index) => (
                  <ProjectStackCard
                    key={project.title}
                    project={project}
                    index={index}
                    total={projects.length}
                    progress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-10 left-0 right-0 flex justify-between text-xs font-semibold uppercase text-black/45">
            <span>Scroll sur place</span>
            <span className="text-[var(--blue)]">01 → 03</span>
            <span>Suite de la page</span>
          </div>
        </div>
      ) : null}

      {shouldReduceMotion ? (
        <div className="hidden border-t border-black/20 lg:block">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="grid gap-10 border-b border-black/20 py-16 last:border-b-0 lg:grid-cols-[0.29fr_0.71fr] lg:items-center"
              style={{ '--project-accent': project.accent }}
            >
              <div className="space-y-8">
                <div className="space-y-5">
                  <SectionLabel>{index === 0 ? 'Nos projets' : project.category}</SectionLabel>
                  <span className="block text-sm font-semibold uppercase text-[var(--project-accent)]">
                    {project.number}
                  </span>
                  <h2 className="text-[clamp(2.8rem,5.5vw,5.8rem)] font-semibold uppercase leading-[0.9] tracking-normal text-black">
                    {project.title}
                  </h2>
                </div>
                <p className="max-w-md text-xl leading-8 text-black/72">
                  {project.summary}
                </p>
                <ProjectMeta project={project} />
              </div>
              <ProjectPreview project={project} />
            </article>
          ))}
        </div>
      ) : null}
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
