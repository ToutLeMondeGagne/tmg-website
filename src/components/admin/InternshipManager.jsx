import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../ui'

const leadsEndpoint = '/api/leads.php'
const cvDownloadEndpoint = '/api/cv-download.php'
const cvAnalyzeEndpoint = '/api/cv-analyze.php'
const jobDescriptionStorageKey = 'tmg-admin-poste-recherche'

function scoreClasses(score) {
  if (score >= 75) return 'bg-[var(--green)] text-black'
  if (score >= 55) return 'bg-[var(--blue)] text-white'
  if (score >= 35) return 'bg-amber-400 text-black'
  return 'bg-red-600 text-white'
}

const APPLICATION_STATUSES = [
  { value: 'recue', label: 'Reçue', color: 'bg-[var(--blue)] text-white' },
  { value: 'entrevue', label: 'Entrevue', color: 'bg-[var(--green)] text-black' },
  { value: 'acceptee', label: 'Acceptée ✓', color: 'bg-black text-[var(--green)]' },
  { value: 'refusee', label: 'Refusée', color: 'bg-black/25 text-black/60' },
]

function statusMeta(value) {
  return (
    APPLICATION_STATUSES.find((status) => status.value === value) ?? APPLICATION_STATUSES[0]
  )
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

function sessionLabel(isoDate) {
  if (!isoDate) {
    return ''
  }

  const date = new Date(isoDate)
  const month = date.getMonth()
  const season = month <= 3 ? 'Hiver' : month <= 7 ? 'Été' : 'Automne'

  return `${season} ${date.getFullYear()}`
}

function replyMailto(application) {
  const subject = encodeURIComponent('Votre candidature de stage chez TMG')
  const body = encodeURIComponent(
    `Bonjour ${application.name},\n\n` +
      'Merci pour ta candidature au programme de stage TMG. \n\n' +
      '\n\nL’équipe TMG\ntmgconsultation.org',
  )

  return `mailto:${application.email}?subject=${subject}&body=${body}`
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

function AnalysisPanel({ analysis }) {
  return (
    <div className="mt-4 border border-black/15 border-l-4 border-l-[var(--blue)] bg-white/20 p-4">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className={`px-3 py-1 text-sm font-bold ${scoreClasses(analysis.score)}`}>
          {analysis.score} / 100
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-black/55">
          Pertinence : {analysis.niveau}
        </span>
        {analysis.poste_evalue ? (
          <span className="text-xs text-black/45">
            Évalué pour : {analysis.poste_evalue}
          </span>
        ) : null}
        {analysis.cv_note ? (
          <span className="text-xs text-black/45">⚠ {analysis.cv_note}</span>
        ) : null}
      </div>
      <p className="text-sm leading-6 text-black/80">{analysis.resume}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {(analysis.forces ?? []).length > 0 ? (
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wide text-[var(--blue)]">Forces</h5>
            <ul className="mt-1 space-y-1">
              {analysis.forces.map((item) => (
                <li key={item} className="text-sm leading-6 text-black/70">＋ {item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {(analysis.lacunes ?? []).length > 0 ? (
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wide text-black/50">À valider</h5>
            <ul className="mt-1 space-y-1">
              {analysis.lacunes.map((item) => (
                <li key={item} className="text-sm leading-6 text-black/70">− {item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      {(analysis.questions_entrevue ?? []).length > 0 ? (
        <div className="mt-3">
          <h5 className="text-xs font-bold uppercase tracking-wide text-[var(--green)]">
            Questions d’entrevue suggérées
          </h5>
          <ul className="mt-1 space-y-1">
            {analysis.questions_entrevue.map((item) => (
              <li key={item} className="text-sm leading-6 text-black/70">? {item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="mt-3 text-[0.65rem] uppercase tracking-wide text-black/35">
        Analyse IA ({analysis.model}) — {formatDate(analysis.analyzed_at)} — à confirmer par un humain
      </p>
    </div>
  )
}

function ApplicationCard({ application, onUpdate, onDelete, onAnalyze, isAnalyzing }) {
  const [notes, setNotes] = useState(application.notes ?? '')
  const [isSavingNotes, setIsSavingNotes] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const meta = statusMeta(application.status)
  const notesChanged = notes !== (application.notes ?? '')

  const saveNotes = async () => {
    setIsSavingNotes(true)
    await onUpdate(application.id, { notes })
    setIsSavingNotes(false)
  }

  return (
    <article className="border border-black/15 bg-white/10 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="text-lg font-semibold leading-tight text-black">
              {application.name}
            </h4>
            <span className="bg-black/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-black/60">
              {sessionLabel(application.created_at)}
            </span>
            {application.fields?.['Centre d’intérêt'] ? (
              <span className="bg-[var(--blue)]/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--blue)]">
                {application.fields['Centre d’intérêt']}
              </span>
            ) : null}
            {application.analysis ? (
              <span className={`px-2 py-0.5 text-[0.7rem] font-bold ${scoreClasses(application.analysis.score)}`}>
                ★ {application.analysis.score}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm leading-6 text-black/60">
            <a
              href={`mailto:${application.email}`}
              className="font-medium text-[var(--blue)] transition hover:text-blue-800"
            >
              {application.email}
            </a>
            {application.fields?.['Téléphone'] ? <> · {application.fields['Téléphone']}</> : null}
            {application.fields?.['Ville'] ? <> · {application.fields['Ville']}</> : null}
          </p>
          {application.fields?.['École / programme'] ? (
            <p className="mt-1 text-sm leading-6 text-black/70">
              🎓 {application.fields['École / programme']}
            </p>
          ) : null}
          <p className="mt-1 text-xs uppercase tracking-wide text-black/40">
            Reçue le {formatDate(application.created_at)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide ${meta.color}`}>
            {meta.label}
          </span>
          <select
            value={application.status}
            onChange={(event) => onUpdate(application.id, { status: event.target.value })}
            aria-label={`Statut de la candidature de ${application.name}`}
            className="border border-black/25 bg-transparent px-3 py-2 text-sm text-black outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)]"
          >
            {APPLICATION_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-black/10 pt-4">
        {application.has_cv ? (
          <a
            href={`${cvDownloadEndpoint}?id=${encodeURIComponent(application.id)}`}
            className="border border-[var(--blue)] bg-[var(--blue)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-blue-700"
          >
            Télécharger le CV ↓
          </a>
        ) : (
          <span className="border border-black/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black/40">
            Aucun CV joint
          </span>
        )}
        <a
          href={replyMailto(application)}
          className="border border-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black/70 transition hover:border-[var(--blue)] hover:text-[var(--blue)]"
        >
          Répondre par courriel ✉
        </a>
        <button
          type="button"
          onClick={() => onAnalyze(application)}
          disabled={isAnalyzing}
          className="border border-[var(--green)] bg-[var(--green)]/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black transition hover:bg-[var(--green)] disabled:cursor-wait disabled:opacity-60"
        >
          {isAnalyzing
            ? 'Analyse en cours...'
            : application.analysis
              ? 'Ré-analyser ✨'
              : 'Analyser la pertinence ✨'}
        </button>
        <button
          type="button"
          onClick={() => setShowDetails((current) => !current)}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black/50 transition hover:text-[var(--blue)]"
        >
          {showDetails ? '− Masquer la motivation' : '+ Lire la motivation'}
        </button>
      </div>

      {application.analysis ? <AnalysisPanel analysis={application.analysis} /> : null}

      {showDetails ? (
        <dl className="mt-4 grid gap-3">
          {['Pourquoi TMG', 'Message'].map((label) =>
            application.fields?.[label] ? (
              <div key={label} className="min-w-0 border-l-2 border-[var(--blue)] pl-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
                  {label}
                </dt>
                <dd className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-black/75">
                  {application.fields[label]}
                </dd>
              </div>
            ) : null,
          )}
        </dl>
      ) : null}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="block min-w-0 flex-1">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-black/50">
            Notes d’évaluation
          </span>
          <textarea
            rows={2}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Impressions d’entrevue, disponibilités, points forts..."
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
          <Button type="button" variant="ghost" onClick={() => onDelete(application)}>
            Supprimer
          </Button>
        </div>
      </div>
    </article>
  )
}

export default function InternshipManager() {
  const [applications, setApplications] = useState([])
  const [statusFilter, setStatusFilter] = useState('tous')
  const [status, setStatus] = useState('Chargement des candidatures...')
  const [isLoading, setIsLoading] = useState(true)
  const [jobDescription, setJobDescription] = useState(() => {
    try {
      return window.localStorage.getItem(jobDescriptionStorageKey) ?? ''
    } catch {
      return ''
    }
  })
  const [sortByScore, setSortByScore] = useState(false)
  const [analyzingIds, setAnalyzingIds] = useState([])

  const updateJobDescription = (value) => {
    setJobDescription(value)

    try {
      window.localStorage.setItem(jobDescriptionStorageKey, value)
    } catch {
      // localStorage indisponible : le champ reste utilisable pour la session.
    }
  }

  const jobDescriptionRef = useRef(null)

  const analyzeApplication = async (application) => {

    setAnalyzingIds((current) => [...current, application.id])
    setStatus('')

    try {
      const response = await fetch(cvAnalyzeEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: application.id, job_description: jobDescription.trim() }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'L’analyse a échoué.')
      }

      setApplications((current) =>
        current.map((item) => (item.id === application.id ? payload.lead : item)),
      )
    } catch (analyzeError) {
      setStatus(analyzeError.message)
    } finally {
      setAnalyzingIds((current) => current.filter((id) => id !== application.id))
    }
  }

  const analyzeAllPending = async () => {
    const pending = applications.filter((application) => !application.analysis)

    for (const application of pending) {
      // Analyses en série pour rester dans les limites de l'API.
      await analyzeApplication(application)
    }
  }

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function loadApplications() {
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
          throw new Error(payload.message || 'Impossible de charger les candidatures.')
        }

        const leads = Array.isArray(payload.leads) ? payload.leads : []
        setApplications(leads.filter((lead) => lead.form_type === 'internship'))
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

    loadApplications()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const updateApplication = async (id, changes) => {
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

      setApplications((current) =>
        current.map((application) => (application.id === id ? payload.lead : application)),
      )
      setStatus('')
    } catch (updateError) {
      setStatus(updateError.message)
    }
  }

  const deleteApplication = async (application) => {
    const confirmed = window.confirm(`Supprimer la candidature de ${application.name} ?`)

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
        body: JSON.stringify({ action: 'delete', id: application.id }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'La suppression a échoué.')
      }

      const leads = Array.isArray(payload.leads) ? payload.leads : []
      setApplications(leads.filter((lead) => lead.form_type === 'internship'))
      setStatus('Candidature supprimée.')
    } catch (deleteError) {
      setStatus(deleteError.message)
    }
  }

  const stats = useMemo(() => {
    const byStatus = Object.fromEntries(APPLICATION_STATUSES.map((s) => [s.value, 0]))

    for (const application of applications) {
      if (byStatus[application.status] !== undefined) {
        byStatus[application.status] += 1
      }
    }

    return {
      total: applications.length,
      recues: byStatus.recue,
      entrevues: byStatus.entrevue,
      acceptees: byStatus.acceptee,
    }
  }, [applications])

  const visibleApplications = useMemo(() => {
    const filtered = statusFilter === 'tous'
      ? applications
      : applications.filter((application) => application.status === statusFilter)

    if (!sortByScore) {
      return filtered
    }

    // Classement par pertinence : analysées d'abord (score décroissant).
    return [...filtered].sort(
      (a, b) => (b.analysis?.score ?? -1) - (a.analysis?.score ?? -1),
    )
  }, [applications, statusFilter, sortByScore])

  const pendingAnalysisCount = applications.filter((a) => !a.analysis).length

  return (
    <section className="border-t border-black/25 pt-8">
      <div className="mb-8 max-w-3xl">
        <h2 className="text-3xl font-semibold leading-tight text-black">
          Candidatures stagiaires
        </h2>
        <p className="mt-2 text-base leading-7 text-black/60">
          Chaque candidature du formulaire stagiaire est enregistrée ici avec son CV.
          Faites avancer chaque profil dans le pipeline jusqu’à la décision.
        </p>
      </div>

      <div className="mb-6 grid gap-px border border-black/20 bg-black/15 sm:grid-cols-4">
        <StatCell label="Total" value={stats.total} />
        <StatCell label="À évaluer" value={stats.recues} accent />
        <StatCell label="En entrevue" value={stats.entrevues} accent />
        <StatCell label="Acceptées" value={stats.acceptees} />
      </div>

      <div className="mb-6 border border-black/20 bg-[var(--card)] p-5">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
            Précisions sur le poste (optionnel)
          </span>
          <span className="mb-2 block text-xs leading-5 text-black/50">
            L’analyse évalue automatiquement chaque candidature selon le domaine choisi par le
            candidat dans le formulaire (marketing, stratégie ou développement). Ajoutez ici des
            exigences supplémentaires si désiré.
          </span>
          <textarea
            ref={jobDescriptionRef}
            rows={2}
            value={jobDescription}
            onChange={(event) => updateJobDescription(event.target.value)}
            placeholder="Ex. Priorité aux profils disponibles 3 jours/semaine, à l’aise en création de contenu vidéo."
            className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm leading-6 text-black outline-none transition placeholder:text-black/35 focus:border-[var(--blue)] focus-visible:ring-2 focus-visible:ring-[var(--blue)]"
          />
        </label>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={analyzeAllPending}
            disabled={analyzingIds.length > 0 || pendingAnalysisCount === 0}
          >
            {analyzingIds.length > 0
              ? `Analyse en cours (${analyzingIds.length})...`
              : `Analyser les ${pendingAnalysisCount} candidatures sans score`}
          </Button>
          <button
            type="button"
            onClick={() => setSortByScore((current) => !current)}
            className={`border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
              sortByScore
                ? 'border-[var(--blue)] bg-[var(--blue)] text-white'
                : 'border-black/25 text-black/60 hover:border-[var(--blue)] hover:text-[var(--blue)]'
            }`}
          >
            {sortByScore ? '★ Tri par pertinence actif' : 'Trier par pertinence'}
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {[{ value: 'tous', label: `Toutes (${applications.length})` }, ...APPLICATION_STATUSES].map(
          (option) => (
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
          ),
        )}
      </div>

      {status ? (
        <p className="mb-6 text-sm leading-6 text-black/65" aria-live="polite">
          {status}
        </p>
      ) : null}

      {isLoading ? (
        <p className="text-sm uppercase text-black/60">Chargement...</p>
      ) : visibleApplications.length > 0 ? (
        <div className="space-y-4">
          {visibleApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onUpdate={updateApplication}
              onDelete={deleteApplication}
              onAnalyze={analyzeApplication}
              isAnalyzing={analyzingIds.includes(application.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm leading-6 text-black/60">
          {statusFilter === 'tous'
            ? 'Aucune candidature reçue pour le moment. Les prochaines soumissions du formulaire stagiaire apparaîtront ici.'
            : 'Aucune candidature avec ce statut.'}
        </p>
      )}
    </section>
  )
}
