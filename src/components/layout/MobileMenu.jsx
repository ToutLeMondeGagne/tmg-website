import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { serviceLinks } from './serviceLinks'

const mobileLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'PME', to: '/pme' },
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
  const panelRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handlePointerDown = (event) => {
      const isInsideButton = menuRef.current?.contains(event.target)
      const isInsidePanel = panelRef.current?.contains(event.target)

      if (!isInsideButton && !isInsidePanel) {
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
      document.body.style.overflow = previousBodyOverflow
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative z-[100] md:hidden" ref={menuRef}>
      <button
        type="button"
        className="relative z-[120] inline-flex h-12 w-12 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
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

      {typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
              {isOpen ? (
                <>
                  <motion.div
                    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                  />
                  <motion.aside
                    id="mobile-menu-panel"
                    ref={panelRef}
                    className="fixed inset-y-0 right-0 z-[120] flex w-[min(92vw,420px)] flex-col overflow-y-auto overscroll-contain border-l border-white/15 bg-[#07111f] px-6 pb-8 pt-24 text-white shadow-[-28px_0_90px_rgba(0,0,0,0.45)]"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={panelVariants}
                    transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation mobile"
                  >
                    <button
                      type="button"
                      className="absolute right-5 top-6 inline-flex h-12 w-12 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--green)]"
                      aria-label="Fermer le menu"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative h-5 w-5" aria-hidden="true">
                        <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rotate-45 bg-white" />
                        <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 -rotate-45 bg-white" />
                      </span>
                    </button>

                    <motion.div
                      className="flex flex-col gap-1"
                      variants={listVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      {mobileLinks.map((link) => (
                        <motion.div key={link.to} variants={linkVariants}>
                          <Link
                            to={link.to}
                            className="block border-b border-white/15 px-1 py-5 text-3xl font-semibold leading-none tracking-normal text-white transition hover:text-[var(--green)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--green)] sm:text-4xl"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </Link>
                          {link.children ? (
                            <div className="my-3 border border-white/15 bg-white/[0.06] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
                              {link.children.map((child) => (
                                <Link
                                  key={child.to}
                                  to={child.to}
                                  className="block border-b border-white/10 px-4 py-4 text-left transition last:border-b-0 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--green)]"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span className="block text-sm font-semibold leading-tight tracking-normal text-white">
                                    {child.label}
                                  </span>
                                  <span className="mt-1 block text-xs leading-5 text-white/62">
                                    {child.description}
                                  </span>
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
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  )
}
