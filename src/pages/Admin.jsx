import { useEffect, useState } from 'react'
import { PageContainer } from '../components/layout'
import { Button, SectionLabel } from '../components/ui'
import { defaultSiteContent } from '../content/defaultSiteContent'
import { siteContentFields } from '../content/siteContentFields'
import {
  cloneContent,
  getContentValue,
  mergeContent,
  setContentValue,
} from '../content/contentUtils'
import { useSiteContent } from '../context/useSiteContent'

const adminAuthEndpoint = '/api/admin-auth.php'

function AdminField({ field, value, onChange }) {
  const inputId = `admin-${field.path.replaceAll('.', '-')}`
  const commonClasses =
    'w-full border border-[var(--blue)] bg-transparent px-4 py-3 text-base text-black outline-none transition focus:bg-white/30 focus-visible:ring-2 focus-visible:ring-[var(--blue)]'

  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-medium uppercase text-[var(--blue)]">
        {field.label}
      </span>
      {field.type === 'textarea' ? (
        <textarea
          id={inputId}
          rows={field.rows ?? 3}
          value={value ?? ''}
          onChange={(event) => onChange(event.target.value)}
          className={`${commonClasses} resize-y leading-7`}
        />
      ) : (
        <input
          id={inputId}
          type="text"
          value={value ?? ''}
          onChange={(event) => onChange(event.target.value)}
          className={commonClasses}
        />
      )}
    </label>
  )
}

function downloadJson(content) {
  const blob = new Blob([`${JSON.stringify(content, null, 2)}\n`], {
    type: 'application/json;charset=utf-8',
  })
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = objectUrl
  link.download = 'site-content.json'
  link.click()
  URL.revokeObjectURL(objectUrl)
}

export default function Admin() {
  const { content, error, isLoading, replaceContent } = useSiteContent()
  const [authStatus, setAuthStatus] = useState('checking')
  const [adminUser, setAdminUser] = useState('')
  const [authMessage, setAuthMessage] = useState('')
  const contentKey = JSON.stringify(content)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function checkSession() {
      try {
        const response = await fetch(adminAuthEndpoint, {
          cache: 'no-store',
          credentials: 'same-origin',
          signal: controller.signal,
        })
        const payload = await response.json().catch(() => ({}))

        if (!isMounted) {
          return
        }

        if (response.ok && payload.authenticated) {
          setAdminUser(payload.username || 'admin')
          setAuthStatus('authenticated')
          setAuthMessage('')
          return
        }

        setAuthStatus('unauthenticated')
        setAuthMessage('')
      } catch (sessionError) {
        if (isMounted && sessionError.name !== 'AbortError') {
          setAuthStatus('unauthenticated')
          setAuthMessage(
            'Connexion admin indisponible en local sans PHP. Elle sera active sur SiteGround.',
          )
        }
      }
    }

    checkSession()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const handleAuthenticated = (username) => {
    setAdminUser(username || 'admin')
    setAuthStatus('authenticated')
    setAuthMessage('')
  }

  const handleLogout = async () => {
    try {
      await fetch(adminAuthEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'logout' }),
      })
    } catch {
      // The UI can still return to the login screen if the network request fails.
    } finally {
      setAdminUser('')
      setAuthStatus('unauthenticated')
      setAuthMessage('Déconnexion effectuée.')
    }
  }

  return (
    <main>
      <PageContainer>
        <section className="border-b border-black/20 py-14 text-left">
          <div className="max-w-4xl space-y-6">
            <SectionLabel>Admin</SectionLabel>
            <h1 className="text-[clamp(2.8rem,8vw,7rem)] font-semibold uppercase leading-[0.86] text-black">
              Modifier les textes du site.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-black/70">
              Cette interface pilote le fichier de contenu JSON utilisé par le site.
              Connectez-vous avec le compte admin configuré sur SiteGround.
            </p>
            {error ? (
              <p className="border border-black/20 bg-white/20 p-4 text-sm leading-6 text-black/70">
                Le fichier distant n’a pas été chargé, les textes par défaut sont utilisés.
              </p>
            ) : null}
          </div>
        </section>

        {authStatus === 'checking' ? (
          <section className="py-12 text-left">
            <p className="border border-black/20 bg-[var(--card)] p-6 text-sm uppercase text-black/65">
              Vérification de la session admin...
            </p>
          </section>
        ) : authStatus === 'authenticated' ? (
          <AdminEditor
            key={contentKey}
            adminUser={adminUser}
            content={content}
            isLoading={isLoading}
            onLogout={handleLogout}
            replaceContent={replaceContent}
          />
        ) : (
          <AdminLogin
            message={authMessage}
            onAuthenticated={handleAuthenticated}
          />
        )}
      </PageContainer>
    </main>
  )
}

