import { motion, useReducedMotion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { PageContainer } from '../components/layout'
import { AnimatedSection, AnimatedText, Button } from '../components/ui'
import { getProjectBySlug } from '../data/projects'
import NotFound from './NotFound'

const revealEase = [0.22, 1, 0.36, 1]

function SpecCell({ label, value }) {
  return (
    <div className="group bg-[var(--bg)] p-5 transition-colors duration-300 hover:bg-[var(--card)] sm:p-6">
      <span className="text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
        {label}
      </span>
      <p className="mt-2 text-lg font-semibold leading-tight text-black">
        {value}
      </p>
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const shouldReduceMotion = useReducedMotion()

  if (!project) {
    return <NotFound />
  }

  return (
    <main style={{ '--active-accent': project.accent }}>
      <PageContainer>
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden border-b border-black/20 pb-12 pt-10 text-left lg:pb-16">
          <span
            className="pointer-events-none absolute -top-8 right-0 select-none text-[clamp(11rem,30vw,26rem)] font-semibold leading-none text-black/[0.05]"
            aria-hidden="true"
          >
            {project.number}
          </span>

          <div className="relative z-10">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/#nos-projets"
                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-black/55 transition hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">←</span>
                Tous les projets
              </Link>
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-black/45">
                <span className="h-2 w-2 bg-[var(--active-accent)]" aria-hidden="true" />
                Projet réalisé / {project.number}
              </span>
            </div>

            <p className="mb-5 inline-flex bg-[var(--blue)] px-3 py-1 text-xs font-semibold uppercase tracking-normal text-white">
              {project.eyebrow}
            </p>
            <AnimatedText
              as="h1"
              split="words"
              className="max-w-5xl text-[clamp(3rem,10vw,8.5rem)] font-semibold uppercase leading-[0.88] text-black"
            >
              {project.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.14}
              className="mt-6 max-w-2xl text-xl leading-8 text-black/70"
            >
              {project.description}
            </AnimatedText>
          </div>
        </section>

        {/* ===== FICHE TECHNIQUE ===== */}
        <AnimatedSection>
          <section className="grid gap-px border-b border-black/20 bg-black/15 sm:grid-cols-2 lg:grid-cols-4">
            <SpecCell label="Client" value={project.title} />
            <SpecCell label="Secteur" value={project.eyebrow} />
            <SpecCell label="Mandat" value={project.mandate} />
            <SpecCell label="Année" value={project.year} />
          </section>
        </AnimatedSection>

        {/* ===== IMAGE SHOWCASE ===== */}
        <section className="border-b border-black/20 py-14 lg:py-20">
          <motion.figure
            className="group relative overflow-hidden border border-black/20 shadow-[0_44px_120px_rgba(0,0,0,0.20)]"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.985 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, ease: revealEase }}
          >
            <span
              className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[length:25%_100%,100%_88px]"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_60%,rgba(0,0,0,0.26))]"
              aria-hidden="true"
            />
            <img
              src={project.image}
              alt={`Aperçu du site web de ${project.title}`}
              width="1600"
              height="1000"
              className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              style={{ objectPosition: project.imagePosition }}
              decoding="async"
              fetchPriority="high"
            />
            <figcaption className="absolute bottom-6 left-6 z-20 flex items-center gap-3 bg-[var(--bg)]/90 px-4 py-2 text-xs font-semibold uppercase text-black backdrop-blur-sm">
              <span className="h-2 w-2 bg-[var(--active-accent)]" aria-hidden="true" />
              Aperçu du site — {project.title}
            </figcaption>
          </motion.figure>
        </section>

        {/* ===== L'ENTREPRISE ===== */}
        <section className="grid gap-10 border-b border-black/20 py-14 text-left lg:grid-cols-[0.3fr_0.7fr] lg:py-20">
          <div>
            <span className="sticky top-32 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[var(--blue)]">
              <span className="h-px w-10 bg-[var(--blue)]" aria-hidden="true" />
              01 / L’entreprise
            </span>
          </div>
          <div className="min-w-0 space-y-7">
            {project.summary.map((paragraph, index) => (
              <AnimatedText
                key={paragraph.slice(0, 24)}
                as="p"
                delay={index * 0.08}
                className="max-w-3xl text-[clamp(1.25rem,2vw,1.7rem)] font-medium leading-relaxed text-black/80"
              >
                {paragraph}
              </AnimatedText>
            ))}
          </div>
        </section>

        {/* ===== CE QUE TMG A RÉALISÉ ===== */}
        <section className="grid gap-10 border-b border-black/20 py-14 text-left lg:grid-cols-[0.3fr_0.7fr] lg:py-20">
          <div>
            <span className="sticky top-32 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[var(--blue)]">
              <span className="h-px w-10 bg-[var(--blue)]" aria-hidden="true" />
              02 / Le mandat TMG
            </span>
          </div>
          <ul className="min-w-0">
            {project.services.map((service, index) => (
              <AnimatedSection key={service} delay={index * 0.07}>
                <li className="group border-b border-black/20 last:border-b-0">
                  <div className="flex items-center gap-5 py-7 transition-transform duration-300 ease-out group-hover:translate-x-3 sm:gap-8">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-sm font-semibold text-white transition-transform duration-300 group-hover:-translate-y-1">
                      0{index + 1}
                    </span>
                    <span className="text-[clamp(1.3rem,2.8vw,2.3rem)] font-semibold uppercase leading-none text-black transition-colors duration-300 group-hover:text-[var(--blue)]">
                      {service}
                    </span>
                    <span
                      className="ml-auto text-2xl text-black/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--blue)]"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </li>
              </AnimatedSection>
            ))}
          </ul>
        </section>

        {/* ===== CTA LIVE ===== */}
        <section className="py-14 lg:py-20">
          <AnimatedSection>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 border border-[var(--blue)] bg-[var(--blue)] px-6 py-10 text-white transition-colors duration-300 hover:bg-transparent hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)] sm:px-12 sm:py-14"
              >
                <span className="min-w-0">
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-wide opacity-70">
                    {project.title} — en ligne
                  </span>
                  <span className="block text-[clamp(1.9rem,5.5vw,4.4rem)] font-semibold uppercase leading-none">
                    Voir le site en live
                  </span>
                </span>
                <span
                  className="shrink-0 text-[clamp(2.4rem,6vw,5rem)] leading-none transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            ) : (
              <div className="flex items-center justify-between gap-6 border border-dashed border-black/30 px-6 py-10 text-black/45 sm:px-12 sm:py-14">
                <span className="min-w-0">
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-wide">
                    {project.title}
                  </span>
                  <span className="block text-[clamp(1.9rem,5.5vw,4.4rem)] font-semibold uppercase leading-none">
                    Site en ligne bientôt
                  </span>
                </span>
                <span className="shrink-0 text-[clamp(2.4rem,6vw,5rem)] leading-none" aria-hidden="true">
                  ↗
                </span>
              </div>
            )}
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-black/55">
                Votre organisation mérite le même niveau d’exécution.
              </p>
              <Button href="/contact" variant="outline">
                Lancer un projet similaire ↗
              </Button>
            </div>
          </AnimatedSection>
        </section>
      </PageContainer>
    </main>
  )
}
