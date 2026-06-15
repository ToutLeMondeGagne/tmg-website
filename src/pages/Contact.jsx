import { PageContainer } from '../components/layout'
import { AnimatedText, Button, Card, SectionLabel } from '../components/ui'

export default function Contact() {
  return (
    <main>
      <PageContainer className="py-16 sm:py-24">
        <section className="mx-auto max-w-3xl space-y-7 text-left">
          <SectionLabel>Contact</SectionLabel>
          <AnimatedText className="text-4xl font-bold leading-tight text-black sm:text-5xl">
            Parlons de votre prochain projet.
          </AnimatedText>
          <p className="text-lg leading-8 text-neutral-600">
            Dites-nous ou vous voulez aller. On vous aide a clarifier le chemin,
            choisir les bons leviers et construire une presence numerique solide.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <Card className="text-left text-black">
            <h2 className="mb-3 text-lg font-bold text-black">Email</h2>
            <a
              href="mailto:bonjour@toutlemondegagne.ca"
              className="text-neutral-600 transition hover:text-black"
            >
              bonjour@toutlemondegagne.ca
            </a>
          </Card>
          <Card className="text-left text-black">
            <h2 className="mb-3 text-lg font-bold text-black">Localisation</h2>
            <p className="text-neutral-600">Montreal, Quebec</p>
          </Card>
          <Card className="text-left text-black">
            <h2 className="mb-3 text-lg font-bold text-black">Demarrage</h2>
            <Button href="mailto:bonjour@toutlemondegagne.ca" variant="secondary">
              Envoyer un message
            </Button>
          </Card>
        </section>
      </PageContainer>
    </main>
  )
}
