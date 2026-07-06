import { Link } from 'react-router-dom'
import { PageContainer } from '../components/layout'
import RelatedLinks from '../components/seo/RelatedLinks'
import { useSiteContent } from '../context/useSiteContent'
import {
  AnimatedSection,
  AnimatedText,
  Button,
  Card,
  ChallengePair,
  SectionLabel,
} from '../components/ui'

export default function Pme() {
  const { content } = useSiteContent()
  const { pme } = content

  return (
    <main>
      <PageContainer>
        <section className="grid min-h-[calc(100svh-6rem)] gap-12 border-b border-black/20 py-20 text-left lg:grid-cols-[0.52fr_0.48fr] lg:items-center">
          <div className="space-y-8">
            <SectionLabel>{pme.hero.label}</SectionLabel>
            <h1 className="max-w-4xl text-[clamp(2.6rem,12vw,4.8rem)] font-medium leading-[0.92] tracking-normal text-black sm:text-[clamp(3.2rem,7vw,8rem)]">
              <AnimatedText split="words">{pme.hero.title}</AnimatedText>{' '}
              <AnimatedText split="words" delay={0.24} className="text-[var(--blue)]">
                {pme.hero.accent}
              </AnimatedText>
            </h1>
            <AnimatedText
              as="p"
              delay={0.18}
              className="max-w-xl text-xl leading-8 text-black/70"
            >
              {pme.hero.subtitle}
            </AnimatedText>
            <Button href="/contact" variant="secondary">
              {pme.hero.cta}
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {pme.promises.map((promise, index) => (
              <AnimatedSection key={promise.title} delay={index * 0.06}>
                <Card
                  className="min-h-44 text-left text-black"
                  padding="p-8"
                >
                  <span className="mb-8 flex h-10 w-10 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-sm font-medium text-white">
                    0{index + 1}
                  </span>
                  <h2 className="mb-2 text-3xl font-semibold leading-none text-black">
                    {promise.title}
                  </h2>
                  <p className="text-base leading-6 text-black/65">{promise.text}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section className="border-b border-black/20 py-20 text-left">
          <div className="mb-12 max-w-3xl space-y-5">
            <span className="text-sm font-medium uppercase text-[var(--blue)]">
              {pme.challenges.label}
            </span>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              {pme.challenges.title}
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              {pme.challenges.subtitle}
            </AnimatedText>
          </div>

          <div className="space-y-5">
            {pme.challenges.items.map((item) => (
              <AnimatedSection
                key={item.problemTitle}
                className="min-w-0"
              >
                <ChallengePair
                  problemLabel="Problème"
                  problemTitle={item.problemTitle}
                  problemText={item.problem}
                  solutionLabel="Solution TMG"
                  solutionTitle={item.answerTitle}
                  solutionText={item.answer}
                />
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section className="border-b border-black/20 py-20 text-left">
          <div className="mb-12 max-w-3xl space-y-5">
            <span className="text-sm font-medium uppercase text-[var(--blue)]">
              {pme.services.label}
            </span>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              {pme.services.title}
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              {pme.services.subtitle}
            </AnimatedText>
          </div>

          <div className="space-y-5">
            {pme.services.items.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.06}>
                <Link
                  to={service.href}
                  className="grid gap-6 border border-black/20 bg-[var(--card)] p-8 text-left text-black transition duration-200 hover:-translate-y-0.5 hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)] md:grid-cols-[0.08fr_1fr_auto] md:items-center"
                >
                  <span className="text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="mb-2 text-2xl font-semibold leading-tight text-black">
                      {service.title}
                    </h3>
                    <p className="max-w-4xl text-base leading-7 text-black/70">
                      {service.text}
                    </p>
                  </div>
                  <span className="text-sm font-medium uppercase text-[var(--blue)]">
                    {service.timeline}
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-20 text-left lg:grid-cols-[0.6fr_0.4fr] lg:items-end">
          <div>
            <AnimatedText
              as="h2"
              split="words"
              className="max-w-4xl text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              {pme.cta.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.12}
              className="mt-6 max-w-xl text-xl leading-8 text-black/70"
            >
              {pme.cta.body}
            </AnimatedText>
          </div>
          <Button href="/contact" className="justify-self-start lg:justify-self-end">
            {pme.cta.button}
          </Button>
        </section>

        <RelatedLinks />
      </PageContainer>
    </main>
  )
}
