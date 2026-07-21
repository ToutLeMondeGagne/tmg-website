import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { projects } from '../../data/projects'

const AUTOPLAY_SECONDS = 5

// Pages de détail projet : uniquement dans les builds de prévisualisation
// (secours). Le build prod garde les images non cliquables.
const PROJECT_PAGES_ENABLED = import.meta.env.VITE_PREVIEW_FEATURES !== 'false'

function ProjectThumbnail({ project }) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={project.image}
        alt=""
        width="112"
        height="80"
        className="h-14 w-20 border border-black/15 object-cover"
        style={{ objectPosition: project.imagePosition }}
        loading="lazy"
        decoding="async"
      />
      <div>
        <p className="text-base font-semibold text-black">{project.title}</p>
        <p className="text-sm text-black/55">Projet {project.number}</p>
      </div>
    </div>
  )
}

function ProjectText({ project, direction, shouldReduceMotion }) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={project.title}
        custom={direction}
        className="flex h-full flex-col justify-between gap-8"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? -48 : 48, filter: 'blur(8px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? 48 : -48, filter: 'blur(8px)' }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="space-y-4">
          <span className="inline-flex bg-[var(--blue)] px-3 py-1 text-xs font-semibold tracking-normal text-white">
            Our work
          </span>
          <p className="text-sm font-semibold text-[var(--active-accent)]">
            {project.number} / {project.eyebrow}
          </p>
          <h2
            data-project-title
            className="max-w-[34rem] text-[clamp(2.4rem,2.75vw,3.65rem)] font-semibold leading-none tracking-normal text-black"
          >
            {project.title}
          </h2>
        </div>

        <div className="space-y-6">
          <p className="max-w-[28rem] text-lg leading-7 text-black/72 xl:text-xl xl:leading-8">
            {project.description}
          </p>
          <ProjectThumbnail project={project} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function ProjectImage({ project, activeIndex, direction, shouldReduceMotion, onPrev, onNext }) {
  const nextProjects = projects.slice(activeIndex + 1, activeIndex + 3)

  return (
    <div
      data-project-image
      className="relative aspect-[16/9] w-full overflow-visible"
      style={{ perspective: '1200px' }}
    >
      {nextProjects.map((nextProject, index) => (
        <div
          key={nextProject.title}
          className="absolute inset-0 border border-black/15 bg-black/10 shadow-[0_22px_60px_rgba(0,0,0,0.13)]"
          style={{
            transform: `translate3d(${(index + 1) * 14}px, ${(index + 1) * 16}px, ${-(index + 1) * 70}px) rotate(${(index + 1) * 1.1}deg)`,
            opacity: 0.34 - index * 0.08,
          }}
          aria-hidden="true"
        >
          <img
            src={nextProject.image}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: nextProject.imagePosition }}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}

      <AnimatePresence mode="sync">
        <motion.figure
          key={project.title}
          className="absolute inset-0 overflow-hidden border border-black/15 bg-black/10 shadow-[0_34px_92px_rgba(0,0,0,0.18)]"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? '-100%' : '100%', filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: '0%', filter: 'blur(0px)' }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? '100%' : '-100%', filter: 'blur(6px)' }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[length:25%_100%,100%_72px]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.28))]"
            aria-hidden="true"
          />
          {PROJECT_PAGES_ENABLED ? (
            <Link
              to={`/projets/${project.slug}`}
              className="group/link absolute inset-0 z-20 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--blue)]"
              aria-label={`Découvrir le projet ${project.title}`}
            >
              <img
                src={project.image}
                alt={`Aperçu du projet ${project.title}`}
                width="1600"
                height="1000"
                className="h-full w-full object-cover transition-transform duration-500 group-hover/link:scale-[1.02]"
                style={{ objectPosition: project.imagePosition }}
                loading="lazy"
                decoding="async"
              />
              <span className="absolute bottom-5 left-5 flex items-center gap-3 bg-[var(--bg)]/90 px-4 py-2 text-xs font-semibold uppercase text-black backdrop-blur-sm transition-colors duration-300 group-hover/link:bg-[var(--blue)] group-hover/link:text-white">
                Voir le projet ↗
              </span>
            </Link>
          ) : (
            <img
              src={project.image}
              alt={`Aperçu du projet ${project.title}`}
              width="1600"
              height="1000"
              className="h-full w-full object-cover"
              style={{ objectPosition: project.imagePosition }}
              loading="lazy"
              decoding="async"
            />
          )}
        </motion.figure>
      </AnimatePresence>

      <CarouselArrow
        direction="prev"
        onClick={onPrev}
        className="absolute left-3 top-1/2 z-30 -translate-y-1/2"
      />
      <CarouselArrow
        direction="next"
        onClick={onNext}
        className="absolute right-3 top-1/2 z-30 -translate-y-1/2"
      />
    </div>
  )
}

