import { useEffect, useRef } from 'react'
import { PageContainer } from '../components/layout'
import { InternshipForm } from '../components/forms'
import RelatedLinks from '../components/seo/RelatedLinks'
import { useSiteContent } from '../context/useSiteContent'
import { AnimatedSection, AnimatedText, Button, Card, SectionLabel } from '../components/ui'

function CarouselArrow({ direction, onClick }) {
  const isPrev = direction === 'prev'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Photos précédentes' : 'Photos suivantes'}
      className="flex h-11 w-11 shrink-0 items-center justify-center border border-black/20 bg-[var(--bg)] text-black transition-colors hover:border-[var(--blue)] hover:bg-[var(--blue)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
        {isPrev ? <polyline points="15 6 9 12 15 18" /> : <polyline points="9 6 15 12 9 18" />}
      </svg>
    </button>
  )
}

// Carrousel en boucle infinie : la liste de photos est répétée 3 fois, et on
// démarre au début de la copie du milieu. Chaque clic — next ou prev —
// avance d'exactement un pas, toujours le même, jamais de grand saut. Une
// fois le scroll retombé (après le petit délai de settle), si on a dérivé
// trop loin de la copie du milieu, on se replace instantanément d'un « jeu »
// complet de photos : comme les trois copies sont identiques, le saut est
// invisible.
function GalleryCarousel({ photos }) {
  const trackRef = useRef(null)
  const settleTimeoutRef = useRef(null)
  const count = photos.length
  const repeatedPhotos = count > 1 ? [...photos, ...photos, ...photos] : photos

  const getStep = (track) => {
    const tile = track.querySelector('[data-gallery-tile]')
    return tile ? tile.getBoundingClientRect().width + 16 : track.clientWidth * 0.8
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track || count <= 1) return

    track.scrollLeft = getStep(track) * count
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  useEffect(() => () => {
    if (settleTimeoutRef.current) window.clearTimeout(settleTimeoutRef.current)
  }, [])

  const recenter = () => {
    const track = trackRef.current
    if (!track || count <= 1) return

    const oneSetWidth = getStep(track) * count
    if (oneSetWidth <= 0) return

    if (track.scrollLeft < oneSetWidth * 0.5) {
      track.scrollLeft += oneSetWidth
    } else if (track.scrollLeft >= oneSetWidth * 1.5) {
      track.scrollLeft -= oneSetWidth
    }
  }

  const handleScroll = () => {
    if (settleTimeoutRef.current) window.clearTimeout(settleTimeoutRef.current)
    settleTimeoutRef.current = window.setTimeout(recenter, 120)
  }

  const scrollByAmount = (direction) => {
    const track = trackRef.current
    if (!track) return

    const step = getStep(track)
    track.scrollBy({ left: direction === 'prev' ? -step : step, behavior: 'smooth' })
  }

  return (
    <div className="flex items-center gap-3">
      <CarouselArrow direction="prev" onClick={() => scrollByAmount('prev')} />

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex min-w-0 flex-1 gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {repeatedPhotos.map((photo, index) => (
          <div
            key={`${photo.id || photo.url}-${index}`}
            data-gallery-tile
            className="aspect-square w-[46%] shrink-0 sm:w-[31%] lg:w-[23%]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="h-full w-full border border-black/15 object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      <CarouselArrow direction="next" onClick={() => scrollByAmount('next')} />
    </div>
  )
}

export default function Stage() {
  const { content } = useSiteContent()
  const { stage, global } = content
  const stageContactEmail = stage.application.contactEmail || global.contactEmail
  const galleryPhotos = stage.gallery.photos || []

  return (
    <main>
      <PageContainer>
        <section className="grid gap-8 border-b border-black/20 py-20 text-left lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div className="min-w-0 space-y-7">
            <SectionLabel>{stage.hero.label}</SectionLabel>
            <AnimatedText
              as="h1"
              split="words"
              className="text-[clamp(2.4rem,11vw,4.5rem)] font-semibold leading-[0.86] tracking-normal text-black sm:text-[clamp(3rem,6vw,6.6rem)]"
            >
              {stage.hero.title}
            </AnimatedText>
            <AnimatedText as="p" delay={0.16} className="text-xl leading-8 text-black/70">
              {stage.hero.subtitle}
            </AnimatedText>
            <Button href="#candidature" variant="secondary">
              {stage.hero.cta}
            </Button>
          </div>

          <div className="space-y-5">
            <h2 className="text-sm font-medium text-[var(--blue)]">
              {stage.process.label}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {stage.process.items.map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.05}>
                  <Card className="min-h-52 text-left text-black" padding="p-6">
                    <span className="mb-7 flex h-10 w-10 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-sm font-medium text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                      0{index + 1}
                    </span>
                    <h3 className="mb-4 text-2xl font-semibold leading-tight text-black">
                      {item.title}
                    </h3>
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
          <div className="mb-6 max-w-3xl space-y-3">
            <SectionLabel>{stage.gallery.label}</SectionLabel>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.05] tracking-normal text-black"
            >
              {stage.gallery.title}
            </AnimatedText>
          </div>

          <AnimatedSection>
            <GalleryCarousel photos={galleryPhotos} />
          </AnimatedSection>
        </section>

        <section className="border-b border-black/20 py-20 text-left">
          <div className="mb-12 max-w-3xl space-y-5">
            <span className="text-sm font-medium text-[var(--blue)]">
              {stage.benefits.label}
            </span>
            <AnimatedText
              as="h2"
              split="words"
              className="text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-normal text-black"
            >
              {stage.benefits.title}
            </AnimatedText>
            <AnimatedText as="p" delay={0.12} className="text-xl leading-8 text-black/70">
              {stage.benefits.subtitle}
            </AnimatedText>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {stage.benefits.items.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={(index % 3) * 0.06}>
                <Card className="min-h-56 text-left text-black" padding="p-8">
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

        <section
          id="candidature"
          className="grid scroll-mt-32 gap-12 py-16 text-left lg:grid-cols-[0.42fr_0.58fr]"
        >
          <aside className="flex min-w-0 flex-col justify-between gap-12 lg:min-h-[42rem]">
            <div className="min-w-0 space-y-6">
              <span className="text-base font-medium italic text-[var(--blue)]">
                {stage.application.label}
              </span>
              <AnimatedText
                as="h2"
                split="words"
                className="text-[clamp(2.5rem,10vw,4.2rem)] font-medium leading-[0.92] tracking-normal text-black sm:text-[clamp(3rem,5vw,5.4rem)]"
              >
                {stage.application.title}
              </AnimatedText>
              <AnimatedText as="p" delay={0.12} className="max-w-md text-xl leading-8 text-black/70">
                {stage.application.body}
              </AnimatedText>
            </div>
            <div className="space-y-2 text-sm text-black/70">
              <p>{stage.application.contactLabel}</p>
              <a
                href={`mailto:${stageContactEmail}`}
                className="font-medium text-[var(--blue)] transition hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
              >
                {stageContactEmail}
              </a>
            </div>
          </aside>

          <InternshipForm />
        </section>

        <RelatedLinks />
      </PageContainer>
    </main>
  )
}
