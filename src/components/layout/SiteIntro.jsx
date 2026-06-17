import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import tmgLogo from '../../assets/logos/tmg-logo.png'

const introPieces = [
  {
    startX: 'clamp(-18rem, -34vw, -10rem)',
    startY: 'clamp(-12rem, -24vw, -6rem)',
    startRotate: '-10deg',
    finalX: 'calc(var(--intro-piece-w) * -1)',
    finalY: 'calc(var(--intro-piece-h) * -0.5)',
    bgPosition: '0% 0%',
  },
  {
    startX: 'clamp(-5rem, -9vw, -2rem)',
    startY: 'clamp(-17rem, -32vw, -9rem)',
    startRotate: '7deg',
    finalX: '0rem',
    finalY: 'calc(var(--intro-piece-h) * -0.5)',
    bgPosition: '50% 0%',
  },
  {
    startX: 'clamp(10rem, 34vw, 18rem)',
    startY: 'clamp(-11rem, -22vw, -5rem)',
    startRotate: '9deg',
    finalX: 'var(--intro-piece-w)',
    finalY: 'calc(var(--intro-piece-h) * -0.5)',
    bgPosition: '100% 0%',
  },
  {
    startX: 'clamp(-18rem, -34vw, -10rem)',
    startY: 'clamp(6rem, 22vw, 12rem)',
    startRotate: '6deg',
    finalX: 'calc(var(--intro-piece-w) * -1)',
    finalY: 'calc(var(--intro-piece-h) * 0.5)',
    bgPosition: '0% 100%',
  },
  {
    startX: 'clamp(-4rem, -8vw, -1rem)',
    startY: 'clamp(9rem, 30vw, 16rem)',
    startRotate: '-8deg',
    finalX: '0rem',
    finalY: 'calc(var(--intro-piece-h) * 0.5)',
    bgPosition: '50% 100%',
  },
  {
    startX: 'clamp(10rem, 34vw, 18rem)',
    startY: 'clamp(6rem, 22vw, 12rem)',
    startRotate: '-6deg',
    finalX: 'var(--intro-piece-w)',
    finalY: 'calc(var(--intro-piece-h) * 0.5)',
    bgPosition: '100% 100%',
  },
]

export default function SiteIntro({ onDone }) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(
      () => onDone?.(),
      shouldReduceMotion ? 450 : 2200,
    )

    return () => window.clearTimeout(timer)
  }, [onDone, shouldReduceMotion])

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex min-h-svh items-center justify-center overflow-hidden bg-[var(--bg)] text-black"
      role="status"
      aria-label="Chargement TMG"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-[length:25vw_100%,100%_96px]"
        aria-hidden="true"
      />
      <span className="tmg-intro-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[min(72rem,86vw)] -translate-x-1/2 bg-black/25"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(34rem,70vh)] w-px -translate-y-1/2 bg-black/15"
        aria-hidden="true"
      />

      <span
        className="tmg-intro-ghost pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] text-[clamp(9rem,26vw,24rem)] font-semibold uppercase leading-none tracking-normal text-black/[0.035]"
        aria-hidden="true"
      >
        TMG
      </span>

      <div className="relative z-10 flex min-h-[35rem] w-full flex-col items-center justify-center px-5 py-8">
        <div className="relative z-30 mb-6 flex w-full max-w-5xl items-center justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-normal text-[var(--blue)] sm:text-xs">
          <span className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[var(--green)]" aria-hidden="true" />
            TMG / Ouverture
          </span>
          <span className="hidden text-black/45 sm:block">Signal → Structure → Impact</span>
        </div>

        <div className="tmg-intro-stage relative w-full max-w-5xl overflow-hidden border border-black/15 bg-[rgba(215,215,212,0.42)] px-4 py-8 shadow-[0_34px_110px_rgba(0,0,0,0.14)] backdrop-blur-md sm:px-8">
          <span className="tmg-intro-scan pointer-events-none absolute inset-x-0 top-0 h-full" aria-hidden="true" />
          <span className="tmg-intro-measure tmg-intro-measure-top" aria-hidden="true" />
          <span className="tmg-intro-measure tmg-intro-measure-bottom" aria-hidden="true" />

          <div className="tmg-intro-board relative mx-auto h-[min(74vw,27rem)] w-full max-w-4xl">
            <span
              className="tmg-intro-frame pointer-events-none absolute left-1/2 top-1/2"
              aria-hidden="true"
            />
            <span className="tmg-intro-pulse-line" aria-hidden="true" />
            {introPieces.map((piece, index) => (
              <span
                key={`${piece.bgPosition}-${piece.startRotate}`}
                className="tmg-intro-piece absolute left-1/2 top-1/2 overflow-hidden border border-black/15 bg-[var(--bg)]/90 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur-sm"
                style={{
                  '--intro-start-x': piece.startX,
                  '--intro-start-y': piece.startY,
                  '--intro-start-rotate': piece.startRotate,
                  '--intro-final-x': piece.finalX,
                  '--intro-final-y': piece.finalY,
                  '--intro-bg-position': piece.bgPosition,
                  '--intro-logo': `url(${tmgLogo})`,
                  '--intro-piece-delay': `${index * 0.035}s`,
                }}
                aria-hidden="true"
              >
                <span className="tmg-intro-piece-number">0{index + 1}</span>
                <span className="tmg-intro-piece-slice" />
                <img
                  src={tmgLogo}
                  alt=""
                  className="tmg-intro-piece-card relative z-10 h-auto w-full object-contain"
                  draggable="false"
                />
              </span>
            ))}
            <span className="tmg-intro-final-logo absolute left-1/2 top-1/2">
              <img
                src={tmgLogo}
                alt="TMG - Tout le Monde Gagne"
                className="h-auto w-full object-contain"
                draggable="false"
              />
            </span>
          </div>

          <div className="mt-5 grid gap-4 text-[0.65rem] font-semibold uppercase tracking-normal text-black/55 sm:grid-cols-[1fr_auto_1fr] sm:items-end sm:text-xs">
            <span>01 Captation</span>
            <span className="tmg-intro-progress relative h-1 w-full overflow-hidden bg-black/15 sm:w-64" aria-hidden="true">
              <span className="absolute inset-y-0 left-0 bg-[var(--blue)]" />
            </span>
            <span className="sm:text-right">03 Lancement</span>
          </div>
        </div>

        <p className="mt-8 text-center text-[clamp(2.1rem,5.4vw,5.4rem)] font-semibold uppercase leading-none tracking-normal">
          Tout le Monde Gagne
        </p>
      </div>

      <span className="tmg-intro-exit-line pointer-events-none absolute left-0 top-1/2 h-px bg-[var(--blue)]" aria-hidden="true" />
    </motion.div>
  )
}
