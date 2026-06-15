import { PageContainer } from '../components/layout'
import { AnimatedText, Card, SectionLabel } from '../components/ui'

export default function About() {
  return (
    <main>
      <PageContainer className="py-16 sm:py-24">
        <section className="mx-auto max-w-3xl space-y-7 text-left">
          <SectionLabel>A propos</SectionLabel>
          <AnimatedText className="text-4xl font-bold leading-tight text-black sm:text-5xl">
            Une equipe qui construit avec intention.
          </AnimatedText>
          <p className="text-lg leading-8 text-neutral-600">
            Tout le Monde Gagne rassemble strategie, creation et execution pour
            aider les organisations a mieux communiquer, mieux convertir et mieux
            servir leur communaute.
          </p>
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {['Clarte', 'Impact', 'Collaboration'].map((value) => (
            <Card key={value} className="text-left text-black">
              <h2 className="text-xl font-bold text-black">{value}</h2>
            </Card>
          ))}
        </section>
      </PageContainer>
    </main>
  )
}
