import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'PME', to: '/services#pme' },
  { label: 'OBNL', to: '/services#obnl' },
  { label: 'Services', to: '/services' },
  { label: 'Stagiaires', to: '/stage' },
  { label: 'Contact', to: '/contact' },
]

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

function isActiveLink(to, location) {
  const [pathname, hash] = to.split('#')

  if (hash) {
    return location.pathname === pathname && location.hash === `#${hash}`
  }

  return location.pathname === pathname && !location.hash
}

function NavItem({ link, onClick }) {
  const location = useLocation()
  const isActive = isActiveLink(link.to, location)

  return (
    <Link
      to={link.to}
      onClick={onClick}
      className={joinClasses(
        'rounded-full px-3 py-2 text-sm font-semibold transition duration-200',
        'hover:bg-black/5 focus-visible:outline focus-visible:outline-2',
        'focus-visible:outline-offset-2 focus-visible:outline-black',
        isActive ? 'bg-black text-white' : 'text-black',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {link.label}
    </Link>
  )
}

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 8)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return (
    <header
      className={joinClasses(
        'fixed inset-x-0 top-0 z-50 border-b border-black/5',
        'bg-white/82 backdrop-blur-xl transition-shadow duration-300',
        hasScrolled ? 'shadow-[0_12px_40px_rgba(8,6,13,0.10)]' : 'shadow-none',
      )}
    >
      <nav className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          aria-label="TMG accueil"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-black tracking-tight text-white">
            TMG
          </span>
          <span className="hidden text-sm font-extrabold uppercase tracking-[0.18em] text-black sm:block">
            Tout le monde gagne
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavItem key={link.to} link={link} />
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            className="rounded-full bg-[#8CC63F] px-5 py-3 text-sm font-bold text-black shadow-[0_10px_30px_rgba(140,198,63,0.30)] transition duration-200 hover:scale-[1.02] hover:bg-[#7DB337] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Lancer un projet
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-bold text-black transition hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? 'Fermer' : 'Menu'}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={joinClasses(
          'border-t border-black/5 bg-white/95 px-4 pb-5 pt-2 backdrop-blur-xl lg:hidden',
          isOpen ? 'block' : 'hidden',
        )}
      >
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-1 sm:px-2">
          {navLinks.map((link) => (
            <NavItem key={link.to} link={link} onClick={() => setIsOpen(false)} />
          ))}
          <Link
            to="/contact"
            className="mt-3 rounded-full bg-[#8CC63F] px-5 py-3 text-center text-sm font-bold text-black transition duration-200 hover:bg-[#7DB337] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => setIsOpen(false)}
          >
            Lancer un projet
          </Link>
        </div>
      </div>
    </header>
  )
}
