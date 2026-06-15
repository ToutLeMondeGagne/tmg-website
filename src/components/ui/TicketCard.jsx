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
        'group relative flex min-h-[28rem] w-full cursor-pointer overflow-hidden',
        'border border-black/25 bg-gradient-to-br from-[#101010] via-[#004cff] to-[#b7ff46]',
        'p-8 text-white shadow-[0_28px_90px_rgba(0,0,0,0.18)]',
        'outline-none transition-colors duration-300 md:p-10',
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
        className="absolute -left-7 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-[var(--bg)]"
        aria-hidden="true"
      />
      <span
        className="absolute -right-7 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-[var(--bg)]"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-8 left-20 top-8 border-l border-dashed border-white/30"
        aria-hidden="true"
      />
      <span
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[length:25%_100%,100%_72px] opacity-70"
        aria-hidden="true"
      />

      <span className="relative z-10 ml-10 flex max-w-3xl flex-col justify-end gap-4 md:ml-16">
        <span className="text-xs font-medium uppercase tracking-normal text-white/70">
          TMG Premium
        </span>
        <span className="text-5xl font-semibold uppercase leading-[0.9] tracking-normal text-white md:text-7xl">
          {title}
        </span>
        {subtitle ? (
          <span className="max-w-lg text-base leading-6 text-white/78 md:text-lg">
            {subtitle}
          </span>
        ) : null}
      </span>
    </Component>
  )
}
