import { PageContainer } from '../components/layout'
import PageHero from '../components/sections/PageHero'
import { useSiteContent } from '../context/useSiteContent'
import { AnimatedSection, Card } from '../components/ui'

export default function QA() {
  const { content } = useSiteContent()
  const { faq } = content

  return (
    <main>
      <PageHero
        label={faq.hero.label}
        title={faq.hero.title}
        minHeightClass="min-h-[46svh]"
        titleClassName="max-w-6xl text-[clamp(2.6rem,11vw,5rem)] font-semibold leading-[0.86] tracking-normal text-white sm:text-[clamp(3rem,7vw,7.5rem)]"
      />

      <PageContainer>
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
      </PageContainer>
    </main>
  )
}
