import {
  buttonBaseClasses,
  buttonDisabledClasses,
  buttonVariants,
} from './buttonVariants'

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
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
        {children}
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
      {children}
    </button>
  )
}
