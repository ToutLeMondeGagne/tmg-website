import { useEffect, useState } from 'react'
import { PageContainer } from '../components/layout'
import { Button, Card, SectionLabel } from '../components/ui'
import { createPartnerCalendlyUrl } from '../config/calendly'
import { useSiteContent } from '../context/useSiteContent'

const partnerAuthEndpoint = '/api/partner-auth.php'

function PartnerField({
  label,
  id,
  className = '',
  inputClassName = '',
  required = false,
  ...props
}) {
  return (
    <label className={`block pt-3 ${className}`} htmlFor={id}>
      <span className="mb-0 inline-block bg-[var(--blue)] px-3 py-1 text-sm font-medium leading-none text-white">
        {label}
        {required ? <span aria-hidden="true">*</span> : null}
      </span>
      <input
        id={id}
        required={required}
        className={`min-h-12 w-full border border-[var(--blue)] bg-transparent px-4 py-4 text-base text-black outline-none transition placeholder:text-black/45 focus:bg-white/20 focus-visible:ring-2 focus-visible:ring-[var(--blue)] disabled:cursor-not-allowed disabled:opacity-50 ${inputClassName}`}
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
    <section className="grid gap-10 border-t border-black/25 py-12 lg:grid-cols-[0.75fr_1fr]">
      <div className="max-w-md space-y-4">
        <h2 className="text-3xl font-semibold leading-tight text-black">
          {copy.login.title}
        </h2>
        <p className="text-base leading-7 text-black/65">
          {copy.login.body}
        </p>
      </div>

      <form
        className="grid gap-5 border border-black/20 bg-[var(--card)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
        onSubmit={handleLogin}
      >
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-black/60" aria-live="polite">
            {status || copy.login.defaultStatus}
          </p>
          <Button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? copy.login.submittingLabel : copy.login.submitLabel}
          </Button>
        </div>
      </form>
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
      label: copy.dashboard.projectLabel,
      title: projectName,
      text: copy.dashboard.projectText,
    },
    {
      label: copy.dashboard.statusLabel,
      title: projectStatus,
      text: copy.dashboard.statusText,
    },
    {
      label: copy.dashboard.contactLabel,
      title: partner?.contact_name || copy.dashboard.fallbackContactName,
      text: partner?.email || copy.dashboard.fallbackContactText,
    },
  ]

  return (
    <section className="border-t border-black/25 py-12">
      <div className="mb-8 flex flex-col gap-5 border border-black/20 bg-[var(--card)] p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="mb-2 block text-sm font-semibold uppercase text-[var(--blue)]">
            {copy.dashboard.sessionLabel}
          </span>
          <h2 className="text-3xl font-semibold leading-tight text-black">
            {copy.dashboard.welcomePrefix}, {partner?.company}.
          </h2>
        </div>
        <Button type="button" variant="outline" onClick={onLogout}>
          {copy.dashboard.logoutLabel}
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {dashboardCards.map((card) => (
          <Card key={card.label} className="min-h-56" padding="p-6">
            <span className="text-sm font-semibold uppercase text-[var(--blue)]">
              {card.label}
            </span>
            <h3 className="mt-8 text-2xl font-semibold leading-tight text-black">
              {card.title}
            </h3>
            <p className="mt-4 text-base leading-7 text-black/65">
              {card.text}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-5 border border-black/20 bg-[var(--card)] p-6">
        <span className="text-sm font-semibold uppercase text-[var(--blue)]">
          {copy.dashboard.messageLabel}
        </span>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-black/70">
          {portalMessage}
        </p>
      </div>

      <CalendlyBooking copy={copy} partner={partner} />
    </section>
  )
}

function CalendlyBooking({ copy, partner }) {
  const calendlyUrl = createPartnerCalendlyUrl(partner)

  return (
    <section className="mt-5 border border-black/20 bg-[var(--card)] p-6">
      <div className="mb-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <span className="text-sm font-semibold uppercase text-[var(--blue)]">
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

      {calendlyUrl ? (
        <div className="overflow-hidden border border-black/15 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
          <iframe
            title="Réservation Calendly TMG"
            src={calendlyUrl}
            className="h-[720px] w-full"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="border border-black/15 bg-white/10 p-6">
          <h4 className="text-xl font-semibold text-black">
            {copy.calendly.missingTitle}
          </h4>
          <p className="mt-3 max-w-2xl text-base leading-7 text-black/65">
            {copy.calendly.missingBody}
          </p>
        </div>
      )}
    </section>
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
            <SectionLabel>{copy.hero.label}</SectionLabel>
            <h1 className="text-[clamp(3.4rem,10vw,8.5rem)] font-semibold uppercase leading-[0.86] text-black">
              {copy.hero.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-black/70">
              {copy.hero.subtitle}
            </p>
          </div>
        </section>

        {authStatus === 'checking' ? (
          <section className="border-t border-black/25 py-12">
            <p className="border border-black/20 bg-[var(--card)] p-6 text-sm uppercase text-black/65">
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
