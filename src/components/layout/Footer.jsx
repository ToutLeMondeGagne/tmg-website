import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'PME', to: '/services#pme' },
  { label: 'OBNL', to: '/services#obnl' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

const contactLinks = [
  { label: 'bonjour@toutlemondegagne.ca', href: 'mailto:bonjour@toutlemondegagne.ca' },
  { label: 'Montréal, Québec', href: 'https://maps.google.com/?q=Montreal%2C%20Quebec' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
]

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-black text-white">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8 lg:py-16">
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            aria-label="TMG accueil"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8CC63F] text-sm font-black tracking-tight text-black">
              TMG
            </span>
            <span className="text-sm font-extrabold uppercase tracking-[0.18em]">
              Tout le monde gagne
            </span>
          </Link>
          <p className="max-w-md text-sm leading-7 text-white/70">
            TMG accompagne les PME, OBNL et équipes ambitieuses avec des
            stratégies marketing, des sites web et des expériences numériques
            pensées pour créer de la valeur durable.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white">
            Navigation
          </h2>
          <nav className="flex flex-col items-start gap-3" aria-label="Navigation footer">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-white/70 transition hover:text-[#8CC63F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white">
            Contact
          </h2>
          <address className="flex flex-col items-start gap-3 not-italic">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/70 transition hover:text-[#8CC63F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                target={link.label === 'LinkedIn' ? '_blank' : undefined}
                rel={link.label === 'LinkedIn' ? 'noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </address>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/50 sm:px-6 lg:px-8">
        © TMG - Tout le Monde Gagne
      </div>
    </footer>
  )
}
