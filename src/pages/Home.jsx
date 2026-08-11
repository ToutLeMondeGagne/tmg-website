import { PageContainer } from '../components/layout'
import RelatedLinks from '../components/seo/RelatedLinks'
import NewsletterSection from '../components/sections/NewsletterSection'
import ProjectsShowcase from '../components/sections/ProjectsShowcase'

// Les sections en validation (infolettre, etc.) ne sont visibles que si le
// build est fait avec les fonctionnalités de prévisualisation actives.
// Prod : VITE_PREVIEW_FEATURES=false npm run build  |  Secours : npm run build
const SHOW_NEWSLETTER_SECTION = import.meta.env.VITE_PREVIEW_FEATURES !== 'false'
import { useSiteContent } from '../context/useSiteContent'
import { useIntroDone } from '../context/useIntroDone'
import { socialLinks } from '../data/socialLinks'
import {
  AnimatedSection,
  AnimatedText,
  Button,
  SectionLabel,
  TicketCard,
} from '../components/ui'

function TargetIcon() {
  return (
    <svg viewBox="0 0 320 180" className="block h-auto w-full" role="img" aria-label="Un parcours pointillé menant au centre d'une cible">
      <rect width="320" height="180" fill="#d9e5f7" />
      <path d="M36 150 C 96 150 88 96 150 96 S 210 118 236 84" fill="none" stroke="#004cff" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 14" />
      <circle cx="36" cy="150" r="9" fill="#242424" />
      <circle cx="36" cy="150" r="3.5" fill="#d9e5f7" />
      <circle cx="236" cy="74" r="42" fill="#ffffff" />
      <circle cx="236" cy="74" r="42" fill="none" stroke="#004cff" strokeWidth="7" />
      <circle cx="236" cy="74" r="25" fill="none" stroke="#004cff" strokeWidth="7" />
      <circle cx="236" cy="74" r="10" fill="#b7ff46" stroke="#242424" strokeWidth="3" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 320 180" className="block h-auto w-full" role="img" aria-label="Un histogramme croissant surmonté d'une courbe qui monte">
      <rect width="320" height="180" fill="#d9e5f7" />
      <line x1="30" y1="150" x2="290" y2="150" stroke="#242424" strokeWidth="3" />
      <rect x="52" y="110" width="34" height="40" fill="#004cff" />
      <rect x="108" y="86" width="34" height="64" fill="#004cff" />
      <rect x="164" y="60" width="34" height="90" fill="#004cff" />
      <rect x="220" y="34" width="34" height="116" fill="#b7ff46" stroke="#242424" strokeWidth="3" />
      <path d="M69 104 L125 80 L181 54 L237 28" fill="none" stroke="#242424" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="69" cy="104" r="6" fill="#ffffff" stroke="#242424" strokeWidth="3" />
      <circle cx="125" cy="80" r="6" fill="#ffffff" stroke="#242424" strokeWidth="3" />
      <circle cx="181" cy="54" r="6" fill="#ffffff" stroke="#242424" strokeWidth="3" />
      <circle cx="237" cy="28" r="7" fill="#b7ff46" stroke="#242424" strokeWidth="3" />
    </svg>
  )
}

function BrowserIcon() {
  return (
    <svg viewBox="0 0 320 180" className="block h-auto w-full" role="img" aria-label="Une fenêtre de navigateur présentant une page web avec un bouton d'action">
      <rect width="320" height="180" fill="#d9e5f7" />
      <rect x="40" y="28" width="240" height="128" fill="#ffffff" stroke="#242424" strokeWidth="3" />
      <rect x="40" y="28" width="240" height="26" fill="#242424" />
      <circle cx="56" cy="41" r="4" fill="#b7ff46" />
      <circle cx="70" cy="41" r="4" fill="#ffffff" />
      <circle cx="84" cy="41" r="4" fill="#ffffff" />
      <rect x="58" y="72" width="90" height="14" fill="#004cff" />
      <rect x="58" y="96" width="150" height="8" fill="#c9d3e2" />
      <rect x="58" y="112" width="120" height="8" fill="#c9d3e2" />
      <rect x="58" y="132" width="66" height="16" fill="#b7ff46" stroke="#242424" strokeWidth="2" />
      <rect x="196" y="72" width="66" height="48" fill="#d9e5f7" stroke="#004cff" strokeWidth="3" />
    </svg>
  )
}

const OFFER_ICONS = {
  target: TargetIcon,
  chart: ChartIcon,
  browser: BrowserIcon,
}

