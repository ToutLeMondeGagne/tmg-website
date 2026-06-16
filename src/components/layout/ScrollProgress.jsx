import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  if (shouldReduceMotion) {
    return null
  }

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[90] h-1 origin-left bg-[linear-gradient(90deg,var(--blue),var(--green))] shadow-[0_0_24px_rgba(0,76,255,0.35)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
