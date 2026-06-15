import { PageContainer } from '../components/layout'
import { Button, Card, SectionLabel } from '../components/ui'

const promises = [
  {
    title: 'Budget respecté',
    text: 'Pas de surprise en cours de mandat.',
  },
  {
    title: 'Équipe dédiée',
    text: 'Profils complémentaires sur votre projet.',
  },
  {
    title: '100 % vôtre',
    text: 'Tous les accès et fichiers remis à la fin.',
  },
  {
    title: 'Transparence & autonomie',
    text: 'Vous restez décideur à chaque étape.',
  },
]

const constraints = [
  {
    challengeTitle: 'Budget limité, besoins réels',
    challenge:
      "Les OBNL ont souvent peu de ressources pour investir en marketing ou en refonte web, mais en ont pourtant besoin pour rejoindre leurs donateurs et bénéficiaires.",
    answerTitle: 'Le modèle stage rend ça possible',
    answer:
      "En faisant travailler des étudiants supervisés, TMG peut offrir des livrables professionnels à des coûts adaptés aux réalités des organismes à mission sociale.",
  },
  {
    challengeTitle: 'Pas de ressources internes en numérique',
    challenge:
      "Beaucoup d'OBNL n'ont pas de gestionnaire de site web ou de stratège marketing à l'interne. Le numérique reste une boîte noire.",
    answerTitle: 'Formation et passation incluses',
    answer:
      "Chaque livrable est accompagné d'une formation adaptée à vos équipes. Vous repartez autonomes, sans dépendance envers TMG.",
  },
]

const obnlServices = [
  {
    title: 'Site web pour OBNL',
    text: "Site accessible, clair, optimisé pour les dons et l'engagement communautaire. Mobile-first, facile à gérer.",
    timeline: '4-8 semaines',
  },
  {
    title: 'Stratégie de communication',
    text: 'Plan de contenu adapté à votre mission pour rejoindre donateurs, bénévoles et bénéficiaires sur les bons canaux.',
    timeline: '2-4 semaines',
  },
]

export default function Obnl() {
  return (
    <main>
      <PageContainer>
        <section className="grid min-h-[calc(100svh-6rem)] gap-12 border-b border-black/20 py-20 text-left lg:grid-cols-[0.52fr_0.48fr] lg:items-center">
          <div className="space-y-8">
            <SectionLabel>Pour les OBNL & organismes</SectionLabel>
            <h1 className="max-w-4xl text-[clamp(3.2rem,7vw,8rem)] font-medium leading-[0.92] tracking-normal text-black">
              Votre mission mérite une présence{' '}
              <span className="text-[var(--blue)]">à sa hauteur.</span>
            </h1>
            <p className="max-w-xl text-xl leading-8 text-black/70">
              Des solutions numériques accessibles pour les organismes à but non
              lucratif qui veulent rejoindre leur communauté sans se ruiner en
              frais d&apos;agence.
            </p>
            <Button href="/contact" variant="secondary">
              Démarrer un projet
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {promises.map((promise, index) => (
              <Card
                key={promise.title}
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
            ))}
          </div>
        </section>

        <section className="border-b border-black/20 py-20 text-left">
          <div className="mb-12 max-w-3xl space-y-5">
            <span className="text-sm font-medium uppercase text-[var(--blue)]">
              On comprend votre contexte
            </span>
            <h2 className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black">
              Les contraintes des OBNL.
            </h2>
            <p className="text-xl leading-8 text-black/70">
              Et comment TMG les adresse concrètement.
            </p>
          </div>

          <div className="space-y-5">
            {constraints.map((item) => (
              <div
                key={item.challengeTitle}
                className="grid gap-5 lg:grid-cols-2"
              >
                <Card className="text-left text-black" padding="p-8">
                  <span className="mb-3 block text-sm font-medium uppercase text-red-500">
                    Défi
                  </span>
                  <h3 className="mb-4 text-2xl font-semibold leading-tight text-black">
                    {item.challengeTitle}
                  </h3>
                  <p className="text-lg leading-8 text-black/70">{item.challenge}</p>
                </Card>

                <Card className="text-left text-black" padding="p-8">
                  <span className="mb-3 block text-sm font-medium uppercase text-[var(--blue)]">
                    Réponse TMG
                  </span>
                  <h3 className="mb-4 text-2xl font-semibold leading-tight text-black">
                    {item.answerTitle}
                  </h3>
                  <p className="text-lg leading-8 text-black/70">{item.answer}</p>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-black/20 py-20 text-left">
          <div className="mb-12 max-w-3xl space-y-5">
            <span className="text-sm font-medium uppercase text-[var(--blue)]">
              Ce qu&apos;on vous offre
            </span>
            <h2 className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black">
              Nos services pour les OBNL
            </h2>
            <p className="text-xl leading-8 text-black/70">
              Chaque service est adapté aux réalités et aux objectifs des
              organismes à but non lucratif.
            </p>
          </div>

          <div className="space-y-5">
            {obnlServices.map((service, index) => (
              <Card
                key={service.title}
                className="grid gap-6 text-left text-black md:grid-cols-[0.08fr_1fr_auto] md:items-center"
                padding="p-8"
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
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-20 text-left lg:grid-cols-[0.6fr_0.4fr] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black">
            Un budget adapté à votre mission.
          </h2>
          <div className="space-y-6">
            <p className="text-xl leading-8 text-black/70">
              Votre organisme mérite une présence claire sans modèle compliqué
              ni frais inutiles.
            </p>
            <Button href="/contact">Lancer un projet OBNL</Button>
          </div>
        </section>
      </PageContainer>
    </main>
  )
}
