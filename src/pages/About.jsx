import { PageContainer } from '../components/layout'
import RelatedLinks from '../components/seo/RelatedLinks'
import {
  AnimatedSection,
  AnimatedText,
  Button,
  Card,
  SectionLabel,
} from '../components/ui'
import teamStudioImage from '../assets/images/tmg-team-studio.webp'

const proofPoints = [
  {
    value: 'PME',
    label: 'Entreprises en croissance',
  },
  {
    value: 'OBNL',
    label: 'Organismes à mission',
  },
  {
    value: 'Stage',
    label: 'Mandats réels pour la relève',
  },
]

const values = [
  {
    title: 'Clarte',
    text: 'On transforme les idées floues en priorités, messages et interfaces faciles à comprendre.',
  },
  {
    title: 'Impact',
    text: 'Chaque livrable doit aider une vraie organisation à être mieux vue, mieux comprise et mieux choisie.',
  },
  {
    title: 'Transmission',
    text: 'On construit avec la relève, mais chaque production reste supervisée, structurée et livrable.',
  },
]

const teamRoles = [
  {
    title: 'Stratégie & relation client',
    text: 'On cadre les objectifs, les contraintes, le ton et les priorités avant de produire.',
    position: '35% 45%',
  },
  {
    title: 'Design & contenu',
    text: 'On transforme l’offre en pages claires, parcours lisibles et messages utiles.',
    position: '64% 42%',
  },
  {
    title: 'Web & performance',
    text: 'On développe, teste, optimise et remet un site que le client peut vraiment utiliser.',
    position: '50% 55%',
  },
]

export default function About() {
  return (
    <main>
      <PageContainer>
        <section className="grid min-h-[calc(100svh-6rem)] gap-10 border-b border-black/20 py-20 text-left lg:grid-cols-[0.46fr_0.54fr] lg:items-center">
          <div className="space-y-8">
            <SectionLabel>À propos</SectionLabel>
            <AnimatedText
              as="h1"
              split="words"
              className="max-w-6xl text-[clamp(2.6rem,12vw,4.8rem)] font-medium leading-[0.92] tracking-normal text-black sm:text-[clamp(3.2rem,7vw,8rem)]"
            >
              Une agence propulsée par la relève.
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.14}
              className="max-w-2xl text-xl leading-8 text-black/70"
            >
              TMG - Tout le Monde Gagne aide les PME et OBNL à clarifier leur
              présence numérique, tout en donnant à des stagiaires l’occasion de
              travailler sur de vrais mandats, avec un vrai impact.
            </AnimatedText>
            <Button href="/contact" variant="secondary">
              Lancer un projet
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
              <figcaption className="absolute bottom-0 left-0 right-0 bg-[var(--bg)]/85 px-5 py-4 text-xs font-medium uppercase text-black backdrop-blur">
                Stratégie, design, contenu et web réunis autour du même mandat.
              </figcaption>
            </figure>
          </AnimatedSection>
        </section>

        <section className="grid gap-10 border-b border-black/20 py-20 text-left lg:grid-cols-[0.28fr_1fr]">
          <div>
            <SectionLabel>Notre modèle</SectionLabel>
          </div>
          <div className="space-y-8">
            <AnimatedText
              as="h2"
              split="words"
              className="max-w-5xl text-[clamp(2.8rem,6vw,6.6rem)] font-medium leading-[0.94] tracking-normal text-black"
            >
              Le bon projet doit faire avancer le client et l’équipe.
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.12}
              className="max-w-4xl border-t border-black/30 pt-8 text-xl leading-8 text-black/70"
            >
              Notre approche relie besoins d’affaires, apprentissage terrain et
              exécution professionnelle. Les clients obtiennent des livrables
              utiles. Les stagiaires repartent avec des preuves concrètes. Et
              chaque mandat est encadré pour rester clair, réaliste et actionnable.
            </AnimatedText>
          </div>
        </section>

        <section className="grid gap-5 border-b border-black/20 py-20 md:grid-cols-3">
          {proofPoints.map((item, index) => (
            <AnimatedSection key={item.value} delay={index * 0.08}>
              <Card className="min-h-48 text-left text-black" padding="p-8">
                <span className="mb-8 block text-sm font-medium uppercase text-black/55">
                  0{index + 1}
                </span>
                <h2 className="text-[clamp(3.4rem,8vw,6.5rem)] font-semibold uppercase leading-none tracking-normal text-[var(--blue)]">
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
            <SectionLabel>Équipe</SectionLabel>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              Une équipe courte, connectée, orientée livrables.
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              TMG fonctionne comme un atelier : les profils se complètent, les
              décisions restent visibles, et chaque personne comprend pourquoi
              son morceau du projet compte.
            </AnimatedText>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {teamRoles.map((member, index) => (
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
                    style={{ objectPosition: member.position }}
                  />
                  <div className="p-6">
                    <span className="mb-4 block text-sm font-medium uppercase text-[var(--blue)]">
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
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.08}>
              <Card className="min-h-72 text-left text-black" padding="p-8">
                <h2 className="text-5xl font-semibold uppercase leading-none tracking-normal text-[var(--blue)]">
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
            Tout le monde gagne quand le travail devient concret.
          </AnimatedText>
          <div className="space-y-6">
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              Vous arrivez avec un besoin. On repart avec une direction, une
              équipe, un plan et des livrables qui peuvent être utilisés.
            </AnimatedText>
            <Button href="/contact">Parler à TMG</Button>
          </div>
        </section>

        <RelatedLinks />
      </PageContainer>
    </main>
  )
}
