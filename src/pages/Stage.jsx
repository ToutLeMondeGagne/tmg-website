import { PageContainer } from '../components/layout'
import { InternshipForm } from '../components/forms'
import RelatedLinks from '../components/seo/RelatedLinks'
import { AnimatedSection, AnimatedText, Button, Card, SectionLabel } from '../components/ui'

const internshipBenefits = [
  {
    title: 'Vrais mandats clients',
    text: "Dès le premier jour, tu travailles sur un projet réel pour un vrai client - PME ou OBNL. Pas d'exercices fictifs.",
  },
  {
    title: 'Portfolio béton',
    text: 'Chaque livrable remis au client devient une pièce concrète de ton portfolio. Tu repars avec des preuves tangibles de ton travail.',
  },
  {
    title: 'Stage potentiellement crédité',
    text: 'Selon ton université et ton programme, ce stage pourrait être crédité. Contacte ton département directement pour vérifier les conditions de reconnaissance.',
  },
  {
    title: 'Réseau professionnel',
    text: "Tu intègres un réseau d'étudiant·es et d'entreprises qui te permettent d'établir des contacts dans le milieu professionnel.",
  },
  {
    title: 'Responsabilités réelles',
    text: 'Tu gères un mandat de A à Z avec ton équipe et tu présentes tes livrables toi-même. Pas de figuration.',
  },
  {
    title: 'Lettre de recommandation',
    text: 'À la fin de ton stage, tu reçois une lettre de recommandation attestant de tes compétences et de tes contributions réelles.',
  },
]

const internshipProcess = [
  {
    title: 'Autonomie accompagnée',
    text: 'Tu avances avec un cadre clair, des retours réguliers et de la place pour proposer.',
  },
  {
    title: "Curiosité et envie d'apprendre",
    text: 'On cherche des profils qui posent des questions, testent et progressent avec sérieux.',
  },
  {
    title: 'Communication claire',
    text: 'Tu apprends à expliquer tes choix, tes blocages et tes livrables de façon simple.',
  },
  {
    title: 'Livrables utiles',
    text: 'Chaque production doit servir un vrai besoin client, pas seulement remplir un portfolio.',
  },
]

export default function Stage() {
  return (
    <main>
      <PageContainer>
        <section className="grid gap-8 border-b border-black/20 py-20 text-left lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div className="space-y-7">
            <SectionLabel>Stagiaires</SectionLabel>
            <AnimatedText
              as="h1"
              split="words"
              className="text-[clamp(3rem,6vw,6.6rem)] font-semibold uppercase leading-[0.86] tracking-normal text-black"
            >
              Stage marketing, contenu et web sur de vrais mandats.
            </AnimatedText>
            <AnimatedText as="p" delay={0.16} className="text-xl leading-8 text-black/70">
              TMG accueille les profils curieux qui veulent pratiquer le
              marketing, le design, le contenu et le web dans des projets réels.
            </AnimatedText>
            <Button href="#candidature" variant="secondary">
              Proposer une candidature
            </Button>
          </div>

          <div className="space-y-5">
            <span className="text-sm font-medium uppercase text-[var(--blue)]">
              Process
            </span>
            <div className="grid gap-5 sm:grid-cols-2">
              {internshipProcess.map((item, index) => (
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
              Ce que tu y gagnes
            </span>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              Un stage qui fait vraiment la différence.
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              TMG n&apos;est pas un stage ordinaire. Voici ce qui nous distingue.
            </AnimatedText>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {internshipBenefits.map((benefit, index) => (
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

        <RelatedLinks />

        <section
          id="candidature"
          className="grid scroll-mt-32 gap-12 py-16 text-left lg:grid-cols-[0.42fr_0.58fr]"
        >
          <aside className="flex flex-col justify-between gap-12 lg:min-h-[42rem]">
            <div className="max-w-md space-y-6">
              <span className="text-base font-medium uppercase italic text-[var(--blue)]">
                [ Candidature ]
              </span>
              <AnimatedText
                as="h2"
                split="words"
                className="text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.92] tracking-normal text-black"
              >
                Un formulaire pensé pour les stagiaires.
              </AnimatedText>
              <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
                Ici, on ne demande pas un budget ou un objectif de conversion.
                On veut comprendre ce que vous voulez apprendre, vos
                disponibilités et le type de projets qui vous motive.
              </AnimatedText>
            </div>
            <div className="space-y-2 text-sm text-black/70">
              <p>Pour une question rapide :</p>
              <a
                href="mailto:bonjour@toutlemondegagne.ca"
                className="font-medium uppercase text-[var(--blue)] transition hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
              >
                bonjour@toutlemondegagne.ca
              </a>
            </div>
          </aside>

          <InternshipForm />
        </section>
      </PageContainer>
    </main>
  )
}
