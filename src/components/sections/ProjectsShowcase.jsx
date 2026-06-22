import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import projectPlaceholderImage from '../../assets/images/tmg-team-studio.webp'

const projects = [
  {
    number: '01',
    eyebrow: 'PME',
    title: 'Accompagnement PME',
    description:
      'Des stratégies numériques pour aider les PME à structurer leur croissance.',
    image: projectPlaceholderImage,
    accent: '#004cff',
    imagePosition: 'center',
  },
  {
    number: '02',
    eyebrow: 'OBNL',
    title: 'Solutions OBNL',
    description:
      'Des sites clairs et accessibles pour mieux rejoindre les communautés.',
    image: projectPlaceholderImage,
    accent: '#8cc63f',
    imagePosition: 'left center',
  },
  {
    number: '03',
    eyebrow: 'Stagiaires',
    title: 'Programme Stagiaire',
    description:
      'Une plateforme pour attirer, présenter et intégrer les talents de demain.',
    image: projectPlaceholderImage,
    accent: '#004cff',
    imagePosition: 'center top',
  },
  {
    number: '04',
    eyebrow: 'Marketing',
    title: 'Audit Marketing',
    description:
      'Un diagnostic complet pour transformer les actions marketing en résultats mesurables.',
    image: projectPlaceholderImage,
    accent: '#111827',
    imagePosition: 'right center',
  },
]

function clampProjectIndex(progress) {
  return Math.min(projects.length - 1, Math.max(0, Math.floor(progress * projects.length)))
}

function getSectionProgress(section) {
  const scrollableDistance = section.offsetHeight - window.innerHeight

  if (scrollableDistance <= 0) {
    return 0
  }

  return (window.scrollY - section.offsetTop) / scrollableDistance
}

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

function ProjectText({ project, shouldReduceMotion }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.title}
        className="flex h-full flex-col justify-between gap-8"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 36, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -28, filter: 'blur(8px)' }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="space-y-4">
          <span className="inline-flex bg-[var(--blue)] px-3 py-1 text-xs font-semibold uppercase tracking-normal text-white">
            Our work
          </span>
          <p className="text-sm font-semibold uppercase text-[var(--active-accent)]">
            {project.number} / {project.eyebrow}
          </p>
          <h2
            data-project-title
            className="max-w-[34rem] text-[clamp(2.4rem,2.75vw,3.65rem)] font-semibold uppercase leading-none tracking-normal text-black"
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

function ProjectImage({ project, activeIndex, shouldReduceMotion }) {
  const nextProjects = projects.slice(activeIndex + 1, activeIndex + 3)

  return (
    <div
      data-project-image
      className="relative h-[clamp(30rem,68vh,44rem)] overflow-visible"
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

      <AnimatePresence mode="wait">
        <motion.figure
          key={project.title}
          className="absolute inset-0 overflow-hidden border border-black/15 bg-black/10 shadow-[0_34px_92px_rgba(0,0,0,0.18)]"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 72, scale: 0.965, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -52, scale: 1.015, filter: 'blur(6px)' }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[length:25%_100%,100%_72px]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.28))]"
            aria-hidden="true"
          />
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
          <figcaption className="absolute bottom-5 left-5 z-20 flex items-center gap-3 bg-[var(--bg)]/90 px-4 py-2 text-xs font-semibold uppercase text-black backdrop-blur-sm">
            <span className="h-2 w-2 bg-[var(--active-accent)]" aria-hidden="true" />
            {project.number} / Image temporaire
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </div>
  )
}

function ProjectIndicators({ activeIndex, progressWidth }) {
  return (
    <div className="space-y-4">
      <div className="h-px overflow-hidden bg-black/18">
        <motion.div
          className="h-full origin-left bg-[var(--blue)]"
          style={{ width: progressWidth }}
        />
      </div>
      <div className="flex items-center justify-between text-xs font-semibold uppercase text-black/45">
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

function MobileProjectCard({ project }) {
  return (
    <article
      className="border-b border-black/20 py-12 last:border-b-0"
      style={{ '--active-accent': project.accent }}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <span className="inline-flex bg-[var(--blue)] px-3 py-1 text-xs font-semibold uppercase tracking-normal text-white">
            {project.eyebrow}
          </span>
          <p className="text-sm font-semibold uppercase text-[var(--active-accent)]">
            {project.number}
          </p>
          <h3 className="text-[clamp(2.6rem,12vw,4.8rem)] font-semibold uppercase leading-[0.9] tracking-normal text-black">
            {project.title}
          </h3>
          <p className="text-lg leading-8 text-black/72">{project.description}</p>
        </div>
        <img
          src={project.image}
          alt={`Aperçu du projet ${project.title}`}
          width="1200"
          height="800"
          className="aspect-[16/10] w-full border border-black/15 object-cover"
          style={{ objectPosition: project.imagePosition }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </article>
  )
}

export default function ProjectsShowcase() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const activeProject = projects[activeIndex] ?? projects[0]

  useEffect(() => {
    let animationFrame = 0

    const updateActiveProject = () => {
      if (!sectionRef.current) {
        return
      }

      const nextIndex = clampProjectIndex(getSectionProgress(sectionRef.current))
      setActiveIndex((currentIndex) => (
        currentIndex === nextIndex ? currentIndex : nextIndex
      ))
    }

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(updateActiveProject)
    }

    updateActiveProject()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
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

      <div className="relative hidden h-[360vh] border-t border-black/20 lg:block">
        <div
          data-projects-sticky
          className="sticky top-24 flex h-[calc(100vh-6rem)] items-center"
        >
          <div
            data-projects-grid
            className="grid w-full gap-12 lg:grid-cols-[minmax(20rem,0.34fr)_minmax(0,0.66fr)] lg:items-center xl:gap-16"
          >
            <div className="flex h-[clamp(30rem,68vh,44rem)] flex-col justify-between gap-10 self-center">
              <ProjectText
                project={activeProject}
                shouldReduceMotion={shouldReduceMotion}
              />
              <ProjectIndicators
                activeIndex={activeIndex}
                progressWidth={progressWidth}
              />
            </div>

            <ProjectImage
              project={activeProject}
              activeIndex={activeIndex}
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
