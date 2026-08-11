import { PageContainer } from '../layout'
import { AnimatedText, Button, SectionLabel } from '../ui'

const defaultTitleClass =
  'max-w-4xl text-[clamp(2.4rem,9vw,4.4rem)] font-medium leading-[0.94] tracking-normal text-white sm:text-[clamp(3rem,6vw,6rem)]'

// Coquille de hero sombre partagee par toutes les pages internes, sur le
// modele du hero de la page d'accueil (degrade marine + overlay).
export default function PageHero({
  label,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  aside,
  minHeightClass = 'min-h-[56svh]',
  titleClassName = defaultTitleClass,
}) {
  return (
    <section className="relative overflow-hidden border-b border-black/20 text-left">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 12% 0%, rgba(0,76,255,0.38), transparent 55%), linear-gradient(160deg, #0a1224 0%, #101d3d 45%, #0a1224 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/40"
        aria-hidden="true"
      />

      <PageContainer>
        <div
          className={`relative grid gap-10 py-16 sm:py-20 ${minHeightClass} ${
            aside ? 'lg:grid-cols-[0.5fr_0.5fr] lg:items-center' : ''
          }`}
        >
          <div className="flex min-w-0 flex-col justify-end gap-7">
            {label ? <SectionLabel>{label}</SectionLabel> : null}
            <AnimatedText as="h1" split="words" className={titleClassName}>
              {title}
            </AnimatedText>
            {subtitle ? (
              <AnimatedText as="p" delay={0.16} className="max-w-xl text-xl leading-8 text-white/75">
                {subtitle}
              </AnimatedText>
            ) : null}
            {primaryCta || secondaryCta ? (
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {primaryCta ? (
                  <Button href={primaryCta.href} className="w-full sm:w-auto">
                    {primaryCta.label}
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button href={secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
                    {secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>

          {aside ? <div className="min-w-0">{aside}</div> : null}
        </div>
      </PageContainer>
    </section>
  )
}
