import { motion } from 'framer-motion'

export default function Card({ children, className = '' }) {
  return (
    <motion.div
      className={`bg-white rounded-3xl shadow-md p-6 ${className}`}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.10)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
