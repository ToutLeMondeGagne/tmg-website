import { motion } from 'framer-motion'
import { PageContainer } from '../components/layout'
import RelatedLinks from '../components/seo/RelatedLinks'
import NewsletterSection from '../components/sections/NewsletterSection'
import ProjectsShowcase from '../components/sections/ProjectsShowcase'

// Les sections en validation (infolettre, etc.) ne sont visibles que si le
// build est fait avec les fonctionnalités de prévisualisation actives.
// Prod : VITE_PREVIEW_FEATURES=false npm run build  |  Secours : npm run build
const SHOW_NEWSLETTER_SECTION = import.meta.env.VITE_PREVIEW_FEATURES !== 'false'
import { useSiteContent } from '../context/useSiteContent'
import { socialLinks } from '../data/socialLinks'
import {
  AnimatedSection,
  AnimatedText,
  Button,
  Card,
  SectionLabel,
  TicketCard,
} from '../components/ui'

// Scène pleine largeur (viewBox 640 × 360), reproduisant la maquette Canva :
// nuage blanc avec le titre à gauche, balle posée sur la première grosse marche
// turquoise au centre, petit escalier blanc à droite, masse marine au bord droit.
// Escalator : grosses marches uniformes de 104 × 104 px, prolongées hors cadre
// pour que la boucle de translation retombe exactement sur la même géométrie.
const STEP_SIZE = 104
const STEP_DURATION = 0.9
const TEAL_STEPS = Array.from({ length: 6 }, (_, i) => ({
  x: 212 + STEP_SIZE * i,
  y: 374 - STEP_SIZE * i,
  width: STEP_SIZE,
  height: 460,
}))

// Cache couleur ciel sur le coin inférieur gauche : la marche qui sort du cadre
// « s'enfonce » dedans (comme dans le sol d'un escalator) et ne peut jamais
// atteindre le slogan. Aligné sur le bord gauche de la plus basse marche visible.
const EXIT_MASK = { x: 0, y: 270, width: 316, height: 90 }

// Montée infinie : la « caméra » suit la balle. La balle rebondit sur place et
// l'escalier défile sous elle d'une marche par bond — elle grimpe donc sans fin
// et ne sort jamais du cadre. Position : posée sur la marche (424, 270) à t=0.
const BALL_RADIUS = 40
const BALL_X = 368
const BALL_REST_Y = 270 - BALL_RADIUS
const BALL_APEX_Y = BALL_REST_Y - STEP_SIZE

const HERO_TITLE_LINES = ['OBNL EN', 'SERVICE', 'MARKETING', 'ET WEB']
const HERO_TAGLINE = 'C’est en travaillant ensemble que tout le monde gagne'

