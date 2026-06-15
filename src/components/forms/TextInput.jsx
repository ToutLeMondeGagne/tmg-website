import { useId } from 'react'

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TextInput({
  label,
  id,
  className = '',
  labelClassName = '',
  inputClassName = '',
  required = false,
  ...props
}) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={joinClasses('relative pt-3', className)}>
      <label
        htmlFor={inputId}
        className={joinClasses(
          'absolute left-0 top-0 z-10 bg-[var(--blue)] px-3 py-1',
          'text-sm font-medium leading-none text-white',
          labelClassName,
        )}
      >
        {label}
        {required ? <span aria-hidden="true">*</span> : null}
      </label>
      <input
        id={inputId}
        required={required}
        className={joinClasses(
          'min-h-12 w-full border border-[var(--blue)] bg-transparent',
          'px-4 py-4 text-base text-black outline-none transition',
          'placeholder:text-black/45 focus:bg-white/20',
          'focus-visible:ring-2 focus-visible:ring-[var(--blue)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          inputClassName,
        )}
        {...props}
      />
    </div>
  )
}
