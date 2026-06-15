import { PageContainer } from '../components/layout'
import { AnimatedText, Card, SectionLabel } from '../components/ui'

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
      <PageContainer className="py-16 sm:py-24">
        <section className="mx-auto max-w-3xl space-y-7 text-left">
          <SectionLabel>FAQ</SectionLabel>
          <AnimatedText className="text-4xl font-bold leading-tight text-black sm:text-5xl">
            Questions frequentes.
          </AnimatedText>
        </section>

        <section className="mx-auto mt-10 grid max-w-3xl gap-5">
          {questions.map((item) => (
            <Card key={item.question} className="text-left text-black" hover={false}>
              <h2 className="mb-3 text-xl font-bold text-black">{item.question}</h2>
              <p className="leading-7 text-neutral-600">{item.answer}</p>
            </Card>
          ))}
        </section>
      </PageContainer>
    </main>
  )
}
