import { Link, useLocation } from 'react-router-dom'
import { getRelatedLinksForPath } from '../../data/seo'

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RelatedLinks({
  eyebrow = 'À lire ensuite',
  title = 'Continuez le parcours TMG.',
  links,
  id = 'pages-liees',
  className = '',
}) {
  const location = useLocation()
  const items = links ?? getRelatedLinksForPath(location.pathname)

  if (!items.length) {
    return null
  }

  return (
    <section
      id={id}
      className={joinClasses(
        'border-y border-black/20 py-16 text-left',
        className,
      )}
      aria-labelledby="related-links-title"
    >
      <div className="mb-10 grid gap-5 lg:grid-cols-[0.28fr_1fr] lg:items-end">
        <span className="text-sm font-medium uppercase text-[var(--blue)]">
          {eyebrow}
        </span>
        <h2
          id="related-links-title"
          className="max-w-4xl text-[clamp(2.4rem,5vw,5.4rem)] font-semibold uppercase leading-[0.9] tracking-normal text-black"
        >
          {title}
        </h2>
      </div>

      <nav
        className="grid overflow-hidden border border-black/20 md:grid-cols-3"
        aria-label="Pages liées"
      >
        {items.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            className="group min-h-56 border-b border-r border-black/15 bg-[var(--card)] p-6 text-black transition duration-200 last:border-b-0 hover:bg-black/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--blue)] md:border-b-0"
          >
            <span className="mb-12 block text-sm font-medium text-black/55">
              0{index + 1}
            </span>
            <span className="block text-3xl font-semibold leading-none text-black">
              {item.title}
            </span>
            <span className="mt-5 block text-base leading-7 text-black/68">
              {item.description}
            </span>
            <span className="mt-8 inline-flex text-xs font-semibold uppercase text-[var(--blue)] transition group-hover:translate-x-1">
              Explorer ↗
            </span>
          </Link>
        ))}
      </nav>
    </section>
  )
}
