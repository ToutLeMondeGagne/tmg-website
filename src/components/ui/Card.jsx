import { motion } from 'framer-motion'

const variants = {
  default: {
    className: 'border-t border-black/35 bg-[var(--card)] text-black',
    hover: {
      backgroundColor: 'rgba(215,215,212,0.94)',
      boxShadow: '0 28px 90px rgba(0, 76, 255, 0.14)',
    },
    line: 'bg-[var(--blue)]',
  },
  blue: {
    className:
      'tmg-blue-card border border-[rgba(0,76,255,0.45)] bg-[linear-gradient(135deg,#07111f_0%,#0b2f86_52%,#004cff_100%)] text-white shadow-[0_24px_70px_rgba(0,0,0,0.18)]',
    hover: {
      boxShadow: '0 30px 95px rgba(0, 76, 255, 0.24)',
    },
    line: 'bg-[var(--green)]',
  },
}

export default function Card({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  variant = 'default',
}) {
  const currentVariant = variants[variant] ?? variants.default

  return (
    <motion.div
      className={`group relative overflow-hidden ${currentVariant.className} ${padding} ${className}`}
      whileHover={
        hover
          ? {
              y: -7,
              scale: 1.012,
              ...currentVariant.hover,
            }
          : {}
      }
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {hover ? (
        <>
          <span
            className={`pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 ${currentVariant.line} transition-transform duration-500 ease-out group-hover:scale-x-100`}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 opacity-0 blur-md transition duration-700 group-hover:translate-x-[420%] group-hover:opacity-100"
            aria-hidden="true"
          />
        </>
      ) : null}
      <div className="contents">{children}</div>
    </motion.div>
  )
}
