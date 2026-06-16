import { PageContainer } from '../components/layout'
import { AnimatedSection, AnimatedText, Card, SectionLabel } from '../components/ui'

const questions = [
  {
    question: 'Avec quels types de clients travaillez-vous ?',
    answer: 'Principalement avec des PME, OBNL et equipes qui veulent clarifier leur presence numerique.',
  },
  {
    question: 'Pouvez-vous partir d un site existant ?',
    answer: 'Oui, on peut auditer, simplifier et faire evoluer une base deja en place.',
  },
  {
    question: 'Comment commence un mandat ?',
    answer: 'On commence par comprendre vos objectifs, vos contraintes et les actions prioritaires.',
  },
]

export default function QA() {
  return (
    <main>
      <PageContainer>
        <section className="grid gap-8 border-b border-black/20 py-20 text-left lg:grid-cols-[0.28fr_1fr]">
          <SectionLabel>FAQ</SectionLabel>
          <AnimatedText
            as="h1"
            split="words"
            className="max-w-6xl text-[clamp(3rem,8vw,9rem)] font-semibold uppercase leading-[0.86] tracking-normal text-black"
          >
            Questions frequentes.
          </AnimatedText>
        </section>

        <section>
          {questions.map((item, index) => (
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
