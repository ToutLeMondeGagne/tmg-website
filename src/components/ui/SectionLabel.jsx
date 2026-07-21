function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SectionLabel({ children, className = '' }) {
  return (
    <span
      className={joinClasses(
        'inline-flex w-fit self-start items-center bg-[var(--blue)]',
        'px-3 py-1.5 text-xs font-medium leading-none tracking-normal',
        'text-white shadow-[0_0_0_1px_var(--blue)]',
        className,
      )}
    >
      {children}
    </span>
  )
}
