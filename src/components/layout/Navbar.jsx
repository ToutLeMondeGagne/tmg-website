import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import { serviceLinks } from './serviceLinks'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'PME', to: '/pme' },
  { label: 'OBNL', to: '/obnl' },
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
        'px-2 py-2 text-xs font-medium uppercase tracking-normal transition duration-200',
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

function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef(null)
  const isActive = location.pathname.startsWith('/services')

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={joinClasses(
          'px-2 py-2 text-xs font-medium uppercase tracking-normal transition duration-200',
          'hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2',
          'focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]',
          isActive ? 'text-[var(--blue)]' : 'text-black',
        )}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        Services v
      </button>

      {isOpen ? (
        <div
          className="absolute left-1/2 top-full z-50 mt-3 w-80 -translate-x-1/2 border border-black/20 bg-[var(--bg)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.14)]"
          role="menu"
          aria-label="Services"
        >
          {serviceLinks.map((service) => (
            <Link
              key={service.to}
              to={service.to}
              role="menuitem"
              className="block border-b border-black/10 px-4 py-4 text-left transition last:border-b-0 hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
              onClick={() => setIsOpen(false)}
            >
              <span className="block text-sm font-semibold text-black">
                {service.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-black/60">
                {service.description}
              </span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
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
          <span className="flex h-12 min-w-24 items-center justify-center bg-[var(--green)] px-4 text-2xl font-black tracking-normal text-[var(--blue)] shadow-[0_0_0_1px_var(--blue)]">
            TMG
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-normal text-black lg:block">
            Tout le monde gagne
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.slice(0, 3).map((link) => (
            <NavItem key={link.to} link={link} />
          ))}
          <ServicesDropdown />
          {navLinks.slice(3).map((link) => (
            <NavItem key={link.to} link={link} />
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-normal text-[var(--blue)]">
            <span className="h-1.5 w-1.5 bg-[var(--green)]" aria-hidden="true" />
            Places ouvertes - ete 26
          </span>
          <Link
            to="/contact"
            className="border border-[var(--blue)] bg-[var(--blue)] px-5 py-3 text-xs font-medium uppercase tracking-normal text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
          >
            Lancer un projet
          </Link>
        </div>

        <MobileMenu />
      </nav>
    </header>
  )
}
