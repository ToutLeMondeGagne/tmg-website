function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ChallengePair({
  problemLabel = 'Problème',
  problemTitle,
  problemText,
  solutionLabel = 'Solution TMG',
  solutionTitle,
  solutionText,
  className = '',
}) {
  return (
    <div
      className={joinClasses(
        'group/challenge grid gap-4 lg:grid-cols-[minmax(0,1fr)_3.25rem_minmax(0,1fr)] lg:items-stretch',
        className,
      )}
    >
      <article className="relative min-w-0 overflow-hidden border border-black/20 bg-[var(--card)] p-6 text-left text-black transition duration-300 group-hover/challenge:-translate-y-1 group-hover/challenge:border-red-500/50 group-hover/challenge:bg-white/18 group-hover/challenge:shadow-[0_24px_70px_rgba(255,72,92,0.1)] sm:p-8">
        <span className="mb-3 block text-sm font-medium uppercase text-red-500">
          {problemLabel}
        </span>
        <h3 className="mb-4 text-2xl font-semibold leading-tight text-black">
          {problemTitle}
        </h3>
        <p className="text-base leading-7 text-black/70 sm:text-lg sm:leading-8">
          {problemText}
        </p>
      </article>

      <div className="flex items-center justify-center">
        <span
          className="flex h-11 w-11 items-center justify-center border border-[var(--blue)] bg-[var(--bg)] text-xl font-medium text-[var(--blue)] shadow-[0_12px_38px_rgba(0,76,255,0.12)] transition duration-300 group-hover/challenge:scale-110 group-hover/challenge:bg-[var(--blue)] group-hover/challenge:text-white lg:h-12 lg:w-12"
          aria-hidden="true"
        >
          <span className="rotate-90 lg:rotate-0">→</span>
        </span>
      </div>

      <article className="relative min-w-0 overflow-hidden border border-black/20 bg-[var(--card)] p-6 text-left text-black transition duration-300 group-hover/challenge:-translate-y-1 group-hover/challenge:border-[var(--blue)] group-hover/challenge:bg-white/20 group-hover/challenge:shadow-[0_28px_80px_rgba(0,76,255,0.16)] sm:p-8">
        <span className="mb-3 block text-sm font-medium uppercase text-[var(--blue)]">
          {solutionLabel}
        </span>
        <h3 className="mb-4 text-2xl font-semibold leading-tight text-black">
          {solutionTitle}
        </h3>
        <p className="text-base leading-7 text-black/70 sm:text-lg sm:leading-8">
          {solutionText}
        </p>
      </article>
    </div>
  )
}
