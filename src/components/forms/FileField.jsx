import { useId } from 'react'

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FileField({
  label,
  id,
  className = '',
  labelClassName = '',
  inputClassName = '',
  hint = '',
  required = false,
  ...props
}) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={joinClasses('pt-3', className)}>
      <label
        htmlFor={inputId}
        className={joinClasses(
          'mb-2 inline-block bg-[var(--blue)] px-3 py-1',
          'text-sm font-medium leading-none text-white',
          labelClassName,
        )}
      >
        {label}
        {required ? <span aria-hidden="true">*</span> : null}
      </label>
      <input
        id={inputId}
        type="file"
        required={required}
        className={joinClasses(
          'block min-h-12 w-full border border-[var(--blue)] bg-transparent',
          'px-4 py-3 text-base text-black outline-none transition',
          'file:mr-4 file:cursor-pointer file:border-0 file:bg-[var(--blue)]',
          'file:px-4 file:py-2 file:text-sm file:font-medium file:text-white',
          'focus-visible:ring-2 focus-visible:ring-[var(--blue)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          inputClassName,
        )}
        {...props}
      />
      {hint ? (
        <p className="mt-2 text-xs leading-5 text-black/50">{hint}</p>
      ) : null}
    </div>
  )
}
