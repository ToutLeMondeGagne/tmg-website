import { useState } from 'react'
import { Button } from '../ui'

const accountsEndpoint = '/api/partner-accounts.php'
const uploadEndpoint = '/api/partner-upload.php'
const downloadEndpoint = '/api/partner-file-download.php'

const MILESTONE_STATES = [
  { value: 'done', label: 'Terminé ✓' },
  { value: 'active', label: 'En cours ●' },
  { value: 'todo', label: 'À venir ○' },
]

function formatDate(isoDate) {
  if (!isoDate) {
    return ''
  }

  try {
    return new Intl.DateTimeFormat('fr-CA', { dateStyle: 'medium' }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

function formatSize(bytes) {
  if (!bytes) {
    return ''
  }

  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
    : `${Math.max(1, Math.round(bytes / 1024))} Ko`
}

export default function PartnerProjectManager({ account, onAccountsUpdated }) {
  const [milestones, setMilestones] = useState(
    (account.milestones ?? []).map((milestone) => ({ ...milestone })),
  )
  const [newMilestone, setNewMilestone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [isBusy, setIsBusy] = useState(false)

  const postAction = async (body, isForm = false) => {
    setIsBusy(true)
    setStatus('')

    try {
      const response = await fetch(isForm ? uploadEndpoint : accountsEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: isForm ? undefined : { 'Content-Type': 'application/json' },
        body: isForm ? body : JSON.stringify(body),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'L’action a échoué.')
      }

      if (Array.isArray(payload.accounts)) {
        onAccountsUpdated(payload.accounts)
      }

      setStatus(payload.message || 'Espace projet mis à jour.')
      return payload
    } catch (actionError) {
      setStatus(actionError.message)
      return null
    } finally {
      setIsBusy(false)
    }
  }

  const saveMilestones = (nextMilestones) => {
    setMilestones(nextMilestones)
    postAction({ action: 'update-milestones', id: account.id, milestones: nextMilestones })
  }

  const addMilestone = () => {
    const title = newMilestone.trim()

    if (!title) {
      return
    }

    setNewMilestone('')
    saveMilestones([...milestones, { title, state: 'todo' }])
  }

  const sendMessage = async () => {
    const text = message.trim()

    if (!text) {
      return
    }

    const payload = await postAction({ action: 'add-message', id: account.id, text })

    if (payload) {
      setMessage('')
    }
  }

  const uploadFile = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('id', account.id)
    formData.append('file', file)
    postAction(formData, true)
    event.target.value = ''
  }

  return (
    <div className="mt-4 space-y-6 border-t border-black/15 pt-4">
      {/* ===== Jalons ===== */}
      <div>
        <h5 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
          Jalons du projet (visibles par le client)
        </h5>
        <div className="space-y-2">
          {milestones.map((milestone, index) => (
            <div key={`${milestone.title}-${index}`} className="flex items-center gap-2">
              <input
                type="text"
                value={milestone.title}
                onChange={(event) => {
                  const next = milestones.map((m, i) =>
                    i === index ? { ...m, title: event.target.value } : m,
                  )
                  setMilestones(next)
                }}
                onBlur={() => saveMilestones(milestones)}
                className="min-w-0 flex-1 border border-black/20 bg-transparent px-3 py-2 text-sm text-black outline-none focus:border-[var(--blue)]"
              />
              <select
                value={milestone.state}
                onChange={(event) =>
                  saveMilestones(
                    milestones.map((m, i) =>
                      i === index ? { ...m, state: event.target.value } : m,
                    ),
                  )
                }
                className="border border-black/20 bg-transparent px-2 py-2 text-sm text-black outline-none"
              >
                {MILESTONE_STATES.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => saveMilestones(milestones.filter((_, i) => i !== index))}
                aria-label={`Supprimer le jalon ${milestone.title}`}
                className="px-2 py-2 text-black/40 transition hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMilestone}
              onChange={(event) => setNewMilestone(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  addMilestone()
                }
              }}
              placeholder="Nouveau jalon (ex. Maquette approuvée)"
              className="min-w-0 flex-1 border border-dashed border-black/25 bg-transparent px-3 py-2 text-sm text-black outline-none placeholder:text-black/35 focus:border-[var(--blue)]"
            />
            <Button type="button" variant="outline" onClick={addMilestone} disabled={isBusy}>
              Ajouter
            </Button>
          </div>
        </div>
      </div>

      {/* ===== Messages ===== */}
      <div>
        <h5 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
          Messages au client
        </h5>
        {(account.messages ?? []).length > 0 ? (
          <ul className="mb-3 space-y-2">
            {[...account.messages].reverse().map((entry) => (
              <li
                key={entry.id}
                className="flex items-start justify-between gap-3 border-l-2 border-[var(--blue)] bg-white/20 py-2 pl-3 pr-2"
              >
                <div className="min-w-0">
                  <p className="whitespace-pre-wrap break-words text-sm leading-6 text-black/80">
                    {entry.text}
                  </p>
                  <p className="mt-1 text-xs uppercase text-black/40">
                    {formatDate(entry.created_at)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    postAction({ action: 'delete-message', id: account.id, message_id: entry.id })
                  }
                  aria-label="Supprimer ce message"
                  className="px-1 text-black/40 transition hover:text-red-600"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <textarea
            rows={2}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Prochaine étape, rappel, information importante..."
            className="min-w-0 flex-1 border border-black/20 bg-transparent px-3 py-2 text-sm leading-6 text-black outline-none placeholder:text-black/35 focus:border-[var(--blue)]"
          />
          <Button type="button" onClick={sendMessage} disabled={isBusy || !message.trim()}>
            Publier le message
          </Button>
        </div>
      </div>

      {/* ===== Livrables ===== */}
      <div>
        <h5 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
          Livrables partagés
        </h5>
        {(account.files ?? []).length > 0 ? (
          <ul className="mb-3 space-y-2">
            {account.files.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between gap-3 border border-black/15 bg-white/20 px-3 py-2"
              >
                <a
                  href={`${downloadEndpoint}?id=${encodeURIComponent(account.id)}&file=${encodeURIComponent(file.id)}`}
                  className="min-w-0 truncate text-sm font-medium text-[var(--blue)] transition hover:text-blue-800"
                >
                  📄 {file.filename}
                </a>
                <span className="shrink-0 text-xs text-black/45">
                  {formatSize(file.size)} · {formatDate(file.uploaded_at)}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    postAction({ action: 'delete-file', id: account.id, file_id: file.id })
                  }
                  aria-label={`Supprimer ${file.filename}`}
                  className="px-1 text-black/40 transition hover:text-red-600"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <label className="inline-flex cursor-pointer items-center gap-2 border border-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black/70 transition hover:border-[var(--blue)] hover:text-[var(--blue)]">
          + Téléverser un livrable
          <input type="file" className="hidden" onChange={uploadFile} disabled={isBusy} />
        </label>
      </div>

      {status ? (
        <p className="text-sm leading-6 text-black/65" aria-live="polite">
          {status}
        </p>
      ) : null}
    </div>
  )
}
