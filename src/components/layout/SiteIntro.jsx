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
      shouldReduceMotion ? 1100 : 4300,
    )

    return () => window.clearTimeout(timer)
  }, [onDone, shouldReduceMotion])

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex min-h-svh items-center justify-center overflow-hidden bg-[var(--bg)] text-black"
      role="status"
      aria-label="Chargement TMG"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-[length:25vw_100%,100%_96px]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[min(72rem,86vw)] -translate-x-1/2 bg-black/25"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(34rem,70vh)] w-px -translate-y-1/2 bg-black/15"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[30rem] w-full flex-col items-center justify-center px-6">
        <div className="relative z-30 mb-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-normal text-[var(--blue)]">
          <span className="h-2 w-2 bg-[var(--green)]" aria-hidden="true" />
          TMG / Ouverture
        </div>

        <div className="tmg-intro-board relative h-[min(62vw,24rem)] w-full max-w-3xl">
          <span
            className="tmg-intro-frame pointer-events-none absolute left-1/2 top-1/2"
            aria-hidden="true"
          />
          {introPieces.map((piece) => (
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
              }}
              aria-hidden="true"
            >
              <span className="tmg-intro-piece-slice" />
              <img
                src={tmgLogo}
                alt=""
                className="tmg-intro-piece-card relative z-10 h-auto w-full object-contain"
                draggable="false"
              />
            </span>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[clamp(2rem,5vw,4.5rem)] font-semibold uppercase leading-none tracking-normal">
            Tout le Monde Gagne
          </p>
        </div>
      </div>
    </motion.div>
  )
}
