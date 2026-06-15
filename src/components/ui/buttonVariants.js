export const buttonBaseClasses = [
  'inline-flex items-center justify-center gap-2',
  'rounded-md px-5 py-3 text-sm font-semibold leading-none',
  'transition duration-200 ease-out',
  'hover:scale-[1.02] active:scale-[0.98]',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black',
]

export const buttonDisabledClasses = [
  'disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100',
  'aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:hover:scale-100',
]

export const buttonVariants = {
  primary: 'bg-black text-white hover:bg-neutral-800',
  secondary: 'bg-[#8CC63F] text-black hover:bg-[#7DB337]',
  outline: 'border border-black bg-transparent text-black hover:bg-black hover:text-white',
  ghost: 'bg-transparent text-black hover:bg-neutral-100',
}
