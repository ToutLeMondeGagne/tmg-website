import { useState } from 'react'
import { AnimatedSection, Button } from '../ui'

const newsletterReasons = [
  'Vous avez tout mis en place, mais quelque chose ne connecte pas encore.',
  'Vous voulez comprendre comment site web et stratégie travaillent vraiment ensemble.',
  'Vous bâtissez un projet qui vous tient à cœur et vous voulez de l’honnêteté sur la suite.',
  'Vous êtes dans le milieu inconfortable du parcours — et vous n’êtes pas seuls.',
]

function ZineCover() {
  return (
    <div className="relative flex aspect-[3/4] w-full max-w-md flex-col justify-between overflow-hidden bg-black p-6 text-left sm:p-8">
      <span
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:25%_100%,100%_72px]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <span className="bg-[var(--green)] px-3 py-1 text-xs font-semibold uppercase tracking-normal text-black">
          Les archives TMG
        </span>
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--blue)] text-center text-[0.55rem] font-semibold uppercase leading-tight text-white">
          Sans filtre
        </span>
      </div>

      <div className="relative z-10 space-y-3">
        <p className="text-[clamp(3.2rem,7vw,5rem)] font-semibold uppercase leading-[0.85] text-[var(--green)]">
          Tout le monde
          <br />
          gagne
        </p>
        <p className="max-w-[16rem] text-sm leading-6 text-white/70">
          Le journal de bord d’une équipe qui construit, teste et documente — en temps réel.
        </p>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-4 border-t border-white/20 pt-4">
        <div>
          <p className="text-xs font-semibold uppercase text-white/50">Édition</p>
          <p className="text-lg font-semibold uppercase text-white">Gratuite</p>
        </div>
        <span
          className="h-10 w-28 bg-[repeating-linear-gradient(90deg,white_0px,white_2px,transparent_2px,transparent_5px,white_5px,white_6px,transparent_6px,transparent_10px)]"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubscribe = (event) => {
    event.preventDefault()

    if (!email.trim()) {
      setStatus('Entrez votre courriel pour rejoindre l’infolettre.')
      return
    }

    setEmail('')
    setStatus('Merci ! Votre inscription sera activée au lancement de l’infolettre.')
  }

  return (
    <section
      id="infolettre"
      className="grid gap-12 border-b border-black/20 py-20 text-left lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:gap-16"
    >
      <AnimatedSection className="flex justify-center lg:justify-start">
        <ZineCover />
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="space-y-8">
        <div className="space-y-5">
          <span className="inline-flex bg-[var(--blue)] px-3 py-1 text-xs font-semibold uppercase tracking-normal text-white">
            Infolettre
          </span>
          <h2 className="max-w-2xl text-[clamp(2.4rem,4.5vw,4.2rem)] font-semibold uppercase leading-[0.92] text-black">
            Les <span className="text-[var(--blue)]">archives</span> TMG
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-black/70">
            On construit TMG en temps réel et on documente tout en chemin : la
            stratégie derrière les mandats, les projets clients, les systèmes qui
            font avancer les choses — et les journées qui ressemblent à une erreur
            404 sans solution en vue. Sans filtre, pour les fondateurs et les
            équipes qui bâtissent quelque chose qui compte vraiment.
          </p>
        </div>

        <ul className="space-y-4">
          {newsletterReasons.map((reason) => (
            <li key={reason} className="flex items-start gap-4">
              <span
                className="mt-2 h-2.5 w-2.5 shrink-0 border border-[var(--blue)] bg-[var(--blue)]"
                aria-hidden="true"
              />
              <span className="text-base leading-7 text-black/75">{reason}</span>
            </li>
          ))}
        </ul>

        <form className="space-y-4" onSubmit={handleSubscribe}>
          <span className="inline-flex bg-[var(--blue)] px-3 py-1 text-xs font-semibold uppercase tracking-normal text-white">
            Rejoindre les archives
          </span>
          <div className="flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="votre@courriel.com"
              aria-label="Votre courriel"
              className="min-h-12 w-full border border-black/25 bg-white/40 px-4 py-3 text-base text-black outline-none transition placeholder:text-black/40 focus:border-[var(--blue)] focus:bg-white/70 focus-visible:ring-2 focus-visible:ring-[var(--blue)]"
              required
            />
            <Button type="submit" className="shrink-0">
              S’abonner
            </Button>
          </div>
          <p className="text-sm leading-6 text-black/60" aria-live="polite">
            {status || 'Une lecture utile de temps en temps. Pas de spam, désabonnement en un clic.'}
          </p>
        </form>
      </AnimatedSection>
    </section>
  )
}
