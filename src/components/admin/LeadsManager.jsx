import { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui'

const leadsEndpoint = '/api/leads.php'

const LEAD_STATUSES = [
  { value: 'nouveau', label: 'Nouveau', color: 'bg-[var(--blue)] text-white' },
  { value: 'contacte', label: 'Contacté', color: 'bg-black/70 text-white' },
  { value: 'rencontre', label: 'Rencontre', color: 'bg-[var(--green)] text-black' },
  { value: 'client', label: 'Client ✓', color: 'bg-black text-[var(--green)]' },
  { value: 'perdu', label: 'Perdu', color: 'bg-black/25 text-black/60' },
]

const TYPE_LABELS = {
  contact: 'Contact',
  internship: 'Stage',
}

function statusMeta(value) {
  return LEAD_STATUSES.find((status) => status.value === value) ?? LEAD_STATUSES[0]
}

function formatDate(isoDate) {
  if (!isoDate) {
    return ''
  }

  try {
    return new Intl.DateTimeFormat('fr-CA', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

function isThisMonth(isoDate) {
  if (!isoDate) {
    return false
  }

  const date = new Date(isoDate)
  const now = new Date()

  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
}

function StatCell({ label, value, accent = false }) {
  return (
    <div className="bg-[var(--bg)] p-4">
      <p className={`text-3xl font-semibold leading-none ${accent ? 'text-[var(--blue)]' : 'text-black'}`}>
        {value}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-black/50">{label}</p>
    </div>
  )
}

function LeadCard({ lead, onUpdate, onDelete }) {
  const [notes, setNotes] = useState(lead.notes ?? '')
  const [isSavingNotes, setIsSavingNotes] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const meta = statusMeta(lead.status)
  const notesChanged = notes !== (lead.notes ?? '')

  const saveNotes = async () => {
    setIsSavingNotes(true)
    await onUpdate(lead.id, { notes })
    setIsSavingNotes(false)
  }

  return (
    <article className="border border-black/15 bg-white/10 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="text-lg font-semibold leading-tight text-black">{lead.name}</h4>
            <span className="bg-black/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-black/60">
              {TYPE_LABELS[lead.form_type] ?? lead.form_type}
            </span>
            {lead.has_cv ? (
              <span className="bg-[var(--green)]/30 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-black/70">
                CV joint
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm leading-6 text-black/60">
            <a
              href={`mailto:${lead.email}`}
              className="font-medium text-[var(--blue)] transition hover:text-blue-800"
            >
              {lead.email}
            </a>
            {lead.fields?.['Téléphone'] ? <> · {lead.fields['Téléphone']}</> : null}
            {lead.fields?.['Entreprise'] ? <> · {lead.fields['Entreprise']}</> : null}
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-black/40">
            Reçu le {formatDate(lead.created_at)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide ${meta.color}`}>
            {meta.label}
          </span>
          <select
            value={lead.status}
            onChange={(event) => onUpdate(lead.id, { status: event.target.value })}
            aria-label={`Statut de ${lead.name}`}
            className="border border-black/25 bg-transparent px-3 py-2 text-sm text-black outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)]"
          >
            {LEAD_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 border-t border-black/10 pt-4">
        <button
          type="button"
          onClick={() => setShowDetails((current) => !current)}
          className="text-xs font-semibold uppercase tracking-wide text-black/50 transition hover:text-[var(--blue)]"
        >
          {showDetails ? '− Masquer les détails' : '+ Voir les détails de la demande'}
        </button>

        {showDetails ? (
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(lead.fields ?? {}).map(([label, value]) => (
              <div key={label} className="min-w-0">
                <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
                  {label}
                </dt>
                <dd className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-black/75">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="block min-w-0 flex-1">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-black/50">
              Notes internes
            </span>
            <textarea
              rows={2}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Rappel fait le..., attend une soumission..., etc."
              className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm leading-6 text-black outline-none transition placeholder:text-black/35 focus:border-[var(--blue)] focus-visible:ring-2 focus-visible:ring-[var(--blue)]"
            />
          </label>
          <div className="flex shrink-0 gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={!notesChanged || isSavingNotes}
              onClick={saveNotes}
            >
              {isSavingNotes ? 'Sauvegarde...' : 'Sauvegarder la note'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => onDelete(lead)}>
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function LeadsManager() {
  const [leads, setLeads] = useState([])
  const [statusFilter, setStatusFilter] = useState('tous')
  const [status, setStatus] = useState('Chargement des prospects...')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function loadLeads() {
      try {
        const response = await fetch(leadsEndpoint, {
          cache: 'no-store',
          credentials: 'same-origin',
          signal: controller.signal,
        })
        const payload = await response.json().catch(() => ({}))

        if (!isMounted) {
          return
        }

        if (!response.ok) {
          throw new Error(payload.message || 'Impossible de charger les prospects.')
        }

        const allLeads = Array.isArray(payload.leads) ? payload.leads : []
        // Les candidatures de stage ont leur propre section (InternshipManager).
        setLeads(allLeads.filter((lead) => lead.form_type !== 'internship'))
        setStatus('')
      } catch (loadError) {
        if (isMounted && loadError.name !== 'AbortError') {
          setStatus(`${loadError.message} Cette section fonctionne sur le serveur après connexion admin.`)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadLeads()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const updateLead = async (id, changes) => {
    try {
      const response = await fetch(leadsEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'update', id, ...changes }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'La mise à jour a échoué.')
      }

      setLeads((currentLeads) =>
        currentLeads.map((lead) => (lead.id === id ? payload.lead : lead)),
      )
      setStatus('')
    } catch (updateError) {
      setStatus(updateError.message)
    }
  }

  const deleteLead = async (lead) => {
    const confirmed = window.confirm(`Supprimer la demande de ${lead.name} ?`)

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(leadsEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'delete', id: lead.id }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'La suppression a échoué.')
      }

      const remainingLeads = Array.isArray(payload.leads) ? payload.leads : []
      setLeads(remainingLeads.filter((remaining) => remaining.form_type !== 'internship'))
      setStatus('Demande supprimée.')
    } catch (deleteError) {
      setStatus(deleteError.message)
    }
  }

  const stats = useMemo(() => {
    const byStatus = Object.fromEntries(LEAD_STATUSES.map((s) => [s.value, 0]))

    for (const lead of leads) {
      if (byStatus[lead.status] !== undefined) {
        byStatus[lead.status] += 1
      }
    }

    return {
      total: leads.length,
      thisMonth: leads.filter((lead) => isThisMonth(lead.created_at)).length,
      nouveaux: byStatus.nouveau,
      clients: byStatus.client,
    }
  }, [leads])

  const visibleLeads = useMemo(() => {
    if (statusFilter === 'tous') {
      return leads
    }

    return leads.filter((lead) => lead.status === statusFilter)
  }, [leads, statusFilter])

  return (
    <section className="border-t border-black/25 pt-8">
      <div className="mb-8 max-w-3xl">
        <h2 className="text-3xl font-semibold leading-tight text-black">
          Prospects & demandes
        </h2>
        <p className="mt-2 text-base leading-7 text-black/60">
          Chaque soumission des formulaires du site est enregistrée ici automatiquement,
          en plus du courriel. Suivez le statut de chaque demande jusqu’à la conversion.
        </p>
      </div>

      <div className="mb-6 grid gap-px border border-black/20 bg-black/15 sm:grid-cols-4">
        <StatCell label="Total" value={stats.total} />
        <StatCell label="Ce mois-ci" value={stats.thisMonth} accent />
        <StatCell label="À traiter" value={stats.nouveaux} accent />
        <StatCell label="Clients gagnés" value={stats.clients} />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {[{ value: 'tous', label: `Tous (${leads.length})` }, ...LEAD_STATUSES].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setStatusFilter(option.value)}
            className={`border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
              statusFilter === option.value
                ? 'border-[var(--blue)] bg-[var(--blue)] text-white'
                : 'border-black/25 bg-transparent text-black/60 hover:border-[var(--blue)] hover:text-[var(--blue)]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {status ? (
        <p className="mb-6 text-sm leading-6 text-black/65" aria-live="polite">
          {status}
        </p>
      ) : null}

      {isLoading ? (
        <p className="text-sm uppercase text-black/60">Chargement...</p>
      ) : visibleLeads.length > 0 ? (
        <div className="space-y-4">
          {visibleLeads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onUpdate={updateLead} onDelete={deleteLead} />
          ))}
        </div>
      ) : (
        <p className="text-sm leading-6 text-black/60">
          {statusFilter === 'tous'
            ? 'Aucune demande reçue pour le moment. Les prochaines soumissions des formulaires apparaîtront ici.'
            : 'Aucune demande avec ce statut.'}
        </p>
      )}
    </section>
  )
}
