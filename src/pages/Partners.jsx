import { useEffect, useState } from 'react'
import { PageContainer } from '../components/layout'
import { AnimatedSection, AnimatedText, Button, Card, SectionLabel } from '../components/ui'
import { createPartnerCalendlyUrl } from '../config/calendly'
import { useSiteContent } from '../context/useSiteContent'

const partnerAuthEndpoint = '/api/partner-auth.php'
const partnerFileEndpoint = '/api/partner-file-download.php'

const PREVIEW_FEATURES = import.meta.env.VITE_PREVIEW_FEATURES !== 'false'

function formatPortalDate(isoDate) {
  if (!isoDate) {
    return ''
  }

  try {
    return new Intl.DateTimeFormat('fr-CA', { dateStyle: 'long' }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

function formatFileSize(bytes) {
  if (!bytes) {
    return ''
  }

  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
    : `${Math.max(1, Math.round(bytes / 1024))} Ko`
}

function MilestoneTimeline({ milestones }) {
  return (
    <section className="mt-5 border border-black/20 bg-[var(--card)] p-6 sm:p-8">
      <span className="text-sm font-semibold uppercase text-[var(--blue)]">
        Avancement du projet
      </span>
      <ol className="mt-6 grid gap-px border border-black/15 bg-black/15 sm:grid-cols-2 lg:grid-cols-4">
        {milestones.map((milestone, index) => (
          <li key={`${milestone.title}-${index}`} className="relative bg-[var(--bg)] p-5">
            <span
              className={`mb-4 flex h-9 w-9 items-center justify-center border text-xs font-semibold ${
                milestone.state === 'done'
                  ? 'border-[var(--blue)] bg-[var(--blue)] text-white'
                  : milestone.state === 'active'
                    ? 'border-[var(--green)] bg-[var(--green)] text-black'
                    : 'border-black/25 text-black/40'
              }`}
              aria-hidden="true"
            >
              {milestone.state === 'done' ? '✓' : `0${index + 1}`}
            </span>
            <p
              className={`text-sm font-semibold leading-snug ${
                milestone.state === 'todo' ? 'text-black/45' : 'text-black'
              }`}
            >
              {milestone.title}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-black/40">
              {milestone.state === 'done'
                ? 'Terminé'
                : milestone.state === 'active'
                  ? 'En cours'
                  : 'À venir'}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function PartnerFiles({ partner }) {
  return (
    <section className="mt-5 border border-black/20 bg-[var(--card)] p-6 sm:p-8">
      <span className="text-sm font-semibold uppercase text-[var(--blue)]">
        Vos livrables
      </span>
      <ul className="mt-5 space-y-3">
        {partner.files.map((file) => (
          <li key={file.id}>
            <a
              href={`${partnerFileEndpoint}?id=${encodeURIComponent(partner.id)}&file=${encodeURIComponent(file.id)}`}
              className="group flex items-center justify-between gap-4 border border-black/15 bg-white/20 px-4 py-3 transition hover:border-[var(--blue)]"
            >
              <span className="min-w-0 truncate text-base font-medium text-black transition group-hover:text-[var(--blue)]">
                {file.filename}
              </span>
              <span className="shrink-0 text-xs uppercase text-black/45">
                {formatFileSize(file.size)} · Télécharger ↓
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PartnerMessages({ messages }) {
  return (
    <section className="mt-5 border border-black/20 bg-[var(--card)] p-6 sm:p-8">
      <span className="text-sm font-semibold uppercase text-[var(--blue)]">
        Messages de l’équipe TMG
      </span>
      <ul className="mt-5 space-y-4">
        {[...messages].reverse().map((entry) => (
          <li key={entry.id} className="border-l-2 border-[var(--blue)] pl-4">
            <p className="whitespace-pre-wrap break-words text-base leading-7 text-black/80">
              {entry.text}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-black/40">
              {formatPortalDate(entry.created_at)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

const portalFeatures = [
  {
    number: '01',
    title: 'Suivi de mandat',
    text: 'Le projet, son statut et les prochaines étapes, toujours à jour.',
  },
  {
    number: '02',
    title: 'Messages de l’équipe',
    text: 'Les informations importantes de TMG, centralisées au même endroit.',
  },
  {
    number: '03',
    title: 'Rendez-vous direct',
    text: 'Réservez une rencontre avec l’équipe en quelques clics.',
  },
]

function LiveDot({ color = 'bg-[var(--green)]' }) {
  return (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className={`absolute inline-flex h-full w-full animate-ping ${color} opacity-60`} />
      <span className={`relative inline-flex h-2 w-2 ${color}`} />
    </span>
  )
}

function PartnerField({
  label,
  id,
  className = '',
  inputClassName = '',
  required = false,
  ...props
}) {
  return (
    <label className={`block ${className}`} htmlFor={id}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
        {label}
        {required ? <span aria-hidden="true">*</span> : null}
      </span>
      <input
        id={id}
        required={required}
        className={`min-h-12 w-full border border-black/25 bg-white/40 px-4 py-4 text-base text-black outline-none transition placeholder:text-black/40 focus:border-[var(--blue)] focus:bg-white/70 focus-visible:ring-2 focus-visible:ring-[var(--blue)] disabled:cursor-not-allowed disabled:opacity-50 ${inputClassName}`}
        {...props}
      />
    </label>
  )
}

function PartnerLogin({ copy, message, onAuthenticated }) {
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(message)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    if (!company.trim() || !password) {
      setStatus(copy.login.missingFieldsMessage)
      return
    }

    setIsLoggingIn(true)
    setStatus(copy.login.submittingLabel)

    try {
      const response = await fetch(partnerAuthEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          company: company.trim(),
          password,
        }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok || !payload.authenticated) {
        throw new Error(payload.message || 'Connexion partenaire refusée.')
      }

      setPassword('')
      onAuthenticated(payload.partner)
    } catch (loginError) {
      setStatus(loginError.message)
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <section className="grid gap-12 border-t border-black/25 py-16 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
      <AnimatedSection className="flex flex-col justify-between gap-12">
        <div className="space-y-6">
          <h2 className="max-w-xl text-[clamp(2rem,3.4vw,3.2rem)] font-semibold leading-[1.05] text-black">
            {copy.login.title}
          </h2>
          <p className="max-w-lg text-lg leading-8 text-black/65">
            {copy.login.body}
          </p>
        </div>

        <div className="grid gap-px border border-black/20 bg-black/20 sm:grid-cols-3">
          {portalFeatures.map((feature) => (
            <div key={feature.number} className="bg-[var(--bg)] p-5">
              <span className="mb-6 flex h-9 w-9 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-xs font-semibold text-white">
                {feature.number}
              </span>
              <h3 className="mb-2 text-base font-semibold leading-tight text-black">
                {feature.title}
              </h3>
              <p className="text-sm leading-6 text-black/60">{feature.text}</p>
            </div>
          ))}
        </div>

        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-black/45">
          <span className="h-3 w-2.5 border border-black/45" aria-hidden="true" />
          Connexion chiffrée · Accès fourni par l’équipe TMG
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <form
          className="border border-black/25 bg-[var(--card)] shadow-[0_32px_90px_rgba(0,0,0,0.10)]"
          onSubmit={handleLogin}
        >
          <div className="flex items-center justify-between border-b border-black/20 bg-[var(--blue)] px-6 py-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-white">
              {copy.hero.label}
            </span>
            <span className="flex items-center gap-2 text-xs font-medium uppercase text-white/80">
              <LiveDot />
              Privé
            </span>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <PartnerField
              id="partner-company"
              label={copy.login.companyLabel}
              type="text"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              autoComplete="organization"
              placeholder={copy.login.companyPlaceholder}
              required
            />
            <PartnerField
              id="partner-password"
              label={copy.login.passwordLabel}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              placeholder={copy.login.passwordPlaceholder}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
              {isLoggingIn ? copy.login.submittingLabel : copy.login.submitLabel}
            </Button>
            <p
              className="border-t border-black/15 pt-4 text-sm leading-6 text-black/60"
              aria-live="polite"
            >
              {status || copy.login.defaultStatus}
            </p>
          </div>
        </form>
      </AnimatedSection>
    </section>
  )
}

function PartnerDashboard({ copy, partner, onLogout }) {
  const projectName = partner?.project_name || copy.dashboard.fallbackProjectName
  const projectStatus = partner?.project_status || copy.dashboard.fallbackProjectStatus
  const portalMessage =
    partner?.portal_message ||
    copy.dashboard.fallbackPortalMessage

  const dashboardCards = [
    {
      number: '01',
      label: copy.dashboard.projectLabel,
      title: projectName,
      text: copy.dashboard.projectText,
    },
    {
      number: '02',
      label: copy.dashboard.statusLabel,
      title: projectStatus,
      text: copy.dashboard.statusText,
    },
    {
      number: '03',
      label: copy.dashboard.contactLabel,
      title: partner?.contact_name || copy.dashboard.fallbackContactName,
      text: partner?.email || copy.dashboard.fallbackContactText,
    },
  ]

  return (
    <section className="border-t border-black/25 py-14">
      <AnimatedSection>
        <div className="mb-10 flex flex-col gap-6 border border-black/25 bg-[var(--card)] p-6 sm:p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
              <LiveDot />
              {copy.dashboard.sessionLabel}
            </span>
            <h2 className="text-[clamp(1.9rem,3.2vw,3rem)] font-semibold leading-[1.05] text-black">
              {copy.dashboard.welcomePrefix}, {partner?.company}.
            </h2>
          </div>
          <Button type="button" variant="outline" onClick={onLogout}>
            {copy.dashboard.logoutLabel}
          </Button>
        </div>
      </AnimatedSection>

      <div className="grid gap-5 lg:grid-cols-3">
        {dashboardCards.map((card, index) => (
          <AnimatedSection key={card.label} delay={index * 0.06}>
            <Card className="min-h-60" padding="p-7">
              <div className="mb-8 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center border border-[var(--blue)] bg-[var(--blue)] text-sm font-medium text-white transition-transform duration-300 group-hover:-translate-y-1">
                  {card.number}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
                  {card.label}
                </span>
              </div>
              <h3 className="mb-3 text-2xl font-semibold leading-tight text-black">
                {card.title}
              </h3>
              <p className="text-base leading-7 text-black/60">{card.text}</p>
            </Card>
          </AnimatedSection>
        ))}
      </div>

      {PREVIEW_FEATURES && (partner?.milestones ?? []).length > 0 ? (
        <AnimatedSection delay={0.08}>
          <MilestoneTimeline milestones={partner.milestones} />
        </AnimatedSection>
      ) : null}

      <AnimatedSection delay={0.1}>
        <figure className="mt-5 border border-black/25 border-l-4 border-l-[var(--blue)] bg-[var(--card)] p-7 sm:p-8">
          <figcaption className="mb-4 text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
            {copy.dashboard.messageLabel}
          </figcaption>
          <blockquote className="max-w-3xl text-xl leading-9 text-black/80">
            {portalMessage}
          </blockquote>
        </figure>
      </AnimatedSection>

      {PREVIEW_FEATURES && (partner?.messages ?? []).length > 0 ? (
        <AnimatedSection delay={0.11}>
          <PartnerMessages messages={partner.messages} />
        </AnimatedSection>
      ) : null}

      {PREVIEW_FEATURES && (partner?.files ?? []).length > 0 ? (
        <AnimatedSection delay={0.12}>
          <PartnerFiles partner={partner} />
        </AnimatedSection>
      ) : null}

      <CalendlyBooking copy={copy} partner={partner} />
    </section>
  )
}

function CalendlyBooking({ copy, partner }) {
  const calendlyUrl = createPartnerCalendlyUrl(partner)

  return (
    <AnimatedSection delay={0.12}>
      <section className="mt-5 border border-black/25 bg-[var(--card)]">
        <div className="grid gap-4 border-b border-black/20 p-7 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
              {copy.calendly.label}
            </span>
            <h3 className="mt-3 text-3xl font-semibold leading-tight text-black">
              {copy.calendly.title}
            </h3>
          </div>
          <p className="max-w-2xl text-base leading-7 text-black/65">
            {copy.calendly.body}
          </p>
        </div>

        <div className="p-4 sm:p-6">
          {calendlyUrl ? (
            <div className="overflow-hidden border border-black/15 bg-white">
              <iframe
                title="Réservation Calendly TMG"
                src={calendlyUrl}
                className="h-[720px] w-full"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="border border-black/15 bg-white/20 p-6">
              <h4 className="text-xl font-semibold text-black">
                {copy.calendly.missingTitle}
              </h4>
              <p className="mt-3 max-w-2xl text-base leading-7 text-black/65">
                {copy.calendly.missingBody}
              </p>
            </div>
          )}
        </div>
      </section>
    </AnimatedSection>
  )
}

export default function Partners() {
  const { content } = useSiteContent()
  const copy = content.partner
  const [authStatus, setAuthStatus] = useState('checking')
  const [partner, setPartner] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function checkSession() {
      try {
        const response = await fetch(partnerAuthEndpoint, {
          cache: 'no-store',
          credentials: 'same-origin',
          signal: controller.signal,
        })
        const payload = await response.json().catch(() => ({}))

        if (!isMounted) {
          return
        }

        if (response.ok && payload.authenticated) {
          setPartner(payload.partner)
          setAuthStatus('authenticated')
          return
        }

        setAuthStatus('unauthenticated')
      } catch (sessionError) {
        if (isMounted && sessionError.name !== 'AbortError') {
          setAuthStatus('unauthenticated')
          setMessage('Connexion partenaire indisponible en local sans PHP.')
        }
      }
    }

    checkSession()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const handleAuthenticated = (nextPartner) => {
    setPartner(nextPartner)
    setAuthStatus('authenticated')
    setMessage('')
  }

  const handleLogout = async () => {
    try {
      await fetch(partnerAuthEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'logout' }),
      })
    } catch {
      // The screen can still return to the login state if the request fails.
    } finally {
      setPartner(null)
      setAuthStatus('unauthenticated')
      setMessage('Déconnexion effectuée.')
    }
  }

  return (
    <main>
      <PageContainer>
        <section className="py-14 text-left">
          <div className="max-w-5xl space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <SectionLabel>{copy.hero.label}</SectionLabel>
              <span className="inline-flex items-center gap-2 border border-black/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-black/60">
                <LiveDot />
                Portail privé
              </span>
            </div>
            <AnimatedText
              as="h1"
              split="words"
              className="text-[clamp(2.6rem,8.5vw,7.5rem)] font-semibold uppercase leading-[0.9] text-black"
            >
              {copy.hero.title}
            </AnimatedText>
            <AnimatedText as="p" delay={0.14} className="max-w-2xl text-lg leading-8 text-black/70">
              {copy.hero.subtitle}
            </AnimatedText>
          </div>
        </section>

        {authStatus === 'checking' ? (
          <section className="border-t border-black/25 py-12">
            <p className="flex items-center gap-3 border border-black/20 bg-[var(--card)] p-6 text-sm uppercase text-black/65">
              <LiveDot color="bg-[var(--blue)]" />
              {copy.login.loadingMessage}
            </p>
          </section>
        ) : authStatus === 'authenticated' ? (
          <PartnerDashboard copy={copy} partner={partner} onLogout={handleLogout} />
        ) : (
          <PartnerLogin copy={copy} message={message} onAuthenticated={handleAuthenticated} />
        )}
      </PageContainer>
    </main>
  )
}
