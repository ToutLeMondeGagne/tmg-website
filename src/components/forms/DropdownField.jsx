import { useId } from 'react'

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropdownField({
  label,
  options = [],
  id,
  className = '',
  labelClassName = '',
  selectClassName = '',
  placeholder,
  required = false,
  value,
  defaultValue,
  ...props
}) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const selectValueProps =
    value !== undefined
      ? { value }
      : defaultValue !== undefined || placeholder
        ? { defaultValue: defaultValue ?? '' }
        : {}

  return (
    <div className={joinClasses('relative pt-3', className)}>
      <label
        htmlFor={selectId}
        className={joinClasses(
          'absolute left-0 top-0 z-10 bg-[var(--blue)] px-3 py-1',
          'text-sm font-medium leading-none text-white',
          labelClassName,
        )}
      >
        {label}
        {required ? <span aria-hidden="true">*</span> : null}
      </label>
      <select
        id={selectId}
        required={required}
        className={joinClasses(
          'min-h-12 w-full border border-[var(--blue)] bg-transparent',
          'px-4 py-4 text-base text-black outline-none transition',
          'focus:bg-white/20 focus-visible:ring-2 focus-visible:ring-[var(--blue)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          selectClassName,
        )}
        {...selectValueProps}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
