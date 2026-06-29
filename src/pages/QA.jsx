import { PageContainer } from '../components/layout'
import RelatedLinks from '../components/seo/RelatedLinks'
import { useSiteContent } from '../context/useSiteContent'
import { AnimatedSection, AnimatedText, Card, SectionLabel } from '../components/ui'

export default function QA() {
  const { content } = useSiteContent()
  const { faq } = content

  return (
    <main>
      <PageContainer>
        <section className="grid gap-8 border-b border-black/20 py-20 text-left lg:grid-cols-[0.28fr_1fr]">
          <SectionLabel>{faq.hero.label}</SectionLabel>
          <AnimatedText
            as="h1"
            split="words"
            className="max-w-6xl text-[clamp(2.6rem,12vw,5rem)] font-semibold uppercase leading-[0.86] tracking-normal text-black sm:text-[clamp(3rem,8vw,9rem)]"
          >
            {faq.hero.title}
          </AnimatedText>
        </section>

        <section>
          {faq.questions.map((item, index) => (
            <AnimatedSection key={item.question} delay={index * 0.05}>
              <Card
                className="grid gap-8 text-left text-black lg:grid-cols-[0.08fr_0.42fr_0.5fr]"
                hover={false}
                padding="py-10"
              >
                <span className="text-sm font-medium">0{index + 1}</span>
                <h2 className="text-4xl font-semibold leading-none tracking-normal text-black">
                  {item.question}
                </h2>
                <p className="text-xl leading-8 text-black/70">{item.answer}</p>
              </Card>
            </AnimatedSection>
          ))}
        </section>

        <RelatedLinks />
      </PageContainer>
    </main>
  )
}
