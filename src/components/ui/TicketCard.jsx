import { motion } from 'framer-motion'

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TicketCard({
  title,
  subtitle,
  href,
  className = '',
}) {
  const Component = href ? motion.a : motion.div
  const componentProps = href ? { href } : {}
  const ticketTitle = title || 'Première rencontre gratuite'
  const ticketSubtitle =
    subtitle ||
    'Un appel de 30 minutes pour clarifier votre projet, vos priorités et la meilleure prochaine étape.'

  return (
    <Component
      {...componentProps}
      className={joinClasses(
        'group relative isolate mx-auto block w-full max-w-[31rem] cursor-pointer overflow-visible',
        'text-white outline-none md:max-w-none',
        'focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4',
        'focus-visible:ring-offset-[var(--bg)]',
        className,
      )}
      whileHover={{ scale: 1.01, rotateX: 1.5, rotateY: -1.5, y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ transformPerspective: 900, transformStyle: 'preserve-3d' }}
    >
      <span
        className="pointer-events-none absolute inset-x-4 top-3 bottom-2 z-0 rotate-[-2deg] border border-[var(--blue)] bg-[#0632a8] opacity-80 shadow-[0_24px_70px_rgba(0,0,0,0.2)] transition duration-500 group-hover:translate-y-1 group-hover:rotate-[-3deg]"
        aria-hidden="true"
      />
      <span
        className="absolute -left-6 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full bg-[var(--bg)] md:h-14 md:w-14"
        aria-hidden="true"
      />
      <span
        className="absolute -right-6 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full bg-[var(--bg)] md:h-14 md:w-14"
        aria-hidden="true"
      />

      <span className="relative z-10 grid min-h-[23rem] grid-cols-[minmax(0,1fr)_5.4rem] overflow-hidden border border-[var(--blue)] bg-[#004cff] shadow-[0_30px_90px_rgba(0,0,0,0.24)] md:min-h-[25rem] md:grid-cols-[minmax(0,1fr)_18rem]">
        <span
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[length:25%_100%,100%_72px] opacity-65"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(183,255,70,0.24),transparent_28%),linear-gradient(135deg,#08152f_0%,#004cff_48%,#21a3ff_72%,#b7ff46_100%)]"
          aria-hidden="true"
        />

        <span className="relative z-10 flex min-h-0 flex-col justify-between p-5 sm:p-6 md:p-10">
          <span className="flex items-start justify-between gap-3 sm:gap-5">
            <span>
              <span className="block text-xs font-semibold tracking-normal text-[var(--green)]">
                Billet d&apos;accès
              </span>
              <span className="mt-1 block text-[0.7rem] font-medium tracking-normal text-white/70 sm:text-sm">
                TMG / Première rencontre
              </span>
            </span>
            <span className="whitespace-nowrap border border-white/30 px-2 py-1.5 text-[0.65rem] font-semibold tracking-normal text-white sm:px-3 sm:py-2 sm:text-xs">
              Gratuit
            </span>
          </span>

          <span className="space-y-3 py-6 md:space-y-5 md:py-8">
            <span className="block max-w-4xl text-[2.05rem] font-semibold uppercase leading-[0.86] tracking-normal text-white sm:text-5xl md:text-7xl">
              {ticketTitle}
            </span>
            <span className="block max-w-2xl text-sm leading-5 text-white/82 sm:text-base sm:leading-6 md:text-lg md:leading-7">
              {ticketSubtitle}
            </span>
          </span>

          <span className="grid grid-cols-3 gap-3 border-t border-white/30 pt-4 text-[0.65rem] font-semibold tracking-normal text-white/76 sm:pt-5 sm:text-xs">
            <span>
              <span className="block text-[var(--green)]">Durée</span>
              30 minutes
            </span>
            <span>
              <span className="block text-[var(--green)]">Prix</span>
              0$
            </span>
            <span>
              <span className="block text-[var(--green)]">Format</span>
              Appel découverte
            </span>
          </span>
        </span>

        <span
          className="absolute bottom-5 right-[5.4rem] top-5 z-20 border-l border-dashed border-white/35 md:bottom-8 md:right-[18rem] md:top-8"
          aria-hidden="true"
        />

        <span className="relative z-10 flex min-h-0 flex-col justify-between border-l border-dashed border-white/35 p-3 sm:p-5 md:p-8">
          <span className="space-y-4 md:space-y-6">
            <span>
              <span className="block text-[0.65rem] font-semibold tracking-normal text-white/65 md:text-xs">
                Ticket no.
              </span>
              <span className="mt-1 block font-mono text-sm font-semibold tracking-normal text-white md:text-lg">
                TMG-0001
              </span>
            </span>
            <span>
              <span className="block text-[0.65rem] font-semibold tracking-normal text-white/65 md:text-xs">
                Admission
              </span>
              <span className="mt-1 block text-sm font-semibold tracking-normal text-[var(--green)] md:text-lg">
                1 projet
              </span>
            </span>
          </span>

          <span className="my-5 block h-20 w-full overflow-hidden bg-[repeating-linear-gradient(90deg,#b7ff46_0_3px,transparent_3px_7px,#b7ff46_7px_9px,transparent_9px_14px)] opacity-95 md:my-8 md:h-28">
            <span className="sr-only">Code billet</span>
          </span>

          <span className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-4">
            <span>
              <span className="block text-[0.65rem] font-semibold tracking-normal text-white/65 md:text-xs">
                Valable
              </span>
              <span className="mt-1 block text-xs font-semibold tracking-normal text-white md:text-sm">
                Cette semaine
              </span>
            </span>
            <span className="text-xs font-semibold tracking-normal text-white transition group-hover:text-[var(--green)] md:text-right md:text-sm">
              Réserver
            </span>
          </span>
        </span>
      </span>
    </Component>
  )
}
