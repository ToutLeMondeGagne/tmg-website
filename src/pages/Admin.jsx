import { useState } from 'react'
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

const tokenStorageKey = 'tmg:admin-token'

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
  const contentKey = JSON.stringify(content)

  return (
    <AdminEditor
      key={contentKey}
      content={content}
      error={error}
      isLoading={isLoading}
      replaceContent={replaceContent}
    />
  )
}

function AdminEditor({ content, error, isLoading, replaceContent }) {
  const [draft, setDraft] = useState(() => cloneContent(content))
  const [token, setToken] = useState(() => {
    try {
      return window.localStorage.getItem(tokenStorageKey) ?? ''
    } catch {
      return ''
    }
  })
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

    if (!token.trim()) {
      setStatus('Ajoutez le token admin configuré sur SiteGround avant de sauvegarder.')
      return
    }

    setIsSaving(true)
    setStatus('Sauvegarde en cours...')

    try {
      const response = await fetch('/api/content.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-TMG-Admin-Token': token.trim(),
        },
        body: JSON.stringify({ content: draft }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'La sauvegarde serveur a échoué.')
      }

      try {
        window.localStorage.setItem(tokenStorageKey, token.trim())
      } catch {
        // The token can still be used for this save even if localStorage is blocked.
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
              Les champs ci-dessous couvrent la page d’accueil et peuvent être
              étendus aux autres pages ensuite.
            </p>
            {error ? (
              <p className="border border-black/20 bg-white/20 p-4 text-sm leading-6 text-black/70">
                Le fichier distant n’a pas été chargé, les textes par défaut sont utilisés.
              </p>
            ) : null}
          </div>
        </section>

        <form className="space-y-10 py-12 text-left" onSubmit={saveDraft}>
          <section className="grid gap-5 border border-black/20 bg-[var(--card)] p-6 md:grid-cols-[1fr_0.7fr] md:items-end">
            <label className="block">
              <span className="mb-2 block text-sm font-medium uppercase text-[var(--blue)]">
                Token admin SiteGround
              </span>
              <input
                type="password"
                value={token}
                onChange={(event) => setToken(event.target.value)}
                autoComplete="current-password"
                className="w-full border border-[var(--blue)] bg-transparent px-4 py-3 text-base text-black outline-none focus:bg-white/30 focus-visible:ring-2 focus-visible:ring-[var(--blue)]"
                placeholder="Token configuré dans api/admin-config.php"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Button type="button" variant="outline" onClick={previewDraft}>
                Prévisualiser
              </Button>
              <Button type="button" variant="ghost" onClick={() => downloadJson(draft)}>
                Télécharger JSON
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
      </PageContainer>
    </main>
  )
}
