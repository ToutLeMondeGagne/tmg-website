import {
  buttonBaseClasses,
  buttonDisabledClasses,
  buttonVariants,
} from './buttonVariants'

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ButtonContent({ children }) {
  return (
    <>
      <span
        className="pointer-events-none absolute inset-y-[-20%] -left-1/2 z-0 w-1/3 -skew-x-12 bg-white/35 opacity-0 blur-sm transition duration-700 group-hover:translate-x-[420%] group-hover:opacity-100"
        aria-hidden="true"
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  )
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const variantClasses = buttonVariants[variant] ?? buttonVariants.primary
  const classes = joinClasses(
    ...buttonBaseClasses,
    ...buttonDisabledClasses,
    variantClasses,
    className,
  )

  if (href) {
    const handleClick = (event) => {
      if (disabled) {
        event.preventDefault()
        return
      }

      onClick?.(event)
    }

    return (
      <a
        className={classes}
        href={disabled ? undefined : href}
        onClick={handleClick}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        <ButtonContent>{children}</ButtonContent>
      </a>
    )
  }

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <ButtonContent>{children}</ButtonContent>
    </button>
  )
}
