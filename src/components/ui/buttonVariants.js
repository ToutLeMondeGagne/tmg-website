export const buttonBaseClasses = [
  'inline-flex items-center justify-center gap-2',
  'border border-[var(--blue)] px-5 py-3 text-sm font-medium uppercase leading-none tracking-[-0.01em]',
  'transition duration-200 ease-out',
  'hover:-translate-y-0.5 active:translate-y-0',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]',
]

export const buttonDisabledClasses = [
  'disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0',
  'aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:hover:translate-y-0',
]

export const buttonVariants = {
  primary: 'bg-[var(--blue)] text-white hover:bg-blue-700',
  secondary: 'border-[var(--green)] bg-[var(--green)] text-black hover:bg-lime-300',
  outline: 'bg-transparent text-[var(--blue)] hover:bg-[var(--blue)] hover:text-white',
  ghost: 'border-transparent bg-transparent text-black hover:border-black/20 hover:bg-black/5',
}
