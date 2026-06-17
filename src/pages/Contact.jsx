import { PageContainer } from '../components/layout'
import { ContactForm } from '../components/forms'
import { AnimatedText } from '../components/ui'

export default function Contact() {
  return (
    <main>
      <PageContainer>
        <section className="grid min-h-[34rem] gap-10 border-b border-black/25 py-16 text-left lg:grid-cols-[0.68fr_0.32fr] lg:items-center">
          <div className="space-y-6">
            <span className="text-base font-medium uppercase italic text-[var(--blue)]">
              [ Contact ]
            </span>
            <AnimatedText
              as="h1"
              split="words"
              className="max-w-4xl text-[clamp(3.8rem,8vw,8rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              Dites-nous ce que vous construisez.
            </AnimatedText>
          </div>
          <div className="flex items-end justify-start gap-5 text-sm font-medium uppercase text-black lg:justify-end">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <section className="grid gap-12 py-16 text-left lg:grid-cols-[0.42fr_0.58fr]">
          <aside className="flex flex-col justify-between gap-12 lg:min-h-[42rem]">
            <div className="max-w-md space-y-6">
              <AnimatedText as="p" className="text-2xl leading-8 text-black/80">
                Ce formulaire nous aide à comprendre où vous en êtes, ce que
                vous construisez et le type de site qui peut vraiment soutenir
                votre croissance.
              </AnimatedText>
              <AnimatedText
                as="p"
                delay={0.1}
                className="text-base leading-7 text-black/60"
              >
                On lit chaque demande nous-mêmes. Ensuite, on vous revient avec
                les prochaines étapes les plus simples.
              </AnimatedText>
            </div>
            <div className="space-y-2 text-sm text-black/70">
              <p>Ou écrivez-nous directement :</p>
              <a
                href="mailto:bonjour@toutlemondegagne.ca"
                className="font-medium uppercase text-[var(--blue)] transition hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
              >
                bonjour@toutlemondegagne.ca
              </a>
            </div>
          </aside>

          <ContactForm />
        </section>
      </PageContainer>
    </main>
  )
}
