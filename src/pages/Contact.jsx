import { PageContainer } from '../components/layout'
import { Button, Card, SectionLabel } from '../components/ui'

export default function Contact() {
  return (
    <main>
      <PageContainer>
        <section className="grid gap-8 border-b border-black/20 py-20 text-left lg:grid-cols-[0.28fr_1fr]">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="max-w-6xl text-[clamp(3rem,8vw,9rem)] font-semibold uppercase leading-[0.86] tracking-normal text-black">
            Let&apos;s build yours.
          </h1>
        </section>

        <section className="grid gap-5 py-20 md:grid-cols-3">
          <Card className="text-left text-black">
            <h2 className="mb-8 text-5xl font-semibold uppercase leading-none tracking-normal text-[var(--blue)]">
              Email
            </h2>
            <a
              href="mailto:bonjour@toutlemondegagne.ca"
              className="text-black/70 transition hover:text-[var(--blue)]"
            >
              bonjour@toutlemondegagne.ca
            </a>
          </Card>
          <Card className="text-left text-black">
            <h2 className="mb-8 text-5xl font-semibold uppercase leading-none tracking-normal text-[var(--blue)]">
              Ville
            </h2>
            <p className="text-black/70">Montreal, Quebec</p>
          </Card>
          <Card className="text-left text-black">
            <h2 className="mb-8 text-5xl font-semibold uppercase leading-none tracking-normal text-[var(--blue)]">
              Start
            </h2>
            <Button href="mailto:bonjour@toutlemondegagne.ca" variant="secondary">
              Envoyer un message
            </Button>
          </Card>
        </section>
      </PageContainer>
    </main>
  )
}
