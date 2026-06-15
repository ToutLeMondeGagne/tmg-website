import { PageContainer } from '../components/layout'
import { Button, SectionLabel } from '../components/ui'

export default function NotFound() {
  return (
    <main>
      <PageContainer>
        <section className="flex min-h-[calc(100svh-6rem)] flex-col justify-center space-y-7 py-20 text-left">
          <SectionLabel>404</SectionLabel>
          <h1 className="max-w-5xl text-[clamp(3rem,10vw,11rem)] font-semibold uppercase leading-[0.86] tracking-normal text-black">
            Page introuvable.
          </h1>
          <p className="max-w-xl text-xl leading-8 text-black/70">
            Le lien est peut-etre incomplet ou la page a ete deplacee.
          </p>
          <Button href="/">Retour a l accueil</Button>
        </section>
      </PageContainer>
    </main>
  )
}
