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

const highlights = [
  {
    title: 'Sites web',
    text: 'Des pages rapides, claires et pensees pour convertir les bons visiteurs.',
  },
  {
    title: 'Marketing',
    text: 'Des campagnes simples à comprendre, solides à mesurer et faciles à ajuster.',
  },
  {
    title: 'Systemes',
    text: 'Une experience structuree pour guider les prospects du premier clic au rendez-vous.',
  },
]

function HeroStackVisual() {
  return (
    <div
      className="relative mx-auto flex min-h-[17rem] w-full max-w-[21rem] items-center justify-center md:min-h-[20rem] lg:max-w-[23rem]"
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
      <img
        src={heroStackImage}
        alt="Couches visuelles TMG superposées"
        className="tmg-stack-float relative z-10 w-[min(74vw,17rem)] drop-shadow-[0_34px_42px_rgba(0,0,0,0.24)] md:w-[18rem] lg:w-[20rem]"
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
              className="max-w-full text-[clamp(2rem,9vw,3rem)] font-semibold uppercase leading-[0.9] tracking-normal text-black md:text-[clamp(4rem,9.2vw,9rem)] md:leading-[0.86] xl:text-[clamp(7rem,8.8vw,10rem)]"
            >
              Transformez votre trafic en clients.
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
                    Let&apos;s build yours
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
            <SectionLabel>About us</SectionLabel>
          </div>
          <div className="space-y-8">
            <AnimatedText
              as="h1"
              split="words"
              className="max-w-5xl text-[clamp(2.6rem,5vw,5.8rem)] font-medium leading-[0.98] tracking-normal text-black"
            >
              La plupart des sites restent la. Le votre doit devenir la raison
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
              title="Projet premium. Resultat clair."
              subtitle="Strategie, contenu, interface et conversion dans une experience qui avance vite."
              href="/contact"
            />
          </AnimatedSection>
        </section>
      </PageContainer>
    </main>
  )
}
