import { PageContainer } from '../components/layout'
import { AnimatedText, Button, Card, SectionLabel } from '../components/ui'

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
    title: 'Strategie digitale',
    text: 'Prioriser les bons canaux, mesurer ce qui compte et faire evoluer les contenus au bon rythme.',
  },
]

export default function Services() {
  return (
    <main>
      <PageContainer className="py-16 sm:py-24">
        <section className="mx-auto max-w-3xl space-y-7 text-left">
          <SectionLabel>Nos services</SectionLabel>
          <AnimatedText className="text-4xl font-bold leading-tight text-black sm:text-5xl">
            Des services clairs pour passer de l idee au resultat.
          </AnimatedText>
          <p className="text-lg leading-8 text-neutral-600">
            On assemble strategie, design, contenu et developpement pour creer
            des experiences utiles et faciles a faire evoluer.
          </p>
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} id={service.id} className="scroll-mt-28">
              <Card className="h-full text-left text-black" padding="p-7">
                <h2 className="mb-3 text-xl font-bold text-black">{service.title}</h2>
                <p className="leading-7 text-neutral-600">{service.text}</p>
              </Card>
            </div>
          ))}
        </section>

        <div className="mt-10 text-left">
          <Button href="/contact">Demarrer une discussion</Button>
        </div>
      </PageContainer>
    </main>
  )
}
