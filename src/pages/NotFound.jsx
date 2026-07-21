import { PageContainer } from '../components/layout'
import { AnimatedText, Button, SectionLabel } from '../components/ui'

export default function NotFound() {
  return (
    <main>
      <PageContainer>
        <section className="flex min-h-[calc(100svh-6rem)] flex-col justify-center space-y-7 py-20 text-left">
          <SectionLabel>404</SectionLabel>
          <AnimatedText
            as="h1"
            split="words"
            className="max-w-5xl text-[clamp(2.6rem,12vw,5rem)] font-semibold leading-[0.86] tracking-normal text-black sm:text-[clamp(3rem,10vw,11rem)]"
          >
            Page introuvable.
          </AnimatedText>
          <AnimatedText as="p" delay={0.12} className="max-w-xl text-xl leading-8 text-black/70">
            Le lien est peut-être incomplet ou la page a été déplacée.
          </AnimatedText>
          <Button href="/">Retour à l'accueil</Button>
        </section>
      </PageContainer>
    </main>
  )
}
