import { PageContainer } from '../components/layout'
import { Button, Card, SectionLabel } from '../components/ui'

export default function Stage() {
  return (
    <main>
      <PageContainer>
        <section className="grid gap-8 border-b border-black/20 py-20 text-left lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div className="space-y-7">
            <SectionLabel>Stagiaires</SectionLabel>
            <h1 className="text-[clamp(3rem,6vw,6.6rem)] font-semibold uppercase leading-[0.86] tracking-normal text-black">
              Learn by building.
            </h1>
            <p className="text-xl leading-8 text-black/70">
              TMG accueille les profils curieux qui veulent pratiquer le
              marketing, le design, le contenu et le web dans des projets reels.
            </p>
            <Button href="/contact" variant="secondary">
              Proposer une candidature
            </Button>
          </div>

          <Card className="text-left text-black" padding="p-8">
            <h2 className="mb-8 text-5xl font-semibold uppercase leading-none tracking-normal text-[var(--blue)]">
              Process
            </h2>
            <ul className="space-y-4 text-xl text-black/70">
              <li>Autonomie accompagnee</li>
              <li>Curiosite et envie d apprendre</li>
              <li>Communication claire</li>
              <li>Livrables utiles, pas seulement decoratifs</li>
            </ul>
          </Card>
        </section>
      </PageContainer>
    </main>
  )
}
