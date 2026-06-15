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

  return (
    <Component
      href={href}
      className={joinClasses(
        'group relative flex min-h-56 w-full cursor-pointer overflow-hidden rounded-[2rem]',
        'bg-gradient-to-br from-slate-950 via-[#0F4C81] to-[#8CC63F]',
        'p-8 text-white shadow-[0_24px_80px_rgba(8,6,13,0.24)]',
        'outline-none transition-colors duration-300',
        'focus-visible:ring-2 focus-visible:ring-[#8CC63F] focus-visible:ring-offset-4',
        'focus-visible:ring-offset-[var(--bg)]',
        className,
      )}
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ transformPerspective: 900, transformStyle: 'preserve-3d' }}
    >
      <span
        className="absolute -left-6 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-[var(--bg)]"
        aria-hidden="true"
      />
      <span
        className="absolute -right-6 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-[var(--bg)]"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-6 left-16 top-6 border-l border-dashed border-white/25"
        aria-hidden="true"
      />
      <span
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.18),transparent_42%)] opacity-80"
        aria-hidden="true"
      />

      <span className="relative z-10 ml-12 flex max-w-2xl flex-col justify-end gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
          TMG Premium
        </span>
        <span className="text-3xl font-semibold leading-tight text-white md:text-4xl">
          {title}
        </span>
        {subtitle ? (
          <span className="max-w-xl text-base leading-7 text-white/78">
            {subtitle}
          </span>
        ) : null}
      </span>
    </Component>
  )
}
