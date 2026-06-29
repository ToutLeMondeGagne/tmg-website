import { PageContainer } from '../components/layout'
import { ContactForm } from '../components/forms'
import RelatedLinks from '../components/seo/RelatedLinks'
import { useSiteContent } from '../context/useSiteContent'
import { AnimatedText } from '../components/ui'
import { SITE_LOCATION } from '../data/seo'
import { socialLinks } from '../data/socialLinks'

export default function Contact() {
  const { content } = useSiteContent()
  const { contact, global } = content

  return (
    <main>
      <PageContainer>
        <section className="grid min-h-[34rem] gap-10 border-b border-black/25 py-16 text-left lg:grid-cols-[0.68fr_0.32fr] lg:items-center">
          <div className="space-y-6">
            <span className="text-base font-medium uppercase italic text-[var(--blue)]">
              {contact.hero.label}
            </span>
            <AnimatedText
              as="h1"
              split="words"
              className="max-w-4xl text-[clamp(2.6rem,13vw,4.6rem)] font-medium leading-[0.92] tracking-normal text-black sm:text-[clamp(3.8rem,8vw,8rem)]"
            >
              {contact.hero.title}
            </AnimatedText>
          </div>
          <div className="flex items-end justify-start gap-5 text-sm font-medium uppercase text-black lg:justify-end">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <section className="grid gap-12 py-16 text-left lg:grid-cols-[0.42fr_0.58fr]">
          <aside className="flex flex-col justify-between gap-12 lg:min-h-[42rem]">
            <div className="max-w-md space-y-6">
              <AnimatedText as="p" className="text-2xl leading-8 text-black/80">
                {contact.sidebar.body}
              </AnimatedText>
              <AnimatedText
                as="p"
                delay={0.1}
                className="text-base leading-7 text-black/60"
              >
                {contact.sidebar.note}
              </AnimatedText>
            </div>
            <div className="space-y-3 text-sm text-black/70">
              <p className="font-medium uppercase text-black">{contact.sidebar.coordLabel}</p>
              <a
                href={`mailto:${global.contactEmail}`}
                className="font-medium uppercase text-[var(--blue)] transition hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
              >
                {global.contactEmail}
              </a>
              <a
                href="https://maps.google.com/?q=Montreal%2C%20Quebec"
                className="block text-black/65 transition hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
              >
                {SITE_LOCATION}
              </a>
              <p className="max-w-sm leading-6 text-black/55">
                {contact.sidebar.locationDesc}
              </p>
            </div>
          </aside>

          <ContactForm />
        </section>

        <RelatedLinks />
      </PageContainer>
    </main>
  )
}
