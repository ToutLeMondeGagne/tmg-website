import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import tmgLogo from '../../assets/logos/tmg-logo.png'
import MobileMenu from './MobileMenu'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Stagiaires', to: '/stage' },
  { label: 'Contact', to: '/contact' },
]

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

const navItemBaseClasses = 'px-2 py-2 text-sm font-medium tracking-normal transition duration-200'

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
        navItemBaseClasses,
        'hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2',
        'focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]',
        isActive ? 'text-[var(--blue)]' : 'text-black',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {link.label}
    </Link>
  )
}


export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false)

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
        'fixed inset-x-0 top-0 z-50 border-b border-black/15',
        'bg-[var(--bg)]/82 backdrop-blur-xl transition-shadow duration-300',
        hasScrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.08)]' : 'shadow-none',
      )}
    >
      <nav className="mx-auto flex h-24 w-full max-w-[1820px] items-center justify-between px-5 sm:px-8 lg:px-16">
        <Link
          to="/"
          className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
          aria-label="TMG accueil"
        >
          <img
            src={tmgLogo}
            alt=""
            width="720"
            height="356"
            className="h-12 w-auto max-w-[10rem] object-contain sm:h-14 sm:max-w-[12rem]"
            decoding="async"
            fetchPriority="high"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavItem key={link.to} link={link} />
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-normal text-[var(--blue)]">
            <span className="h-1.5 w-1.5 bg-[var(--green)]" aria-hidden="true" />
            Places ouvertes - automne 2026
          </span>
          <Link
            to="/contact"
            className="border border-[var(--blue)] bg-[var(--blue)] px-5 py-3 text-xs font-medium tracking-normal !text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
          >
            Lancer un projet
          </Link>
        </div>

        <MobileMenu />
      </nav>
    </header>
  )
}
