import { PageContainer } from '../components/layout'
import RelatedLinks from '../components/seo/RelatedLinks'
import { useSiteContent } from '../context/useSiteContent'
import {
  AnimatedSection,
  AnimatedText,
  Button,
  Card,
  SectionLabel,
} from '../components/ui'
import teamStudioImage from '../assets/images/tmg-team-studio.webp'

export default function About() {
  const { content } = useSiteContent()
  const { about } = content

  return (
    <main>
      <PageContainer>
        <section className="grid min-h-[calc(100svh-6rem)] gap-10 border-b border-black/20 py-20 text-left lg:grid-cols-[0.46fr_0.54fr] lg:items-center">
          <div className="space-y-8">
            <SectionLabel>{about.hero.label}</SectionLabel>
            <AnimatedText
              as="h1"
              split="words"
              className="max-w-6xl text-[clamp(2.6rem,12vw,4.8rem)] font-medium leading-[0.92] tracking-normal text-black sm:text-[clamp(3.2rem,7vw,8rem)]"
            >
              {about.hero.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.14}
              className="max-w-2xl text-xl leading-8 text-black/70"
            >
              {about.hero.subtitle}
            </AnimatedText>
            <Button href="/contact" variant="secondary">
              {about.hero.cta}
            </Button>
          </div>

          <AnimatedSection delay={0.12}>
            <figure className="relative overflow-hidden border border-black/20 bg-[var(--card)]">
              <img
                src={teamStudioImage}
                alt="Équipe TMG en atelier de stratégie autour d'un projet web"
                width="1672"
                height="941"
                className="aspect-[4/3] w-full object-cover grayscale-[10%]"
                decoding="async"
                fetchPriority="high"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-[var(--bg)]/85 px-5 py-4 text-xs font-medium text-black backdrop-blur">
                {about.hero.imageCaption}
              </figcaption>
            </figure>
          </AnimatedSection>
        </section>

        <section className="grid gap-10 border-b border-black/20 py-20 text-left lg:grid-cols-[0.28fr_1fr]">
          <div>
            <SectionLabel>{about.model.label}</SectionLabel>
          </div>
          <div className="space-y-8">
            <AnimatedText
              as="h2"
              split="words"
              className="max-w-5xl text-[clamp(2.8rem,6vw,6.6rem)] font-medium leading-[0.94] tracking-normal text-black"
            >
              {about.model.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.12}
              className="max-w-4xl border-t border-black/30 pt-8 text-xl leading-8 text-black/70"
            >
              {about.model.body}
            </AnimatedText>
          </div>
        </section>

        <section className="grid gap-5 border-b border-black/20 py-20 md:grid-cols-3">
          {about.proofPoints.map((item, index) => (
            <AnimatedSection key={item.value} delay={index * 0.08}>
              <Card className="min-h-48 text-left text-black" padding="p-8">
                <span className="mb-8 block text-sm font-medium text-black/55">
                  0{index + 1}
                </span>
                <h2 className="text-[clamp(3.4rem,8vw,6.5rem)] font-semibold leading-none tracking-normal text-[var(--blue)]">
                  {item.value}
                </h2>
                <p className="mt-5 text-base leading-7 text-black/70">
                  {item.label}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </section>

        <section className="border-b border-black/20 py-20 text-left">
          <div className="mb-12 max-w-4xl space-y-5">
            <SectionLabel>{about.team.label}</SectionLabel>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              {about.team.title}
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              {about.team.subtitle}
            </AnimatedText>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {about.team.roles.map((member, index) => (
              <AnimatedSection key={member.title} delay={index * 0.08}>
                <Card className="text-left text-black" padding="p-0">
                  <img
                    src={teamStudioImage}
                    alt={`${member.title} chez TMG`}
                    width="1672"
                    height="941"
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="p-6">
                    <span className="mb-4 block text-sm font-medium text-[var(--blue)]">
                      Rôle 0{index + 1}
                    </span>
                    <h3 className="text-3xl font-semibold leading-none text-black">
                      {member.title}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-black/70">
                      {member.text}
                    </p>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section className="grid gap-5 border-b border-black/20 py-20 md:grid-cols-3">
          {about.values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.08}>
              <Card className="min-h-72 text-left text-black" padding="p-8">
                <h2 className="text-5xl font-semibold leading-none tracking-normal text-[var(--blue)]">
                  {value.title}
                </h2>
                <p className="mt-8 text-base leading-7 text-black/70">
                  {value.text}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </section>

        <section className="grid gap-8 py-20 text-left lg:grid-cols-[0.6fr_0.4fr] lg:items-end">
          <AnimatedText
            as="h2"
            split="words"
            className="max-w-4xl text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
          >
            {about.cta.title}
          </AnimatedText>
          <div className="space-y-6">
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              {about.cta.body}
            </AnimatedText>
            <Button href="/contact">{about.cta.button}</Button>
          </div>
        </section>

        <RelatedLinks />
      </PageContainer>
    </main>
  )
}
