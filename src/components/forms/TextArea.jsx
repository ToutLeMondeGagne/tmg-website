import { useId } from 'react'

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TextArea({
  label,
  id,
  className = '',
  labelClassName = '',
  textareaClassName = '',
  required = false,
  rows = 4,
  ...props
}) {
  const generatedId = useId()
  const textareaId = id ?? generatedId

  return (
    <div className={joinClasses('relative pt-3', className)}>
      <label
        htmlFor={textareaId}
        className={joinClasses(
          'absolute left-0 top-0 z-10 bg-[var(--blue)] px-3 py-1',
          'text-sm font-medium leading-none text-white',
          labelClassName,
        )}
      >
        {label}
        {required ? <span aria-hidden="true">*</span> : null}
      </label>
      <textarea
        id={textareaId}
        required={required}
        rows={rows}
        className={joinClasses(
          'min-h-28 w-full resize-y border border-[var(--blue)] bg-transparent',
          'px-4 py-4 text-base text-black outline-none transition',
          'placeholder:text-black/45 focus:bg-white/20',
          'focus-visible:ring-2 focus-visible:ring-[var(--blue)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          textareaClassName,
        )}
        {...props}
      />
    </div>
  )
}
