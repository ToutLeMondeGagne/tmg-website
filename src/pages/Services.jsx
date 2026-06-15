import { PageContainer } from '../components/layout'
import { Button, Card, SectionLabel } from '../components/ui'

const services = [
  {
    id: 'pme',
    title: 'PME',
    text: 'Clarifier votre offre, renforcer votre presence web et attirer des clients mieux alignes.',
  },
  {
    id: 'obnl',
    title: 'OBNL',
    text: 'Structurer votre message, mobiliser votre communaute et faciliter le passage a l action.',
  },
  {
    id: 'strategie',
    title: 'Croissance',
    text: 'Prioriser les bons canaux, mesurer ce qui compte et faire evoluer les contenus au bon rythme.',
  },
]

export default function Services() {
  return (
    <main>
      <PageContainer>
        <section className="grid gap-8 border-b border-black/20 py-20 text-left lg:grid-cols-[0.28fr_1fr]">
          <SectionLabel>Nos services</SectionLabel>
          <h1 className="max-w-5xl text-[clamp(3rem,8vw,9rem)] font-semibold uppercase leading-[0.86] tracking-normal text-black">
            Build. Launch. Grow.
          </h1>
        </section>

        <section>
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="grid scroll-mt-32 gap-8 border-b border-black/20 py-14 text-left lg:grid-cols-[0.08fr_0.42fr_0.32fr_0.18fr]"
            >
              <span className="text-sm font-medium">0{index + 1}</span>
              <h2 className="text-[clamp(2.8rem,5vw,5.4rem)] font-semibold leading-none tracking-normal text-black">
                {service.title}
              </h2>
              <p className="max-w-md text-xl leading-8 text-black/70">{service.text}</p>
              <Button
                href="/contact"
                variant="ghost"
                className="self-start justify-self-start lg:justify-self-end"
              >
                Learn more ↗
              </Button>
            </div>
          ))}
        </section>

        <section className="grid gap-5 py-20 md:grid-cols-3">
          {['Map', 'Make', 'Move'].map((step, index) => (
            <Card key={step} className="text-center text-black" padding="p-8">
              <span className="mb-3 block text-sm font-medium">0{index + 1}</span>
              <h2 className="text-5xl font-semibold uppercase leading-none tracking-normal text-[var(--blue)]">
                {step}
              </h2>
            </Card>
          ))}
        </section>
      </PageContainer>
    </main>
  )
}
