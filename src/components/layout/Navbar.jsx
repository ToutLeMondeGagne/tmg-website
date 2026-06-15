import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MobileMenu from './MobileMenu'

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
        'px-2 py-2 text-xs font-medium uppercase tracking-[-0.01em] transition duration-200',
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
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
          aria-label="TMG accueil"
        >
          <span className="flex h-12 min-w-24 items-center justify-center bg-[var(--green)] px-4 text-2xl font-black tracking-[-0.12em] text-[var(--blue)] shadow-[0_0_0_1px_var(--blue)]">
            TMG
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-[-0.01em] text-black lg:block">
            Tout le monde gagne
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavItem key={link.to} link={link} />
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/contact"
            className="border border-[var(--blue)] bg-[var(--blue)] px-5 py-3 text-xs font-medium uppercase tracking-[-0.01em] text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
          >
            Lancer un projet
          </Link>
        </div>

        <MobileMenu />
      </nav>
    </header>
  )
}
