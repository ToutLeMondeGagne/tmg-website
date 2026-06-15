export default function Button({ children, variant = 'primary', ...props }) {
  return (
    <button data-variant={variant} {...props}>
      {children}
    </button>
  )
}
