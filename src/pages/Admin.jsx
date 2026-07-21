import { useEffect, useState } from 'react'
import { PageContainer } from '../components/layout'
import AuditManager from '../components/admin/AuditManager'
import InternshipManager from '../components/admin/InternshipManager'
import LeadsManager from '../components/admin/LeadsManager'
import PartnerProjectManager from '../components/admin/PartnerProjectManager'

const PREVIEW_FEATURES = import.meta.env.VITE_PREVIEW_FEATURES !== 'false'
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
const partnerAccountsEndpoint = '/api/partner-accounts.php'

function AdminField({ field, value, onChange }) {
  const inputId = `admin-${field.path.replaceAll('.', '-')}`
  const commonClasses =
    'w-full border border-[var(--blue)] bg-transparent px-4 py-3 text-base text-black outline-none transition focus:bg-white/30 focus-visible:ring-2 focus-visible:ring-[var(--blue)]'

  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-medium text-[var(--blue)]">
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
  const [editorStatus, setEditorStatus] = useState('')
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
            <h1 className="text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[0.86] text-black">
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
            <p className="border border-black/20 bg-[var(--card)] p-6 text-sm text-black/65">
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
            status={editorStatus}
            setStatus={setEditorStatus}
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
          <span className="mb-2 block text-sm font-medium text-[var(--blue)]">
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
          <span className="mb-2 block text-sm font-medium text-[var(--blue)]">
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

const ADMIN_TABS = [
  { id: 'contenu', label: 'Contenu du site', preview: false },
  { id: 'prospects', label: 'Prospects', preview: true },
  { id: 'candidatures', label: 'Candidatures', preview: true },
  { id: 'audits', label: 'Audits', preview: true },
  { id: 'partenaires', label: 'Partenaires', preview: false },
]

function AdminEditor({ adminUser, content, isLoading, onLogout, replaceContent, status, setStatus }) {
  const [draft, setDraft] = useState(() => cloneContent(content))
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('contenu')
  const tabs = ADMIN_TABS.filter((tab) => !tab.preview || PREVIEW_FEATURES)

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

  const saveDraft = async () => {

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

      const savedContent =
        payload.content && typeof payload.content === 'object' ? payload.content : draft

      setDraft(cloneContent(savedContent))
      replaceContent(mergeContent(defaultSiteContent, savedContent))
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
    <div className="space-y-8 py-12 text-left">
      {/* Barre de session */}
      <section className="flex flex-col gap-4 border border-black/20 bg-[var(--card)] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="mb-1 block text-sm font-medium text-[var(--blue)]">
            Session admin
          </span>
          <p className="text-base leading-7 text-black/70">
            Connecté en tant que <span className="font-semibold text-black">{adminUser}</span>.
          </p>
        </div>
        <Button type="button" variant="ghost" onClick={onLogout}>
          Déconnexion
        </Button>
      </section>

      {/* Onglets */}
      <nav className="flex flex-wrap gap-2 border-b border-black/20 pb-px" aria-label="Sections de l’admin">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`border border-b-0 px-5 py-3 text-sm font-semibold uppercase tracking-wide transition ${
              activeTab === tab.id
                ? 'border-black/20 bg-[var(--card)] text-[var(--blue)]'
                : 'border-transparent text-black/50 hover:text-[var(--blue)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Onglet : Contenu du site */}
      {activeTab === 'contenu' ? (
        <div className="space-y-8">
          <section className="flex flex-col gap-4 border border-black/20 bg-[var(--card)] p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-6 text-black/65" aria-live="polite">
              {status || 'Modifiez les champs, prévisualisez, puis sauvegardez pour publier.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline" onClick={previewDraft}>
                Prévisualiser
              </Button>
              <Button type="button" variant="ghost" onClick={() => downloadJson(draft)}>
                Télécharger JSON
              </Button>
              <Button type="button" onClick={saveDraft} disabled={isSaving || isLoading}>
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>
          </section>

          {siteContentFields.map((group) => (
            <section key={group.title} className="border-t border-black/25 pt-8">
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

          <section className="flex justify-end border-t border-black/25 pt-8">
            <Button type="button" variant="outline" onClick={resetDraft}>
              Réinitialiser les textes
            </Button>
          </section>
        </div>
      ) : null}

      {/* Onglets : outils (données serveur) */}
      {activeTab === 'prospects' && PREVIEW_FEATURES ? <LeadsManager /> : null}
      {activeTab === 'candidatures' && PREVIEW_FEATURES ? <InternshipManager /> : null}
      {activeTab === 'audits' && PREVIEW_FEATURES ? <AuditManager /> : null}
      {activeTab === 'partenaires' ? <PartnerAccountsManager /> : null}
    </div>
  )
}

function AdminPartnerField({
  label,
  id,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder = '',
  rows,
}) {
  const commonClasses =
    'w-full border border-[var(--blue)] bg-transparent px-4 py-3 text-base text-black outline-none transition placeholder:text-black/45 focus:bg-white/30 focus-visible:ring-2 focus-visible:ring-[var(--blue)]'

  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-medium text-[var(--blue)]">
        {label}
        {required ? <span aria-hidden="true">*</span> : null}
      </span>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${commonClasses} resize-y leading-7`}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={commonClasses}
          placeholder={placeholder}
          required={required}
        />
      )}
    </label>
  )
}

