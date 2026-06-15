import { PageContainer } from '../components/layout'
import { AnimatedText, Button, Card, SectionLabel, TicketCard } from '../components/ui'

const highlights = [
  {
    title: 'Sites web',
    text: 'Des pages rapides, claires et pensees pour convertir les bons visiteurs.',
  },
  {
    title: 'Marketing',
    text: 'Des campagnes simples a comprendre, solides a mesurer et faciles a ajuster.',
  },
  {
    title: 'Accompagnement',
    text: 'Une collaboration structuree pour avancer sans perdre le fil.',
  },
]

export default function Home() {
  return (
    <main>
      <PageContainer className="py-16 sm:py-24">
        <section className="grid gap-10 text-left lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-7">
            <SectionLabel>Accueil</SectionLabel>
            <AnimatedText className="max-w-4xl text-4xl font-bold leading-tight text-black sm:text-6xl">
              Marketing et sites web ou tout le monde gagne.
            </AnimatedText>
            <p className="max-w-2xl text-lg leading-8 text-neutral-600">
              TMG aide les PME, OBNL et equipes ambitieuses a transformer leurs
              idees en experiences numeriques claires, utiles et memorables.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact">Lancer un projet</Button>
              <Button href="/services" variant="outline">
                Voir les services
              </Button>
            </div>
          </div>

          <TicketCard
            title="Une approche premium, simple et mesurable"
            subtitle="Strategie, creation et execution reunies dans un parcours fluide."
            href="/services"
          />
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title} className="text-left text-black">
              <h2 className="mb-3 text-xl font-bold text-black">{item.title}</h2>
              <p className="leading-7 text-neutral-600">{item.text}</p>
            </Card>
          ))}
        </section>
      </PageContainer>
    </main>
  )
}
