import { useEffect, useState } from 'react'
import { PageContainer } from '../components/layout'
import { Button, Card, SectionLabel } from '../components/ui'

const partnerAuthEndpoint = '/api/partner-auth.php'
const partnerMeetingsEndpoint = '/api/partner-meetings.php'

function formatMeetingSlot(slot) {
  if (!slot?.date || !slot?.start_time) {
    return 'Date à préciser'
  }

  const date = new Date(`${slot.date}T${slot.start_time}`)

  if (Number.isNaN(date.getTime())) {
    return `${slot.date} à ${slot.start_time}`
  }

  return new Intl.DateTimeFormat('fr-CA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
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

      <MeetingBookingPanel />
    </section>
  )
}

function MeetingBookingPanel() {
  const [availableSlots, setAvailableSlots] = useState([])
  const [bookedSlots, setBookedSlots] = useState([])
  const [status, setStatus] = useState('Chargement des disponibilités...')
  const [isLoading, setIsLoading] = useState(true)
  const [activeSlotId, setActiveSlotId] = useState('')

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function loadMeetings() {
      try {
        const response = await fetch(partnerMeetingsEndpoint, {
          cache: 'no-store',
          credentials: 'same-origin',
          signal: controller.signal,
        })
        const payload = await response.json().catch(() => ({}))

        if (!isMounted) {
          return
        }

        if (!response.ok) {
          throw new Error(payload.message || 'Impossible de charger les disponibilités.')
        }

        setAvailableSlots(Array.isArray(payload.available_slots) ? payload.available_slots : [])
        setBookedSlots(Array.isArray(payload.booked_slots) ? payload.booked_slots : [])
        setStatus('Choisissez une disponibilité pour réserver une rencontre.')
      } catch (loadError) {
        if (isMounted && loadError.name !== 'AbortError') {
          setStatus(`${loadError.message} La réservation fonctionne sur SiteGround après connexion.`)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadMeetings()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const runMeetingAction = async (slot, action) => {
    const confirmed = action === 'book'
      ? window.confirm('Réserver cette rencontre ?')
      : window.confirm('Annuler cette réservation ?')

    if (!confirmed) {
      return
    }

    setActiveSlotId(slot.id)
    setStatus(action === 'book' ? 'Réservation en cours...' : 'Annulation en cours...')

    try {
      const response = await fetch(partnerMeetingsEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          id: slot.id,
        }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'Action impossible sur cette rencontre.')
      }

      setAvailableSlots(Array.isArray(payload.available_slots) ? payload.available_slots : [])
      setBookedSlots(Array.isArray(payload.booked_slots) ? payload.booked_slots : [])
      setStatus(payload.message || 'Calendrier mis à jour.')
    } catch (meetingError) {
      setStatus(meetingError.message)
    } finally {
      setActiveSlotId('')
    }
  }

  return (
    <div className="mt-5 border border-black/20 bg-[var(--card)] p-6">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase text-[var(--blue)]">
            Rencontres
          </span>
          <h3 className="mt-3 text-3xl font-semibold leading-tight text-black">
            Réserver une rencontre directe.
          </h3>
        </div>
        <p className="max-w-md text-sm leading-6 text-black/60" aria-live="polite">
          {status}
        </p>
      </div>

      {isLoading ? (
        <p className="border border-black/15 bg-white/10 p-4 text-sm uppercase text-black/60">
          Chargement...
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <section>
            <h4 className="mb-3 text-lg font-semibold text-black">
              Vos réservations
            </h4>
            {bookedSlots.length > 0 ? (
              <div className="space-y-3">
                {bookedSlots.map((slot) => (
                  <article key={slot.id} className="border border-black/15 bg-white/10 p-4">
                    <p className="text-sm font-semibold uppercase text-[var(--blue)]">
                      Confirmé
                    </p>
                    <h5 className="mt-2 text-lg font-semibold text-black">
                      {formatMeetingSlot(slot)}
                    </h5>
                    <p className="mt-1 text-sm leading-6 text-black/60">
                      {slot.title || 'Rencontre TMG'}
                      {' '}
                      ·
                      {' '}
                      {slot.duration_minutes || 30}
                      {' '}
                      min
                      {slot.location ? ` · ${slot.location}` : ''}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      disabled={activeSlotId === slot.id}
                      onClick={() => runMeetingAction(slot, 'cancel')}
                    >
                      {activeSlotId === slot.id ? 'Annulation...' : 'Annuler'}
                    </Button>
                  </article>
                ))}
              </div>
            ) : (
              <p className="border border-black/15 bg-white/10 p-4 text-sm leading-6 text-black/60">
                Aucune rencontre réservée pour le moment.
              </p>
            )}
          </section>

          <section>
            <h4 className="mb-3 text-lg font-semibold text-black">
              Disponibilités TMG
            </h4>
            {availableSlots.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2">
                {availableSlots.map((slot) => (
                  <article
                    key={slot.id}
                    className="border border-black/15 bg-white/10 p-4 transition duration-200 hover:-translate-y-1 hover:border-[var(--blue)] hover:bg-white/20"
                  >
                    <p className="text-sm font-semibold uppercase text-[var(--blue)]">
                      Disponible
                    </p>
                    <h5 className="mt-2 text-lg font-semibold text-black">
                      {formatMeetingSlot(slot)}
                    </h5>
                    <p className="mt-1 text-sm leading-6 text-black/60">
                      {slot.title || 'Rencontre TMG'}
                      {' '}
                      ·
                      {' '}
                      {slot.duration_minutes || 30}
                      {' '}
                      min
                      {slot.location ? ` · ${slot.location}` : ''}
                    </p>
                    {slot.note ? (
                      <p className="mt-3 text-sm leading-6 text-black/55">
                        {slot.note}
                      </p>
                    ) : null}
                    <Button
                      type="button"
                      className="mt-4"
                      disabled={activeSlotId === slot.id}
                      onClick={() => runMeetingAction(slot, 'book')}
                    >
                      {activeSlotId === slot.id ? 'Réservation...' : 'Réserver'}
                    </Button>
                  </article>
                ))}
              </div>
            ) : (
              <p className="border border-black/15 bg-white/10 p-4 text-sm leading-6 text-black/60">
                Aucune disponibilité publiée pour le moment. TMG ajoutera de nouveaux créneaux bientôt.
              </p>
            )}
          </section>
        </div>
      )}
    </div>
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
