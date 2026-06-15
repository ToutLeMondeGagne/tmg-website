import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, padding = 'p-6' }) {
  return (
    <motion.div
      className={`bg-white rounded-3xl shadow-md ${padding} ${className}`}
      whileHover={hover ? { y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.10)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
