import { Link } from 'react-router-dom'
import { SITE_EMAIL, SITE_NAME, SITE_URL } from '../../data/seo'
import tmgLogo from '../../assets/logos/tmg-logo.png'

const footerLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Stagiaires', to: '/stage' },
  { label: 'Contact', to: '/contact' },
]

const contactLinks = [
  { label: SITE_EMAIL, href: `mailto:${SITE_EMAIL}` },
  { label: 'Instagram', href: 'https://www.instagram.com/tout_lemondegagne?igsh=eGVqamFjNm16djFs&utm_source=qr' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/tout-le-monde-gagne/?lipi=urn%3Ali%3Apage%3Ad_flagship3_messaging_conversation_detail%3BzIWNlbE4QSqRuxagcK8Udw%3D%3D',
  },
]

export default function Footer() {
  return (
    <footer
      className="border-t border-black/20 bg-[var(--bg)] text-black"
      itemScope
      itemType="https://schema.org/ProfessionalService"
    >
      <meta itemProp="name" content={SITE_NAME} />
      <link itemProp="url" href={SITE_URL} />
      <div className="mx-auto grid w-full max-w-[1820px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-16 lg:py-16">
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
            aria-label="TMG accueil"
          >
            <img
              src={tmgLogo}
              alt=""
              width="720"
              height="356"
              className="h-20 w-auto max-w-[15rem] object-contain"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <p className="max-w-md text-sm leading-7 text-black/65" itemProp="description">
            TMG accompagne les PME, OBNL et équipes ambitieuses avec des
            stratégies marketing, des sites web et des expériences numériques
            pensées pour créer de la valeur durable.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-medium tracking-normal text-[var(--blue)]">
            Navigation
          </h2>
          <nav className="flex flex-col items-start gap-3" aria-label="Navigation footer">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-black/65 transition hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-medium tracking-normal text-[var(--blue)]">
            Contact
          </h2>
          <address className="flex flex-col items-start gap-3 not-italic">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                itemProp={link.label === SITE_EMAIL ? 'email' : undefined}
                className="text-sm text-black/65 transition hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
                target={link.href?.startsWith('http') ? '_blank' : undefined}
                rel={link.href?.startsWith('http') ? 'noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
            {/* City/province removed as requested */}
          </address>
        </div>
      </div>

      <div className="border-t border-black/20 px-5 py-5 text-center text-xs font-medium tracking-normal text-black/50 sm:px-8 lg:px-16">
        © TMG - Tout le Monde Gagne
      </div>
    </footer>
  )
}
