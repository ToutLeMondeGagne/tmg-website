import { useEffect, useState } from 'react'
import { PageContainer } from '../components/layout'
import { Button, Card, SectionLabel } from '../components/ui'
import { createPartnerCalendlyUrl } from '../config/calendly'

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

function PartnerLogin({ message, onAuthenticated }) {
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(message)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    if (!company.trim() || !password) {
      setStatus('Entrez le nom de votre entreprise et votre mot de passe.')
      return
    }

    setIsLoggingIn(true)
    setStatus('Connexion en cours...')

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
          Accès réservé aux clients TMG.
        </h2>
        <p className="text-base leading-7 text-black/65">
          Utilisez le nom d’entreprise et le mot de passe fournis par l’équipe TMG.
          Cet espace sert à centraliser les informations importantes de votre mandat.
        </p>
      </div>

      <form
        className="grid gap-5 border border-black/20 bg-[var(--card)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
        onSubmit={handleLogin}
      >
        <PartnerField
          id="partner-company"
          label="Nom de l'entreprise"
          type="text"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          autoComplete="organization"
          placeholder="Ex: Entreprise ABC"
          required
        />
        <PartnerField
          id="partner-password"
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          placeholder="Mot de passe fourni par TMG"
          required
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-black/60" aria-live="polite">
            {status || 'Connexion privée partenaire.'}
          </p>
          <Button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? 'Connexion...' : 'Se connecter'}
          </Button>
        </div>
      </form>
    </section>
  )
}

function PartnerDashboard({ partner, onLogout }) {
  const projectName = partner?.project_name || 'Mandat TMG'
  const projectStatus = partner?.project_status || 'En accompagnement'
  const portalMessage =
    partner?.portal_message ||
    'Votre espace partenaire est activé. Les prochaines informations de mandat seront ajoutées ici par TMG.'

  const dashboardCards = [
    {
      label: 'Projet',
      title: projectName,
      text: `Espace privé associé à ${partner?.company || 'votre organisation'}.`,
    },
    {
      label: 'Statut',
      title: projectStatus,
      text: 'Suivez le contexte du mandat et les prochaines étapes partagées par TMG.',
    },
    {
      label: 'Contact',
      title: partner?.contact_name || 'Équipe TMG',
      text: partner?.email || 'Votre contact principal sera confirmé par l’équipe.',
    },
  ]

  return (
    <section className="border-t border-black/25 py-12">
      <div className="mb-8 flex flex-col gap-5 border border-black/20 bg-[var(--card)] p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="mb-2 block text-sm font-semibold uppercase text-[var(--blue)]">
            Session partenaire
          </span>
          <h2 className="text-3xl font-semibold leading-tight text-black">
            Bienvenue, {partner?.company}.
          </h2>
        </div>
        <Button type="button" variant="outline" onClick={onLogout}>
          Déconnexion
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
          Message TMG
        </span>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-black/70">
          {portalMessage}
        </p>
      </div>

      <CalendlyBooking partner={partner} />
    </section>
  )
}

function CalendlyBooking({ partner }) {
  const calendlyUrl = createPartnerCalendlyUrl(partner)

  return (
    <section className="mt-5 border border-black/20 bg-[var(--card)] p-6">
      <div className="mb-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <span className="text-sm font-semibold uppercase text-[var(--blue)]">
            Rencontre
          </span>
          <h3 className="mt-3 text-3xl font-semibold leading-tight text-black">
            Réserver une rencontre directe.
          </h3>
        </div>
        <p className="max-w-2xl text-base leading-7 text-black/65">
          Les disponibilités sont gérées dans Calendly par l’équipe TMG. Choisissez
          le moment qui vous convient, puis la confirmation arrivera par courriel.
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
            Calendly n’est pas encore configuré.
          </h4>
          <p className="mt-3 max-w-2xl text-base leading-7 text-black/65">
            Ajoutez le lien de votre événement Calendly dans
            {' '}
            <span className="font-semibold text-black">VITE_CALENDLY_URL</span>
            {' '}
            avant de faire le build du site.
          </p>
        </div>
      )}
    </section>
  )
}

export default function Partners() {
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
            <SectionLabel>Espace partenaires</SectionLabel>
            <h1 className="text-[clamp(3.4rem,10vw,8.5rem)] font-semibold uppercase leading-[0.86] text-black">
              Votre mandat, au même endroit.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-black/70">
              Une zone privée pour les clients accompagnés par TMG : accès projet,
              contexte, statut et messages importants.
            </p>
          </div>
        </section>

        {authStatus === 'checking' ? (
          <section className="border-t border-black/25 py-12">
            <p className="border border-black/20 bg-[var(--card)] p-6 text-sm uppercase text-black/65">
              Vérification de la session partenaire...
            </p>
          </section>
        ) : authStatus === 'authenticated' ? (
          <PartnerDashboard partner={partner} onLogout={handleLogout} />
        ) : (
          <PartnerLogin message={message} onAuthenticated={handleAuthenticated} />
        )}
      </PageContainer>
    </main>
  )
}
