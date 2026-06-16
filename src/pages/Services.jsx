import { PageContainer } from '../components/layout'
import { AnimatedSection, AnimatedText, Button, Card, SectionLabel } from '../components/ui'

const services = [
  {
    id: 'pme',
    title: 'PME',
    text: 'Clarifier votre offre, renforcer votre presence web et attirer des clients mieux alignes.',
    href: '/pme',
  },
  {
    id: 'obnl',
    title: 'OBNL',
    text: 'Structurer votre message, mobiliser votre communaute et faciliter le passage a l action.',
    href: '/obnl',
  },
  {
    id: 'strategie',
    title: 'Croissance',
    text: 'Prioriser les bons canaux, mesurer ce qui compte et faire evoluer les contenus au bon rythme.',
    href: '/services/marketing',
  },
]

export default function Services() {
  return (
    <main>
      <PageContainer>
        <section className="grid gap-8 border-b border-black/20 py-20 text-left lg:grid-cols-[0.28fr_1fr]">
          <SectionLabel>Nos services</SectionLabel>
          <AnimatedText
            as="h1"
            split="words"
            className="max-w-5xl text-[clamp(3rem,8vw,9rem)] font-semibold uppercase leading-[0.86] tracking-normal text-black"
          >
            Build. Launch. Grow.
          </AnimatedText>
        </section>

        <section>
          {services.map((service, index) => (
            <AnimatedSection
              key={service.id}
              id={service.id}
              className="grid scroll-mt-32 gap-8 border-b border-black/20 py-14 text-left lg:grid-cols-[0.08fr_0.42fr_0.32fr_0.18fr]"
              delay={index * 0.05}
            >
              <span className="text-sm font-medium">0{index + 1}</span>
              <AnimatedText
                as="h2"
                split="words"
                className="text-[clamp(2.8rem,5vw,5.4rem)] font-semibold leading-none tracking-normal text-black"
              >
                {service.title}
              </AnimatedText>
              <AnimatedText as="p" delay={0.1} className="max-w-md text-xl leading-8 text-black/70">
                {service.text}
              </AnimatedText>
              <Button
                href={service.href ?? '/contact'}
                variant="ghost"
                className="self-start justify-self-start lg:justify-self-end"
              >
                Learn more ↗
              </Button>
            </AnimatedSection>
          ))}
        </section>

        <section className="grid gap-5 py-20 md:grid-cols-3">
          {['Map', 'Make', 'Move'].map((step, index) => (
            <AnimatedSection key={step} delay={index * 0.08}>
              <Card className="text-center text-black" padding="p-8">
                <span className="mb-3 block text-sm font-medium">0{index + 1}</span>
                <h2 className="text-5xl font-semibold uppercase leading-none tracking-normal text-[var(--blue)]">
                  {step}
                </h2>
              </Card>
            </AnimatedSection>
          ))}
        </section>
      </PageContainer>
    </main>
  )
}
