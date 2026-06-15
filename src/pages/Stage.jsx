import { PageContainer } from '../components/layout'
import { AnimatedText, Button, Card, SectionLabel } from '../components/ui'

export default function Stage() {
  return (
    <main>
      <PageContainer className="py-16 sm:py-24">
        <section className="grid gap-8 text-left lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-7">
            <SectionLabel>Stagiaires</SectionLabel>
            <AnimatedText className="text-4xl font-bold leading-tight text-black sm:text-5xl">
              Un cadre concret pour apprendre en contribuant.
            </AnimatedText>
            <p className="text-lg leading-8 text-neutral-600">
              TMG accueille les profils curieux qui veulent pratiquer le
              marketing, le design, le contenu et le web dans des projets reels.
            </p>
            <Button href="/contact" variant="secondary">
              Proposer une candidature
            </Button>
          </div>

          <Card className="text-left text-black" padding="p-8">
            <h2 className="mb-4 text-2xl font-bold text-black">Ce qu on valorise</h2>
            <ul className="space-y-3 text-neutral-600">
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
