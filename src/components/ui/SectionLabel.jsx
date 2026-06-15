function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SectionLabel({ children, className = '' }) {
  return (
    <span
      className={joinClasses(
        'inline-flex w-fit items-center rounded-full bg-[#8CC63F]',
        'px-3 py-1 text-xs font-bold uppercase leading-none tracking-[0.18em]',
        'text-black',
        className,
      )}
    >
      {children}
    </span>
  )
}
