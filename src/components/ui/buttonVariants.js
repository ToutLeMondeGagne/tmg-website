export const buttonBaseClasses = [
  'group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden',
  'border border-[var(--blue)] px-5 py-3 text-sm font-medium uppercase leading-none tracking-normal',
  'transition duration-300 ease-out',
  'hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,76,255,0.16)] active:translate-y-0 active:scale-[0.98]',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]',
]

export const buttonDisabledClasses = [
  'disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0',
  'aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:hover:translate-y-0',
]

export const buttonVariants = {
  primary: 'bg-[var(--blue)] !text-white hover:bg-blue-700',
  secondary: 'border-[var(--green)] bg-[var(--green)] text-black hover:bg-lime-300',
  outline: 'bg-transparent text-[var(--blue)] hover:bg-[var(--blue)] hover:!text-white',
  ghost: 'border-transparent bg-transparent text-black hover:border-black/20 hover:bg-black/5',
}
