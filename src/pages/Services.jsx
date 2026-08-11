import { PageContainer } from '../components/layout'
import RelatedLinks from '../components/seo/RelatedLinks'
import { useSiteContent } from '../context/useSiteContent'
import { AnimatedSection, AnimatedText, Button, Card, SectionLabel } from '../components/ui'

const serviceHrefs = ['/contact', '/contact', '/services#marketing']

function ServiceDetailSection({ id, service }) {
  return (
    <AnimatedSection
      as="section"
      id={id}
      className="scroll-mt-32 border-b border-black/20 py-20 text-left"
    >
      <div className="grid gap-10 lg:grid-cols-[0.5fr_0.5fr] lg:items-center">
        <div className="space-y-6">
          <SectionLabel>{service.label}</SectionLabel>
          <AnimatedText
            as="h2"
            split="words"
            className="max-w-2xl text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[0.94] tracking-normal text-black"
          >
            {service.title}
          </AnimatedText>
          <AnimatedText as="p" delay={0.12} className="max-w-xl text-lg leading-8 text-black/70">
            {service.description}
          </AnimatedText>
          <Button href="/contact" variant="secondary">
            {service.cta}
          </Button>
        </div>

        <div className="space-y-4">
          {service.facts.map((fact, index) => (
            <AnimatedSection key={fact.title} delay={index * 0.06}>
              <Card
                className="grid gap-5 text-left text-black sm:grid-cols-[3.5rem_1fr] sm:items-center"
                padding="p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-sm font-medium text-white">
                  0{index + 1}
                </span>
                <span>
                  <strong className="block text-xl font-semibold leading-tight text-black">
                    {fact.title}
                  </strong>
                  <span className="text-base leading-6 text-black/65">{fact.text}</span>
                </span>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <div className="mt-14 grid border border-black/20 md:grid-cols-2 xl:grid-cols-3">
        {service.deliverables.map((deliverable, index) => (
          <div
            key={deliverable.title}
            className="border-b border-r border-black/15 bg-[var(--card)] p-7 text-left text-black last:border-r-0"
          >
            <span className="mb-6 flex h-10 w-10 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-sm font-medium text-white">
              0{index + 1}
            </span>
            <h3 className="mb-3 text-xl font-semibold leading-tight text-black">
              {deliverable.title}
            </h3>
            <p className="text-base leading-7 text-black/70">{deliverable.text}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  )
}

export default function Services() {
  const { content } = useSiteContent()
  const { services } = content

  return (
    <main>
      <PageContainer>
        <section className="border-b border-black/20 py-16 text-left">
          <SectionLabel>{services.hero.label}</SectionLabel>
          <AnimatedText
            as="h1"
            split="words"
            className="mt-6 max-w-4xl text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[0.98] tracking-normal text-black"
          >
            {services.hero.title}
          </AnimatedText>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <AnimatedText as="p" delay={0.16} className="max-w-md text-xl leading-7 text-black/75">
              {services.hero.subtitle}
            </AnimatedText>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button href="/contact" className="w-full sm:w-auto">
                {services.hero.primaryCta}
              </Button>
              <Button href="#web" variant="outline" className="w-full sm:w-auto">
                {services.hero.secondaryCta}
              </Button>
            </div>
          </div>
        </section>

        <section>
          {services.list.map((service, index) => (
            <AnimatedSection
              key={service.title}
              id={['pme', 'obnl', 'strategie'][index]}
              className="grid scroll-mt-32 gap-8 border-b border-black/20 py-14 text-left lg:grid-cols-[0.08fr_0.42fr_0.32fr_0.18fr]"
              delay={index * 0.05}
            >
              <span className="text-sm font-medium">0{index + 1}</span>
              <AnimatedText
                as="h2"
                split="words"
                className="text-[clamp(2.8rem,5vw,5.4rem)] font-semibold leading-none tracking-normal text-black"
              >
                {service.title}
              </AnimatedText>
              <AnimatedText as="p" delay={0.1} className="max-w-md text-xl leading-8 text-black/70">
                {service.text}
              </AnimatedText>
              <Button
                href={serviceHrefs[index] ?? '/contact'}
                variant="ghost"
                className="self-start justify-self-start lg:justify-self-end"
              >
                {service.cta}
              </Button>
            </AnimatedSection>
          ))}
        </section>

        <ServiceDetailSection id="web" service={services.web} />
        <ServiceDetailSection id="marketing" service={services.marketing} />

        <section className="border-b border-black/20 py-20">
          <div className="border-t border-black/45 pt-8">
            <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr]">
              <div className="max-w-sm">
                <SectionLabel>{services.focus.label}</SectionLabel>
                <AnimatedText
                  as="h2"
                  split="words"
                  className="mt-6 text-[clamp(2.6rem,4vw,4.2rem)] font-semibold leading-none tracking-normal text-black"
                >
                  {services.focus.title}
                </AnimatedText>
              </div>
              <AnimatedText
                as="p"
                delay={0.1}
                className="max-w-3xl self-end text-lg leading-7 text-black/68 md:text-xl md:leading-8"
              >
                {services.focus.body}
              </AnimatedText>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {services.focus.items.map((item, index) => (
                <AnimatedSection
                  key={item.title}
                  delay={index * 0.08}
                  className="group relative min-h-[22rem] border-t border-black/45 pt-7 text-left"
                >
                  <span className="mb-12 block text-sm font-medium text-black/55">
                    0{index + 1}
                  </span>
                  <h3 className="text-[clamp(2.7rem,4vw,4.2rem)] font-semibold leading-[0.86] tracking-normal text-[var(--blue)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md text-lg leading-7 text-black/74">
                    {item.text}
                  </p>
                  <p className="mt-10 border-t border-black/20 pt-5 text-sm font-semibold leading-6 tracking-normal text-black/58">
                    {item.detail}
                  </p>
                  <span
                    className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-[var(--green)] transition-all duration-500 group-hover:w-full"
                    aria-hidden="true"
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <RelatedLinks />
      </PageContainer>
    </main>
  )
}