export default function Home() {
  const { content } = useSiteContent()
  const { global, home } = content
  const introDone = useIntroDone()
  // Attend la fin de l'intro plein écran pour ne jouer l'entrée du hero
  // qu'une fois qu'elle est visible (sinon whileInView se déclenche pendant
  // que l'intro la cache encore, et le hero apparaît déjà figé).
  const heroAnimKey = introDone ? 'in' : 'out'
  // Le nom de la marque ressort en bleu, plus grand ; le reste de l'accroche
  // est plus petit pour que tout tienne dans le premier écran.
  const heroTitleAccent = 'Tout le Monde Gagne :'
  const heroTitleRest = home.hero.title.startsWith(heroTitleAccent)
    ? home.hero.title.slice(heroTitleAccent.length).trim()
    : home.hero.title.replace(/^Tout le Monde Gagne\s*:?\s*/, '')

  return (
    <main>
      <section className="relative overflow-hidden border-b border-black/20 text-left">
        {/* Fond degrade placeholder, a remplacer par une vraie photo (skyline, bureau, equipe) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 100% at 12% 0%, rgba(0,76,255,0.38), transparent 55%), linear-gradient(160deg, #0a1224 0%, #101d3d 45%, #0a1224 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/40"
          aria-hidden="true"
        />

        <PageContainer>
          <div className="relative flex min-h-[78svh] flex-col justify-end gap-10 py-16 sm:min-h-[82svh] sm:py-20">
            <h1 className="max-w-5xl leading-[0.98] tracking-normal text-white">
              <AnimatedText
                key={heroAnimKey}
                split="words"
                className="text-[clamp(2.2rem,5vw,4.6rem)] font-medium text-[var(--blue)]"
              >
                {heroTitleAccent}
              </AnimatedText>{' '}
              <AnimatedText
                key={`rest-${heroAnimKey}`}
                split="words"
                delay={0.1}
                className="text-[clamp(1.5rem,3vw,2.6rem)] font-medium text-white"
              >
                {heroTitleRest}
              </AnimatedText>
            </h1>

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <AnimatedText
                key={`subtitle-${heroAnimKey}`}
                as="p"
                delay={0.18}
                className="max-w-md text-xl leading-7 text-white/80"
              >
                {home.hero.subtitle}
              </AnimatedText>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Button href="/contact" className="w-full sm:w-auto">
                  {home.hero.primaryCta}
                </Button>
                <Button href="/services" variant="secondary" className="w-full sm:w-auto">
                  {home.hero.secondaryCta}
                </Button>
              </div>
            </div>

            <div className="hidden items-center justify-between text-xs font-medium tracking-normal text-white/70 md:flex">
              <div className="flex items-center gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {link.label}
                    {index < socialLinks.length - 1 ? ',' : ''}
                  </a>
                ))}
              </div>
              <span className="text-[var(--green)]">↓ {global.scrollHint}</span>
              <a
                href={`mailto:${global.contactEmail}`}
                className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {global.contactEmail}
              </a>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <section className="border-b border-black/20 py-10">
          <dl className="grid gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-black/15">
            {home.stats.map((stat) => (
              <div key={stat.value} className="sm:px-8 sm:first:pl-0">
                <dt className="text-3xl font-semibold tracking-normal text-[var(--blue)] sm:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-2 max-w-xs text-sm leading-6 text-black/65">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="grid gap-10 border-b border-black/20 py-20 lg:grid-cols-[0.28fr_1fr] lg:items-start">
          <div>
            <SectionLabel>{home.context.label}</SectionLabel>
          </div>
          <div className="space-y-10">
            <AnimatedText
              as="h2"
              split="words"
              className="max-w-4xl text-[clamp(2.1rem,3.6vw,3.6rem)] font-medium leading-[1.02] tracking-normal text-black"
            >
              {home.context.title}
            </AnimatedText>
            <div className="grid gap-5 md:grid-cols-3">
              {home.context.items.map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.08}>
                  <div className="h-full border-t border-black/25 bg-[var(--card)] p-6">
                    <span className="block text-sm font-semibold text-[var(--blue)]">
                      0{index + 1}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold leading-tight text-black">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-black/70">{item.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-10 border-b border-black/20 py-20 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="relative aspect-square w-full overflow-hidden border-t border-black/20">
            <div className="grid h-full grid-cols-2">
              <div className="flex flex-col justify-between bg-[var(--blue)] p-6 text-white">
                <span className="text-sm font-semibold opacity-80">01</span>
                <span className="text-2xl font-bold uppercase leading-tight sm:text-3xl">
                  {home.about.splitLabels[0]}
                </span>
              </div>
              <div className="flex flex-col justify-between bg-[#191b1f] p-6 text-white">
                <span className="text-right text-sm font-semibold opacity-80">02</span>
                <span className="text-2xl font-bold uppercase leading-tight sm:text-3xl">
                  {home.about.splitLabels[1]}
                </span>
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--green)] shadow-[0_12px_34px_rgba(0,0,0,0.28)]">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17 L17 7 M9 7 H17 V15" stroke="#111111" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <SectionLabel className="self-start">{home.about.label}</SectionLabel>
            <AnimatedText
              as="h2"
              split="words"
              className="max-w-full text-[clamp(2.1rem,3.6vw,3.8rem)] font-medium leading-[1.02] tracking-normal text-black"
            >
              {home.about.title}
            </AnimatedText>
            <div className="max-w-xl space-y-4 border-t border-black/30 pt-6 text-lg leading-8 text-black/70">
              <p>{home.about.body}</p>
              <p>{home.about.bodySecondary}</p>
            </div>
            <AnimatedSection delay={0.18}>
              <Button href="/a-propos" variant="outline">
                {home.about.cta}
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </PageContainer>

      <section className="bg-[#191b1f] py-20 text-white sm:py-24">
        <PageContainer>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-6">
              <SectionLabel>{home.offers.label}</SectionLabel>
              <AnimatedText
                as="h2"
                split="words"
                className="max-w-full text-[clamp(2.2rem,4vw,4.4rem)] font-medium leading-[0.98] tracking-normal text-white"
              >
                {home.offers.title}
              </AnimatedText>
              <p className="max-w-xl text-lg leading-8 text-white/70">{home.offers.subtitle}</p>
            </div>
            <Button href="/contact" variant="secondary" className="w-full shrink-0 sm:w-auto">
              {home.offers.cta}
            </Button>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {home.offers.items.map((item, index) => {
              const Icon = OFFER_ICONS[item.icon]

              return (
                <AnimatedSection key={item.title} delay={index * 0.08}>
                  <article className="group flex h-full flex-col overflow-hidden border-t border-white/20 bg-[#ecebe6] text-black">
                    {Icon ? <Icon /> : null}
                    <div className="flex flex-1 flex-col gap-3 p-7">
                      <p className="text-sm italic text-black/55">{item.eyebrow}</p>
                      <h3 className="text-xl font-bold uppercase leading-tight tracking-normal text-black">
                        {item.title}
                      </h3>
                      <p className="leading-7 text-black/70">{item.text}</p>
                      {item.highlights?.length ? (
                        <ul className="space-y-1.5 border-t border-black/15 pt-3 text-sm text-black/65">
                          {item.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-start gap-2">
                              <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--blue)]" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <div className="mt-auto pt-3">
                        <Button href={item.href} variant="outline">
                          {item.cta}
                        </Button>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              )
            })}
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <section className="border-b border-black/20 py-20">
          <div className="max-w-3xl space-y-6">
            <SectionLabel>{home.process.label}</SectionLabel>
            <AnimatedText
              as="h2"
              split="words"
              className="max-w-full text-[clamp(2.2rem,4vw,4.4rem)] font-medium leading-[0.98] tracking-normal text-black"
            >
              {home.process.title}
            </AnimatedText>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {home.process.items.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.08}>
                <div className="flex h-full flex-col border-t-2 border-[var(--blue)] bg-[var(--card)] p-7">
                  <span className="text-5xl font-bold leading-none text-[var(--blue)]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold leading-tight text-black">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-black/70">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <ProjectsShowcase />

        <section className="border-b border-black/20 py-20">
          <div className="max-w-3xl space-y-6">
            <SectionLabel>{home.testimonials.label}</SectionLabel>
            <AnimatedText
              as="h2"
              split="words"
              className="max-w-full text-[clamp(2.2rem,4vw,4.4rem)] font-medium leading-[0.98] tracking-normal text-black"
            >
              {home.testimonials.title}
            </AnimatedText>
            <p className="text-base leading-7 text-black/55">{home.testimonials.subtitle}</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {home.testimonials.items.map((item, index) => {
              const styles = [
                'border-t border-black/25 bg-[var(--card)] text-black',
                'bg-[#191b1f] text-white',
                'bg-[var(--blue)] text-white',
              ]

              return (
                <AnimatedSection key={item.name} delay={index * 0.08}>
                  <figure className={`flex h-full flex-col gap-6 p-7 ${styles[index % styles.length]}`}>
                    <div className="flex items-center justify-between">
                      <span aria-hidden="true" className="font-serif text-6xl leading-none opacity-40">
                        “
                      </span>
                      <span className="inline-flex items-center border border-current px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide opacity-80">
                        Exemple fictif
                      </span>
                    </div>
                    <blockquote className="flex-1 text-lg leading-8">{item.quote}</blockquote>
                    <figcaption className="border-t border-current/25 pt-4 text-sm">
                      <span className="font-semibold">{item.name}</span>
                      <span className="opacity-70"> — {item.role}</span>
                    </figcaption>
                  </figure>
                </AnimatedSection>
              )
            })}
          </div>
        </section>

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