function PartnerAccountsManager() {
  const [accounts, setAccounts] = useState([])
  const [managedAccountId, setManagedAccountId] = useState('')
  const [form, setForm] = useState({
    company: '',
    password: '',
    contact_name: '',
    email: '',
    project_name: '',
    project_status: '',
    portal_message: '',
  })
  const [status, setStatus] = useState('Chargement des comptes partenaires...')
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true)
  const [isSavingAccount, setIsSavingAccount] = useState(false)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function loadAccounts() {
      try {
        const response = await fetch(partnerAccountsEndpoint, {
          cache: 'no-store',
          credentials: 'same-origin',
          signal: controller.signal,
        })
        const payload = await response.json().catch(() => ({}))

        if (!isMounted) {
          return
        }

        if (!response.ok) {
          throw new Error(payload.message || 'Impossible de charger les partenaires.')
        }

        setAccounts(Array.isArray(payload.accounts) ? payload.accounts : [])
        setStatus('Comptes partenaires chargés.')
      } catch (loadError) {
        if (isMounted && loadError.name !== 'AbortError') {
          setStatus(`${loadError.message} Cette section fonctionne sur SiteGround après connexion admin.`)
        }
      } finally {
        if (isMounted) {
          setIsLoadingAccounts(false)
        }
      }
    }

    loadAccounts()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const updateForm = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  const createAccount = async (event) => {
    event.preventDefault()

    if (!form.company.trim() || form.password.length < 10) {
      setStatus('Ajoutez une entreprise et un mot de passe de 10 caractères minimum.')
      return
    }

    setIsSavingAccount(true)
    setStatus('Création du compte partenaire...')

    try {
      const response = await fetch(partnerAccountsEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          ...form,
          company: form.company.trim(),
        }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'La création du compte a échoué.')
      }

      setAccounts(Array.isArray(payload.accounts) ? payload.accounts : [])
      setForm({
        company: '',
        password: '',
        contact_name: '',
        email: '',
        project_name: '',
        project_status: '',
        portal_message: '',
      })
      setStatus('Compte partenaire créé. Transmettez le nom d’entreprise et le mot de passe au client.')
    } catch (createError) {
      setStatus(createError.message)
    } finally {
      setIsSavingAccount(false)
    }
  }

  const deleteAccount = async (account) => {
    const confirmed = window.confirm(`Supprimer le compte partenaire ${account.company} ?`)

    if (!confirmed) {
      return
    }

    setStatus('Suppression du compte partenaire...')

    try {
      const response = await fetch(partnerAccountsEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          id: account.id,
        }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'La suppression du compte a échoué.')
      }

      setAccounts(Array.isArray(payload.accounts) ? payload.accounts : [])
      setStatus('Compte partenaire supprimé.')
    } catch (deleteError) {
      setStatus(deleteError.message)
    }
  }

  return (
    <section className="border-t border-black/25 pt-8">
      <div className="mb-8 max-w-3xl">
        <h2 className="text-3xl font-semibold leading-tight text-black">
          Comptes partenaires
        </h2>
        <p className="mt-2 text-base leading-7 text-black/60">
          Créez les accès privés pour les clients TMG. Le client se connecte sur
          {' '}
          <span className="font-semibold text-black">/partenaires</span>
          {' '}
          avec son nom d’entreprise et le mot de passe transmis.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="border border-black/20 bg-[var(--card)] p-6">
          <h3 className="mb-5 text-xl font-semibold text-black">
            Nouveau partenaire
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            <AdminPartnerField
              id="partner-company"
              label="Entreprise"
              value={form.company}
              onChange={(value) => updateForm('company', value)}
              placeholder="Nom exact que le client utilisera"
              required
            />
            <AdminPartnerField
              id="partner-password"
              label="Mot de passe"
              type="password"
              value={form.password}
              onChange={(value) => updateForm('password', value)}
              placeholder="Minimum 10 caractères"
              required
            />
            <AdminPartnerField
              id="partner-contact"
              label="Contact client"
              value={form.contact_name}
              onChange={(value) => updateForm('contact_name', value)}
              placeholder="Nom de la personne contact"
            />
            <AdminPartnerField
              id="partner-email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => updateForm('email', value)}
              placeholder="client@entreprise.ca"
            />
            <AdminPartnerField
              id="partner-project"
              label="Nom du projet"
              value={form.project_name}
              onChange={(value) => updateForm('project_name', value)}
              placeholder="Refonte site web, audit marketing..."
            />
            <AdminPartnerField
              id="partner-status"
              label="Statut du projet"
              value={form.project_status}
              onChange={(value) => updateForm('project_status', value)}
              placeholder="En démarrage, en production..."
            />
            <div className="md:col-span-2">
              <AdminPartnerField
                id="partner-message"
                label="Message visible client"
                value={form.portal_message}
                onChange={(value) => updateForm('portal_message', value)}
                placeholder="Prochaine étape, rappel, lien important..."
                rows={4}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-black/65" aria-live="polite">
              {status}
            </p>
            <Button type="button" onClick={createAccount} disabled={isSavingAccount}>
              {isSavingAccount ? 'Création...' : 'Créer le compte'}
            </Button>
          </div>
        </section>

        <section className="border border-black/20 bg-[var(--card)] p-6">
          <h3 className="mb-5 text-xl font-semibold text-black">
            Accès existants
          </h3>
          {isLoadingAccounts ? (
            <p className="text-sm text-black/60">
              Chargement...
            </p>
          ) : accounts.length > 0 ? (
            <div className="space-y-4">
              {accounts.map((account) => (
                <article
                  key={account.id}
                  className="border border-black/15 bg-white/10 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-black">
                        {account.company}
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-black/60">
                        {account.project_name || 'Projet à préciser'}
                        {' '}
                        ·
                        {' '}
                        {account.project_status || 'Statut à préciser'}
                      </p>
                      {account.last_login_at ? (
                        <p className="mt-1 text-xs text-black/45">
                          Dernière connexion : {account.last_login_at}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {PREVIEW_FEATURES ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            setManagedAccountId((current) =>
                              current === account.id ? '' : account.id,
                            )
                          }
                        >
                          {managedAccountId === account.id ? 'Fermer' : 'Espace projet'}
                        </Button>
                      ) : null}
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => deleteAccount(account)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                  {PREVIEW_FEATURES && managedAccountId === account.id ? (
                    <PartnerProjectManager
                      key={account.updated_at}
                      account={account}
                      onAccountsUpdated={setAccounts}
                    />
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-black/60">
              Aucun compte partenaire créé pour le moment.
            </p>
          )}
        </section>
      </div>
    </section>
  )
}
