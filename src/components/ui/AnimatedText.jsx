import { motion } from 'framer-motion'

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AnimatedText({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
}) {
  return (
    <motion.span
      className={joinClasses('inline-block', className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  )
}
