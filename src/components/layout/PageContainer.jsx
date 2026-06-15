function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PageContainer({ children, className = '' }) {
  return (
    <div className={joinClasses('mx-auto w-full max-w-[1820px] px-5 sm:px-8 lg:px-16', className)}>
      {children}
    </div>
  )
}
