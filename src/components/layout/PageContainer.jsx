function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PageContainer({ children, className = '' }) {
  return (
    <div className={joinClasses('mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