function MarketingHeroVisual() {
  return (
    <motion.div
      className="relative w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      role="img"
      aria-label="OBNL en service marketing et web — balle bicolore qui monte un grand escalier roulant sans fin"
    >
      <svg
        viewBox="0 0 640 360"
        className="block h-auto w-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-sky" x1="320" y1="0" x2="320" y2="360" gradientUnits="userSpaceOnUse">
            {/* Part du gris de la page (--bg) pour se fondre sans découpe */}
            <stop offset="0%" stopColor="#d7d7d4" />
            <stop offset="38%" stopColor="#cbdeeb" />
            <stop offset="100%" stopColor="#aecbe0" />
          </linearGradient>
          <linearGradient id="hero-sun" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ef8c4a" />
            <stop offset="42%" stopColor="#d95f2b" />
            <stop offset="62%" stopColor="#41415f" />
            <stop offset="100%" stopColor="#1d2c50" />
          </linearGradient>
          {/* Dégradé identique pour chaque marche (coordonnées relatives à la
              marche) : la boucle de l'escalator reste ainsi sans aucun saut de
              couleur au moment du rebouclage. */}
          <linearGradient id="hero-teal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3fae97" />
            <stop offset="100%" stopColor="#175f57" />
          </linearGradient>
          {/* Grain pré-calculé : speckles noirs semi-transparents rasterisés une
              seule fois dans un motif, puis simplement déplacés par le GPU —
              aucun filtre live, aucun mode de fusion pendant l'animation. */}
          <filter id="hero-noise-gen" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.55 0 0 0 0"
            />
          </filter>
          <pattern id="hero-noise" width="140" height="140" patternUnits="userSpaceOnUse">
            <rect width="140" height="140" filter="url(#hero-noise-gen)" />
          </pattern>
        </defs>

        <rect width="640" height="360" fill="url(#hero-sky)" />

        {/* Grand escalier turquoise : défile d'une marche par cycle sous la balle
            (caméra qui suit la montée). La géométrie étant périodique, le retour
            à 0 est invisible. */}
        <motion.g
          animate={{ x: [0, -STEP_SIZE], y: [0, STEP_SIZE] }}
          transition={{ duration: STEP_DURATION, repeat: Infinity, ease: 'linear' }}
        >
          {TEAL_STEPS.map((step) => (
            <rect key={`teal-${step.x}`} {...step} fill="url(#hero-teal)" />
          ))}
          {TEAL_STEPS.map((step) => (
            <rect key={`teal-noise-${step.x}`} {...step} fill="url(#hero-noise)" />
          ))}
        </motion.g>

        {/* Cache ciel : avale la marche sortante en bas à gauche */}
        <rect {...EXIT_MASK} fill="url(#hero-sky)" />

        {/* Petit escalier blanc, immobile, à droite : marches de 64 × 68 px,
            descendant du bord droit jusqu'au bas du cadre */}
        <path
          d="M668 164 H604 V232 H540 V300 H476 V368 H412 V392"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="square"
          fill="none"
        />

        {/* Balle bicolore : rebondit sur place, un bond par marche qui arrive —
            montée infinie, toujours visible */}
        <motion.g
          animate={{
            y: [BALL_REST_Y, BALL_APEX_Y, BALL_REST_Y],
            rotate: [0, 360],
          }}
          transition={{
            y: {
              duration: STEP_DURATION,
              repeat: Infinity,
              times: [0, 0.5, 1],
              ease: ['easeOut', 'easeIn'],
            },
            rotate: { duration: STEP_DURATION * 2, repeat: Infinity, ease: 'linear' },
          }}
          style={{ x: BALL_X, transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <circle r={BALL_RADIUS} fill="url(#hero-sun)" />
          <circle r={BALL_RADIUS} fill="url(#hero-noise)" />
        </motion.g>

        {/* Nuage blanc organique avec le titre */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: [1, 1.02, 1], rotate: [0, -1, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.35 },
            scale: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
            rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
          }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          {/* Ombre : copie décalée de la forme (pas de filtre, donc pas de
              recalcul pendant la respiration du nuage) */}
          <path
            d="M160 46 C230 30 292 80 288 160 C284 232 256 284 178 296 C104 308 44 270 40 196 C36 122 92 62 160 46 Z"
            fill="#1d2c50"
            opacity="0.22"
            transform="translate(6 8)"
          />
          <path
            d="M160 46 C230 30 292 80 288 160 C284 232 256 284 178 296 C104 308 44 270 40 196 C36 122 92 62 160 46 Z"
            fill="#ffffff"
          />
          {HERO_TITLE_LINES.map((line, index) => (
            <text
              key={line}
              x="164"
              y={112 + index * 52}
              textAnchor="middle"
              fill="#111111"
              fontSize="34"
              fontWeight="700"
              letterSpacing="1"
            >
              {line}
            </text>
          ))}
        </motion.g>

        {/* Slogan en bas à gauche — taille alignée sur la maquette, assez court
            pour ne jamais croiser les marches qui sortent en bas */}
        <text x="16" y="354" fill="#111111" fontSize="11" fontWeight="700">
          {HERO_TAGLINE}
        </text>
      </svg>
    </motion.div>
  )
}

export default function Home() {
  const { content } = useSiteContent()
  const { global, home } = content

  return (
    <main>
      <section className="relative border-b border-black/20">
        <h1 className="sr-only">OBNL en service marketing et web</h1>
        <MarketingHeroVisual />
      </section>

      <PageContainer>
        <section className="relative border-b border-black/20 py-10 text-left">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <AnimatedText
              as="p"
              delay={0.18}
              className="max-w-md text-xl leading-7 text-black/75"
            >
              {home.hero.subtitle}
            </AnimatedText>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button href="/contact" className="w-full sm:w-auto">
                {home.hero.primaryCta}
              </Button>
              <Button href="/services" variant="outline" className="w-full sm:w-auto">
                {home.hero.secondaryCta}
              </Button>
            </div>
          </div>

          <div className="mt-8 hidden items-center justify-between text-xs font-medium tracking-normal text-black md:flex">
            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
                >
                  {link.label}
                  {index < socialLinks.length - 1 ? ',' : ''}
                </a>
              ))}
            </div>
            <span className="text-[var(--blue)]">↓ {global.scrollHint}</span>
            <span>{global.contactEmail}</span>
          </div>
        </section>

        <section className="grid gap-10 border-b border-black/20 py-20 text-left lg:grid-cols-[0.28fr_1fr]">
          <div>
            <SectionLabel>{home.about.label}</SectionLabel>
          </div>
          <div className="space-y-8">
            <AnimatedText
              as="h2"
              split="words"
              className="max-w-5xl text-[clamp(2.6rem,5vw,5.8rem)] font-medium leading-[0.98] tracking-normal text-black"
            >
              {home.about.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.12}
              className="max-w-3xl border-t border-black/30 pt-8 text-xl leading-8 text-black/70"
            >
              {home.about.body}
            </AnimatedText>
            <AnimatedSection delay={0.18}>
              <Button href="/contact" variant="outline">
                {home.about.cta}
              </Button>
            </AnimatedSection>
          </div>
        </section>

        <section className="grid gap-5 border-b border-black/20 py-20 md:grid-cols-3">
          {home.highlights.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.08}>
              <Card className="text-left text-black">
                <h2 className="mb-8 text-5xl font-semibold leading-none tracking-normal text-[var(--blue)]">
                  {item.title}
                </h2>
                <p className="leading-7 text-black/70">{item.text}</p>
              </Card>
            </AnimatedSection>
          ))}
        </section>

        <ProjectsShowcase />

        {SHOW_NEWSLETTER_SECTION ? <NewsletterSection /> : null}

        <section className="border-b border-black/20 py-20">
          <AnimatedSection>
            <TicketCard
              title={home.ticket.title}
              subtitle={home.ticket.subtitle}
              href="/contact"
            />
          </AnimatedSection>
        </section>

        <RelatedLinks />
      </PageContainer>
    </main>
  )
}
