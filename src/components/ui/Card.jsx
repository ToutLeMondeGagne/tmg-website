import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, padding = 'p-6' }) {
  return (
    <motion.div
      className={`group relative overflow-hidden border-t border-black/35 bg-[var(--card)] ${padding} ${className}`}
      whileHover={
        hover
          ? {
              y: -7,
              scale: 1.012,
              backgroundColor: 'rgba(215,215,212,0.94)',
              boxShadow: '0 28px 90px rgba(0, 76, 255, 0.14)',
            }
          : {}
      }
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {hover ? (
        <>
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--blue)] transition-transform duration-500 ease-out group-hover:scale-x-100"
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
