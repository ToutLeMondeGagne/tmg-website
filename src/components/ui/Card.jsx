import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, padding = 'p-6' }) {
  return (
    <motion.div
      className={`border-t border-black/35 bg-[var(--card)] ${padding} ${className}`}
      whileHover={hover ? { y: -4, backgroundColor: 'rgba(215,215,212,0.92)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
