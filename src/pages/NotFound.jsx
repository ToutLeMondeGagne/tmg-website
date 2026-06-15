import { PageContainer } from '../components/layout'
import { Button, SectionLabel } from '../components/ui'

export default function NotFound() {
  return (
    <main>
      <PageContainer className="py-16 sm:py-24">
        <section className="mx-auto max-w-2xl space-y-7 text-left">
          <SectionLabel>404</SectionLabel>
          <h1 className="text-4xl font-bold leading-tight text-black sm:text-5xl">
            Cette page n existe pas.
          </h1>
          <p className="text-lg leading-8 text-neutral-600">
            Le lien est peut-etre incomplet ou la page a ete deplacee.
          </p>
          <Button href="/">Retour a l accueil</Button>
        </section>
      </PageContainer>
    </main>
  )
}
