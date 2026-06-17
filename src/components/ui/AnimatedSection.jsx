import { motion, useReducedMotion } from 'framer-motion'

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

const sectionVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.985 },
  visible: ({ delay, duration, staggerChildren }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren,
    },
  }),
}

export default function AnimatedSection({
  children,
  as = 'div',
  className = '',
  delay = 0,
  duration = 0.65,
  staggerChildren = 0.06,
  once = true,
  amount = 0.08,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (shouldReduceMotion) {
    return (
      <MotionTag className={className} {...props}>
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={joinClasses(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: '0px 0px -12% 0px' }}
      variants={sectionVariants}
      custom={{ delay, duration, staggerChildren }}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
