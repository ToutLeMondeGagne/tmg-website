import { motion, useReducedMotion } from 'framer-motion'

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

const defaultEase = [0.22, 1, 0.36, 1]

const textVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(3px)' },
  visible: ({ delay, duration }) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay, duration, ease: defaultEase },
  }),
}

const wordContainerVariants = {
  hidden: {},
  visible: ({ delay, stagger }) => ({
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  }),
}

const wordVariants = {
  hidden: { opacity: 0, y: '105%', filter: 'blur(4px)' },
  visible: ({ duration }) => ({
    opacity: 1,
    y: '0%',
    filter: 'blur(0px)',
    transition: { duration, ease: defaultEase },
  }),
}

export default function AnimatedText({
  children,
  as = 'span',
  className = '',
  delay = 0,
  duration = 0.6,
  split = false,
  stagger = 0.035,
  once = true,
  amount = 0.4,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = motion[as] ?? motion.span
  const viewport = { once, amount, margin: '0px 0px -10% 0px' }

  if (shouldReduceMotion) {
    return (
      <MotionTag className={className} {...props}>
        {children}
      </MotionTag>
    )
  }

  if (split === 'words' && typeof children === 'string') {
    const words = children.trim().split(/\s+/)

    return (
      <MotionTag
        className={joinClasses('inline-block', className)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={wordContainerVariants}
        custom={{ delay, stagger }}
        aria-label={children}
        {...props}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-baseline"
            aria-hidden="true"
          >
            <motion.span
              className="inline-block"
              variants={wordVariants}
              custom={{ duration }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? '\u00a0' : ''}
          </span>
        ))}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={joinClasses('inline-block', className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={textVariants}
      custom={{ delay, duration }}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
