import { PageContainer } from '../components/layout'
import { AnimatedText, Card, SectionLabel } from '../components/ui'

export default function About() {
  return (
    <main>
      <PageContainer>
        <section className="grid min-h-[calc(100svh-6rem)] gap-8 border-b border-black/20 py-20 text-left lg:grid-cols-[0.28fr_1fr] lg:items-center">
          <SectionLabel>A propos</SectionLabel>
          <AnimatedText className="max-w-6xl text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.08em] text-black">
            Un site doit capturer le poids de ce que vous avez construit.
          </AnimatedText>
        </section>

        <section className="grid gap-5 py-20 md:grid-cols-3">
          {['Clarte', 'Impact', 'Collaboration'].map((value) => (
            <Card key={value} className="text-left text-black">
              <h2 className="text-5xl font-semibold uppercase leading-none tracking-[-0.08em] text-[var(--blue)]">
                {value}
              </h2>
            </Card>
          ))}
        </section>
      </PageContainer>
    </main>
  )
}
