import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { serviceLinks } from './serviceLinks'

const mobileLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'PME', to: '/services#pme' },
  { label: 'OBNL', to: '/obnl' },
  { label: 'Services', to: '/services', children: serviceLinks },
  { label: 'Stagiaires', to: '/stage' },
  { label: 'Contact', to: '/contact' },
]

const panelVariants = {
  closed: { opacity: 0, x: '100%' },
  open: { opacity: 1, x: 0 },
}

const listVariants = {
  closed: {},
  open: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
}

const linkVariants = {
  closed: { opacity: 0, x: 24 },
  open: { opacity: 1, x: 0 },
}

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
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
    <div className="md:hidden" ref={menuRef}>
      <button
        type="button"
        className="relative z-[70] inline-flex h-12 w-12 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
        aria-controls="mobile-menu-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="sr-only">{isOpen ? 'Fermer' : 'Menu'}</span>
        <span className="relative h-4 w-5" aria-hidden="true">
          <span
            className={joinClasses(
              'absolute left-0 top-0 h-0.5 w-5 bg-white transition duration-200',
              isOpen ? 'translate-y-[7px] rotate-45' : '',
            )}
          />
          <span
            className={joinClasses(
              'absolute left-0 top-[7px] h-0.5 w-5 bg-white transition duration-200',
              isOpen ? 'opacity-0' : 'opacity-100',
            )}
          />
          <span
            className={joinClasses(
              'absolute bottom-0 left-0 h-0.5 w-5 bg-white transition duration-200',
              isOpen ? '-translate-y-[7px] -rotate-45' : '',
            )}
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-menu-panel"
              className="fixed bottom-0 right-0 top-0 z-[60] flex w-[min(88vw,390px)] flex-col border-l border-black/15 bg-[var(--bg)] px-6 py-28 shadow-[-24px_0_80px_rgba(0,0,0,0.16)]"
              initial="closed"
              animate="open"
              exit="closed"
              variants={panelVariants}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation mobile"
            >
              <motion.div
                className="flex flex-col gap-2"
                variants={listVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {mobileLinks.map((link) => (
                  <motion.div key={link.to} variants={linkVariants}>
                    <Link
                      to={link.to}
                      className="block border-b border-black/15 px-1 py-5 text-4xl font-semibold uppercase leading-none tracking-normal text-black transition hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.children ? (
                      <div className="border-b border-black/15 py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className="block px-4 py-3 text-base font-medium uppercase leading-tight text-black/70 transition hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </motion.div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