function ProjectIndicators({ activeIndex, isPaused, shouldReduceMotion }) {
  return (
    <div className="space-y-4">
      <div className="h-px overflow-hidden bg-black/18">
        <motion.div
          key={activeIndex}
          className="h-full origin-left bg-[var(--blue)]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: shouldReduceMotion || isPaused ? 0 : AUTOPLAY_SECONDS,
            ease: 'linear',
          }}
        />
      </div>
      <div className="flex items-center justify-between text-xs font-semibold text-black/45">
        {projects.map((project, index) => (
          <span
            key={project.number}
            className={index === activeIndex ? 'text-[var(--blue)]' : undefined}
          >
            {project.number}
          </span>
        ))}
      </div>
    </div>
  )
}

function CarouselArrow({ direction, onClick, className = '' }) {
  const isPrev = direction === 'prev'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Projet précédent' : 'Projet suivant'}
      className={`flex h-12 w-12 items-center justify-center border border-black/20 bg-[var(--bg)]/85 text-black shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-colors hover:border-[var(--blue)] hover:bg-[var(--blue)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)] ${className}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        aria-hidden="true"
      >
        {isPrev ? (
          <polyline points="15 6 9 12 15 18" />
        ) : (
          <polyline points="9 6 15 12 9 18" />
        )}
      </svg>
    </button>
  )
}

function MobileProjectCard({ project }) {
  return (
    <article
      className="border-b border-black/20 py-12 last:border-b-0"
      style={{ '--active-accent': project.accent }}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <span className="inline-flex bg-[var(--blue)] px-3 py-1 text-xs font-semibold tracking-normal text-white">
            {project.eyebrow}
          </span>
          <p className="text-sm font-semibold text-[var(--active-accent)]">
            {project.number}
          </p>
          <h3 className="text-[clamp(2.6rem,12vw,4.8rem)] font-semibold leading-[0.9] tracking-normal text-black">
            {project.title}
          </h3>
          <p className="text-lg leading-8 text-black/72">{project.description}</p>
        </div>
        {PROJECT_PAGES_ENABLED ? (
          <Link
            to={`/projets/${project.slug}`}
            className="relative block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
            aria-label={`Découvrir le projet ${project.title}`}
          >
            <img
              src={project.image}
              alt={`Aperçu du projet ${project.title}`}
              width="1200"
              height="800"
              className="aspect-[16/9] w-full border border-black/15 object-cover"
              style={{ objectPosition: project.imagePosition }}
              loading="lazy"
              decoding="async"
            />
            <span className="absolute bottom-4 left-4 bg-[var(--bg)]/90 px-4 py-2 text-xs font-semibold uppercase text-black backdrop-blur-sm">
              Voir le projet ↗
            </span>
          </Link>
        ) : (
          <img
            src={project.image}
            alt={`Aperçu du projet ${project.title}`}
            width="1200"
            height="800"
            className="aspect-[16/9] w-full border border-black/15 object-cover"
            style={{ objectPosition: project.imagePosition }}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
    </article>
  )
}

export default function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const activeProject = projects[activeIndex] ?? projects[0]

  const goToProject = (step) => {
    setDirection(step)
    setActiveIndex((currentIndex) => (
      (currentIndex + step + projects.length) % projects.length
    ))
  }

  useEffect(() => {
    if (shouldReduceMotion || isPaused) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setDirection(1)
      setActiveIndex((currentIndex) => (currentIndex + 1) % projects.length)
    }, AUTOPLAY_SECONDS * 1000)

    return () => window.clearInterval(intervalId)
  }, [shouldReduceMotion, isPaused])

  return (
    <section
      id="nos-projets"
      data-active-project-index={activeIndex}
      data-active-project-title={activeProject.title}
      className="scroll-mt-32 border-b border-black/20 bg-[var(--bg)] pt-10 text-left lg:pt-12"
      style={{ '--active-accent': activeProject.accent }}
    >
      <div className="lg:hidden">
        {projects.map((project) => (
          <MobileProjectCard key={project.title} project={project} />
        ))}
      </div>

      <div className="hidden border-t border-black/20 py-16 lg:block xl:py-20">
        <div
          data-projects-carousel
          className="flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            data-projects-grid
            className="grid w-full gap-12 lg:grid-cols-[minmax(20rem,0.34fr)_minmax(0,0.66fr)] xl:gap-16"
          >
            <div className="flex flex-col justify-between gap-10">
              <ProjectText
                project={activeProject}
                direction={direction}
                shouldReduceMotion={shouldReduceMotion}
              />
              <ProjectIndicators
                activeIndex={activeIndex}
                isPaused={isPaused}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

            <ProjectImage
              project={activeProject}
              activeIndex={activeIndex}
              direction={direction}
              shouldReduceMotion={shouldReduceMotion}
              onPrev={() => goToProject(-1)}
              onNext={() => goToProject(1)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
