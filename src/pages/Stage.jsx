import { PageContainer } from '../components/layout'
import { InternshipForm } from '../components/forms'
import RelatedLinks from '../components/seo/RelatedLinks'
import { useSiteContent } from '../context/useSiteContent'
import { AnimatedSection, AnimatedText, Button, Card, SectionLabel } from '../components/ui'

export default function Stage() {
  const { content } = useSiteContent()
  const { stage, global } = content
  const stageContactEmail = stage.application.contactEmail || global.contactEmail

  return (
    <main>
      <PageContainer>
        <section className="grid gap-8 border-b border-black/20 py-20 text-left lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div className="space-y-7">
            <SectionLabel>{stage.hero.label}</SectionLabel>
            <AnimatedText
              as="h1"
              split="words"
              className="text-[clamp(2.4rem,11vw,4.5rem)] font-semibold uppercase leading-[0.86] tracking-normal text-black sm:text-[clamp(3rem,6vw,6.6rem)]"
            >
              {stage.hero.title}
            </AnimatedText>
            <AnimatedText as="p" delay={0.16} className="text-xl leading-8 text-black/70">
              {stage.hero.subtitle}
            </AnimatedText>
            <Button href="#candidature" variant="secondary">
              {stage.hero.cta}
            </Button>
          </div>

          <div className="space-y-5">
            <span className="text-sm font-medium uppercase text-[var(--blue)]">
              {stage.process.label}
            </span>
            <div className="grid gap-5 sm:grid-cols-2">
              {stage.process.items.map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.05}>
                  <Card className="min-h-52 text-left text-black" padding="p-6">
                    <span className="mb-7 flex h-10 w-10 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-sm font-medium text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                      0{index + 1}
                    </span>
                    <h2 className="mb-4 text-2xl font-semibold leading-tight text-black">
                      {item.title}
                    </h2>
                    <p className="text-base leading-7 text-black/70">
                      {item.text}
                    </p>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-black/20 py-20 text-left">
          <div className="mb-12 max-w-3xl space-y-5">
            <span className="text-sm font-medium uppercase text-[var(--blue)]">
              {stage.benefits.label}
            </span>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              {stage.benefits.title}
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              {stage.benefits.subtitle}
            </AnimatedText>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {stage.benefits.items.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={(index % 3) * 0.06}>
                <Card
                  className="min-h-56 text-left text-black"
                  padding="p-8"
                >
                  <span className="mb-8 flex h-10 w-10 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-sm font-medium text-white">
                    0{index + 1}
                  </span>
                  <h3 className="mb-4 text-2xl font-semibold leading-tight text-black">
                    {benefit.title}
                  </h3>
                  <p className="text-base leading-7 text-black/70">{benefit.text}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section
          id="candidature"
          className="grid scroll-mt-32 gap-12 py-16 text-left lg:grid-cols-[0.42fr_0.58fr]"
        >
          <aside className="flex flex-col justify-between gap-12 lg:min-h-[42rem]">
            <div className="max-w-md space-y-6">
              <span className="text-base font-medium uppercase italic text-[var(--blue)]">
                {stage.application.label}
              </span>
              <AnimatedText
                as="h2"
                split="words"
                className="text-[clamp(2.5rem,11vw,4.2rem)] font-medium leading-[0.92] tracking-normal text-black sm:text-[clamp(3rem,6vw,6rem)]"
              >
                {stage.application.title}
              </AnimatedText>
              <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
                {stage.application.body}
              </AnimatedText>
            </div>
            <div className="space-y-2 text-sm text-black/70">
              <p>{stage.application.contactLabel}</p>
              <a
                href={`mailto:${stageContactEmail}`}
                className="font-medium uppercase text-[var(--blue)] transition hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
              >
                {stageContactEmail}
              </a>
            </div>
          </aside>

          <InternshipForm />
        </section>

        <RelatedLinks />
      </PageContainer>
    </main>
  )
}
