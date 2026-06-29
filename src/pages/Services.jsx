import { PageContainer } from '../components/layout'
import RelatedLinks from '../components/seo/RelatedLinks'
import { useSiteContent } from '../context/useSiteContent'
import { AnimatedSection, AnimatedText, Button, SectionLabel } from '../components/ui'

const serviceHrefs = ['/pme', '/obnl', '/services/marketing']

export default function Services() {
  const { content } = useSiteContent()
  const { services } = content

  return (
    <main>
      <PageContainer>
        <section className="grid gap-8 border-b border-black/20 py-20 text-left lg:grid-cols-[0.28fr_1fr]">
          <SectionLabel>{services.hero.label}</SectionLabel>
          <AnimatedText
            as="h1"
            split="words"
            className="max-w-5xl text-[clamp(2.6rem,12vw,5rem)] font-semibold uppercase leading-[0.86] tracking-normal text-black sm:text-[clamp(3rem,8vw,9rem)]"
          >
            {services.hero.title}
          </AnimatedText>
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

        <section className="border-b border-black/20 py-20">
          <div className="border-t border-black/45 pt-8">
            <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr]">
              <div className="max-w-sm">
                <SectionLabel>{services.focus.label}</SectionLabel>
                <AnimatedText
                  as="h2"
                  split="words"
                  className="mt-6 text-[clamp(2.6rem,4vw,4.2rem)] font-semibold uppercase leading-none tracking-normal text-black"
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
                  <h3 className="text-[clamp(2.7rem,4vw,4.2rem)] font-semibold uppercase leading-[0.86] tracking-normal text-[var(--blue)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md text-lg leading-7 text-black/74">
                    {item.text}
                  </p>
                  <p className="mt-10 border-t border-black/20 pt-5 text-sm font-semibold uppercase leading-6 tracking-normal text-black/58">
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