function AdminLogin({ message, onAuthenticated }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(message)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    if (!username.trim() || !password) {
      setStatus('Entrez l’identifiant admin et le mot de passe.')
      return
    }

    setIsLoggingIn(true)
    setStatus('Connexion en cours...')

    try {
      const response = await fetch(adminAuthEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          username: username.trim(),
          password,
        }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok || !payload.authenticated) {
        throw new Error(payload.message || 'Connexion admin refusée.')
      }

      setPassword('')
      onAuthenticated(payload.username)
    } catch (loginError) {
      setStatus(`${loginError.message} Vérifiez le compte dans api/admin-config.php.`)
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <section className="py-12 text-left">
      <form
        className="grid gap-5 border border-black/20 bg-[var(--card)] p-6 md:grid-cols-[1fr_1fr_auto] md:items-end"
        onSubmit={handleLogin}
      >
        <label className="block">
          <span className="mb-2 block text-sm font-medium uppercase text-[var(--blue)]">
            Identifiant admin
          </span>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            className="w-full border border-[var(--blue)] bg-transparent px-4 py-3 text-base text-black outline-none focus:bg-white/30 focus-visible:ring-2 focus-visible:ring-[var(--blue)]"
            placeholder="admin"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium uppercase text-[var(--blue)]">
            Mot de passe
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            className="w-full border border-[var(--blue)] bg-transparent px-4 py-3 text-base text-black outline-none focus:bg-white/30 focus-visible:ring-2 focus-visible:ring-[var(--blue)]"
            placeholder="Mot de passe admin"
          />
        </label>
        <Button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-black/65" aria-live="polite">
        {status || 'Connectez-vous pour modifier et sauvegarder les textes du site.'}
      </p>
    </section>
  )
}

function AdminEditor({ adminUser, content, isLoading, onLogout, replaceContent }) {
  const [draft, setDraft] = useState(() => cloneContent(content))
  const [status, setStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const updateField = (path, value) => {
    setDraft((currentDraft) => setContentValue(currentDraft, path, value))
  }

  const previewDraft = () => {
    replaceContent(mergeContent(defaultSiteContent, draft))
    setStatus('Aperçu appliqué dans ce navigateur. Cliquez sur sauvegarder pour publier.')
  }

  const resetDraft = () => {
    const cleanContent = cloneContent(defaultSiteContent)
    setDraft(cleanContent)
    replaceContent(cleanContent)
    setStatus('Textes réinitialisés aux valeurs par défaut dans l’aperçu.')
  }

  const saveDraft = async (event) => {
    event.preventDefault()

    setIsSaving(true)
    setStatus('Sauvegarde en cours...')

    try {
      const response = await fetch('/api/content.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: draft }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'La sauvegarde serveur a échoué.')
      }

      replaceContent(mergeContent(defaultSiteContent, draft))
      setStatus('Contenu sauvegardé. Les visiteurs verront les nouveaux textes.')
    } catch (saveError) {
      setStatus(
        `${saveError.message} En local, utilisez le téléchargement JSON ou testez sur SiteGround.`,
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form className="space-y-10 py-12 text-left" onSubmit={saveDraft}>
      <section className="grid gap-5 border border-black/20 bg-[var(--card)] p-6 md:grid-cols-[1fr_0.9fr] md:items-center">
        <div>
          <span className="mb-2 block text-sm font-medium uppercase text-[var(--blue)]">
            Session admin
          </span>
          <p className="text-base leading-7 text-black/70">
            Connecté en tant que <span className="font-semibold text-black">{adminUser}</span>.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
          <Button type="button" variant="outline" onClick={previewDraft}>
            Prévisualiser
          </Button>
          <Button type="button" variant="ghost" onClick={() => downloadJson(draft)}>
            Télécharger JSON
          </Button>
          <Button type="button" variant="ghost" onClick={onLogout}>
            Déconnexion
          </Button>
          <Button type="submit" disabled={isSaving || isLoading}>
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </div>
      </section>

      {siteContentFields.map((group) => (
        <section
          key={group.title}
          className="border-t border-black/25 pt-8"
        >
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight text-black">
              {group.title}
            </h2>
            <p className="mt-2 text-base leading-7 text-black/60">
              {group.description}
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {group.fields.map((field) => (
              <AdminField
                key={field.path}
                field={field}
                value={getContentValue(draft, field.path)}
                onChange={(value) => updateField(field.path, value)}
              />
            ))}
          </div>
        </section>
      ))}

      <section className="flex flex-col gap-4 border-t border-black/25 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-black/65" aria-live="polite">
          {status || 'Modifiez les champs, prévisualisez, puis sauvegardez.'}
        </p>
        <Button type="button" variant="outline" onClick={resetDraft}>
          Réinitialiser les textes
        </Button>
      </section>
    </form>
  )
}
