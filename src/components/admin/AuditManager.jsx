import { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui'

const auditsEndpoint = '/api/audits.php'
const auditPlanEndpoint = '/api/audit-plan.php'

function impactEffortColor(level) {
  const normalized = (level || '').toLowerCase()
  if (normalized.includes('élev') || normalized.includes('elev')) return '#004cff'
  if (normalized.includes('moyen')) return '#e8a13c'
  return '#8cc63f'
}

const DEFAULT_SECTIONS = [
  'Site web & expérience utilisateur',
  'Référencement (SEO)',
  'Réseaux sociaux',
  'Contenu & image de marque',
  'Conversion & appels à l’action',
  'Mesure & données (analytics)',
].map((title) => ({ title, score: 0, findings: '', recommendations: '' }))

function emptyAudit() {
  return {
    id: '',
    company: '',
    contact_name: '',
    website: '',
    consultant: '',
    summary: '',
    sections: DEFAULT_SECTIONS.map((section) => ({ ...section })),
  }
}

function formatDate(isoDate) {
  if (!isoDate) {
    return ''
  }

  try {
    return new Intl.DateTimeFormat('fr-CA', { dateStyle: 'long' }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

function globalScore(sections) {
  const scored = sections.filter((section) => section.score > 0)

  if (scored.length === 0) {
    return null
  }

  return (
    Math.round((scored.reduce((sum, section) => sum + section.score, 0) / scored.length) * 10) / 10
  )
}

function scoreColor(score) {
  if (score >= 4) return '#8cc63f'
  if (score >= 3) return '#004cff'
  if (score >= 2) return '#e8a13c'
  return '#d41f3d'
}

function ScoreBar({ score, height = 8 }) {
  return (
    <span
      className="block w-full bg-black/10"
      style={{ height, printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
    >
      <span
        className="block h-full transition-all duration-300"
        style={{
          width: `${(score / 5) * 100}%`,
          backgroundColor: scoreColor(score),
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact',
        }}
      />
    </span>
  )
}

function ActionPlanSection({ plan }) {
  return (
    <section className="border-t-4 border-black py-8" style={{ breakBefore: 'page' }}>
      <div className="mb-6 flex gap-2" aria-hidden="true">
        <span className="h-3 w-10" style={{ backgroundColor: '#d41f3d', printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }} />
        <span className="h-3 w-10" style={{ backgroundColor: '#004cff', printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }} />
        <span className="h-3 w-10" style={{ backgroundColor: '#8cc63f', printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }} />
      </div>
      <h1 className="text-4xl font-bold uppercase leading-none">Plan d’attaque</h1>
      <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-black/50">
        Pour réussir le mandat
      </p>

      {plan.synthese ? (
        <p className="mt-6 whitespace-pre-wrap text-base leading-7 text-black/80">{plan.synthese}</p>
      ) : null}

      {/* Priorités */}
      {(plan.priorites ?? []).length > 0 ? (
        <div className="mt-8">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: '#004cff' }}>
            Priorités stratégiques
          </h2>
          <div className="space-y-5">
            {plan.priorites.map((priorite, index) => (
              <div key={priorite.titre} className="border-l-4 pl-4" style={{ borderColor: '#004cff', breakInside: 'avoid' }}>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-bold leading-tight">
                    <span className="mr-2 text-black/35">P{index + 1}</span>
                    {priorite.titre}
                  </h3>
                  <span className="px-2 py-0.5 text-xs font-bold text-white" style={{ backgroundColor: impactEffortColor(priorite.impact), printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}>
                    Impact {priorite.impact}
                  </span>
                  <span className="border border-black/25 px-2 py-0.5 text-xs font-semibold text-black/60">
                    Effort {priorite.effort}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-black/75">{priorite.raison}</p>
                {(priorite.actions ?? []).length > 0 ? (
                  <ul className="mt-2 space-y-1">
                    {priorite.actions.map((action) => (
                      <li key={action} className="text-sm leading-6 text-black/80">→ {action}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Gains rapides */}
      {(plan.gains_rapides ?? []).length > 0 ? (
        <div className="mt-8" style={{ breakInside: 'avoid' }}>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: '#8cc63f' }}>
            Gains rapides (1-2 semaines)
          </h2>
          <ul className="space-y-1">
            {plan.gains_rapides.map((gain) => (
              <li key={gain} className="text-sm leading-6 text-black/80">✓ {gain}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Feuille de route */}
      {(plan.feuille_de_route ?? []).length > 0 ? (
        <div className="mt-8">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-black/50">
            Feuille de route
          </h2>
          <div className="space-y-3">
            {plan.feuille_de_route.map((etape, index) => (
              <div key={etape.phase} className="flex gap-4" style={{ breakInside: 'avoid' }}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: '#111827', printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}>
                  {index + 1}
                </span>
                <div>
                  <p className="text-base font-bold leading-tight">
                    {etape.phase} <span className="text-sm font-normal text-black/45">· {etape.duree}</span>
                  </p>
                  <p className="text-sm leading-6 text-black/70">{etape.objectif}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Indicateurs */}
      {(plan.indicateurs ?? []).length > 0 ? (
        <div className="mt-8" style={{ breakInside: 'avoid' }}>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: '#004cff' }}>
            Indicateurs de succès
          </h2>
          <ul className="space-y-1">
            {plan.indicateurs.map((indicateur) => (
              <li key={indicateur} className="text-sm leading-6 text-black/80">▸ {indicateur}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-6 text-[0.65rem] uppercase tracking-wide text-black/35">
        Plan généré par IA ({plan.model}) — {formatDate(plan.generated_at)} — à valider par le consultant
      </p>
    </section>
  )
}

function AuditReport({ audit, onClose, onPlanGenerated }) {
  const score = globalScore(audit.sections)
  const today = formatDate(new Date().toISOString())
  const [isGenerating, setIsGenerating] = useState(false)
  const [planError, setPlanError] = useState('')

  const generatePlan = async () => {
    setIsGenerating(true)
    setPlanError('')

    try {
      const response = await fetch(auditPlanEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: audit.id }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'La génération du plan a échoué.')
      }

      onPlanGenerated(payload.audit)
    } catch (generateError) {
      setPlanError(generateError.message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto bg-black/60 p-4 sm:p-8">
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .tmg-audit-report, .tmg-audit-report * { visibility: visible !important; }
          .tmg-audit-report { position: absolute !important; inset: 0 !important; margin: 0 !important; max-width: none !important; box-shadow: none !important; }
          .tmg-no-print { display: none !important; }
          @page { margin: 14mm; }
        }
      `}</style>

      <div className="tmg-audit-report mx-auto max-w-3xl bg-white p-8 text-black shadow-2xl sm:p-12">
        <div className="tmg-no-print mb-8 flex flex-wrap justify-end gap-3">
          <Button type="button" variant="outline" onClick={generatePlan} disabled={isGenerating}>
            {isGenerating
              ? 'Génération du plan...'
              : audit.action_plan
                ? 'Régénérer le plan d’attaque ✨'
                : 'Générer le plan d’attaque ✨'}
          </Button>
          <Button type="button" onClick={() => window.print()}>
            Imprimer / Enregistrer en PDF
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Fermer l’aperçu
          </Button>
        </div>
        {planError ? (
          <p className="tmg-no-print mb-6 border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {planError}
          </p>
        ) : null}

        {/* En-tête brandé */}
        <header className="border-b-4 border-black pb-8">
          <div className="mb-6 flex gap-2" aria-hidden="true">
            <span className="h-3 w-10" style={{ backgroundColor: '#d41f3d', printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }} />
            <span className="h-3 w-10" style={{ backgroundColor: '#004cff', printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }} />
            <span className="h-3 w-10" style={{ backgroundColor: '#8cc63f', printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-black/50">
            TMG — Tout le Monde Gagne
          </p>
          <h1 className="mt-2 text-4xl font-bold uppercase leading-none">Audit marketing</h1>
          <div className="mt-6 grid gap-1 text-sm leading-6 text-black/70">
            <p><span className="font-semibold text-black">Client :</span> {audit.company}{audit.contact_name ? ` — ${audit.contact_name}` : ''}</p>
            {audit.website ? <p><span className="font-semibold text-black">Site web :</span> {audit.website}</p> : null}
            <p><span className="font-semibold text-black">Date :</span> {today}</p>
            {audit.consultant ? <p><span className="font-semibold text-black">Consultant :</span> {audit.consultant}</p> : null}
          </div>
        </header>

        {/* Note globale */}
        {score !== null ? (
          <section className="border-b border-black/20 py-8">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-black/50">
                  Note globale
                </p>
                <p className="mt-1 text-6xl font-bold leading-none">
                  {score}<span className="text-2xl font-semibold text-black/40"> / 5</span>
                </p>
              </div>
              <div className="w-1/2">
                <ScoreBar score={score} height={14} />
              </div>
            </div>
          </section>
        ) : null}

        {/* Sommaire */}
        {audit.summary ? (
          <section className="border-b border-black/20 py-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-black/50">
              Sommaire exécutif
            </h2>
            <p className="whitespace-pre-wrap text-base leading-7 text-black/80">{audit.summary}</p>
          </section>
        ) : null}

        {/* Sections */}
        {audit.sections
          .filter((section) => section.score > 0 || section.findings || section.recommendations)
          .map((section, index) => (
            <section key={section.title} className="border-b border-black/20 py-8" style={{ breakInside: 'avoid' }}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold leading-tight">
                  <span className="mr-3 text-black/35">0{index + 1}</span>
                  {section.title}
                </h2>
                {section.score > 0 ? (
                  <span className="shrink-0 text-2xl font-bold">
                    {section.score}<span className="text-sm font-semibold text-black/40"> / 5</span>
                  </span>
                ) : null}
              </div>
              {section.score > 0 ? <ScoreBar score={section.score} /> : null}
              {section.findings ? (
                <div className="mt-5">
                  <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#004cff' }}>
                    Constats
                  </h3>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-black/80">
                    {section.findings}
                  </p>
                </div>
              ) : null}
              {section.recommendations ? (
                <div className="mt-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8cc63f' }}>
                    Recommandations
                  </h3>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-black/80">
                    {section.recommendations}
                  </p>
                </div>
              ) : null}
            </section>
          ))}

        {audit.action_plan ? <ActionPlanSection plan={audit.action_plan} /> : null}

        <footer className="pt-8 text-sm leading-6 text-black/50">
          <p className="font-semibold text-black">Prêt à passer à l’action ?</p>
          <p>
            L’équipe TMG peut vous accompagner sur chacune de ces recommandations.
            <br />
            ensemble@tmgconsultation.org · tmgconsultation.org
          </p>
        </footer>
      </div>
    </div>
  )
}

function AuditEditor({ initialAudit, onSaved, onCancel, onPreview }) {
  const [draft, setDraft] = useState(initialAudit)
  const [status, setStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const updateField = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  const updateSection = (index, field, value) => {
    setDraft((current) => ({
      ...current,
      sections: current.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section,
      ),
    }))
  }

  const save = async () => {
    if (!draft.company.trim()) {
      setStatus('Le nom du client est requis.')
      return null
    }

    setIsSaving(true)
    setStatus('Sauvegarde...')

    try {
      const response = await fetch(auditsEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: draft.id ? 'update' : 'create',
          ...draft,
        }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'La sauvegarde a échoué.')
      }

      setDraft(payload.audit)
      onSaved(payload.audits, payload.audit)
      setStatus('Audit sauvegardé.')
      return payload.audit
    } catch (saveError) {
      setStatus(saveError.message)
      return null
    } finally {
      setIsSaving(false)
    }
  }

  const saveAndPreview = async () => {
    const saved = await save()

    if (saved) {
      onPreview(saved)
    }
  }

  const inputClasses =
    'w-full border border-black/20 bg-transparent px-3 py-2 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-[var(--blue)] focus-visible:ring-2 focus-visible:ring-[var(--blue)]'

  return (
    <div className="space-y-8 border border-black/20 bg-[var(--card)] p-6">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ['company', 'Client / entreprise *', 'Ex. Boulangerie Chez Louise'],
          ['contact_name', 'Personne contact', 'Nom du contact'],
          ['website', 'Site web audité', 'https://...'],
          ['consultant', 'Consultant TMG', 'Votre nom'],
        ].map(([field, label, placeholder]) => (
          <label key={field} className="block min-w-0">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
              {label}
            </span>
            <input
              type="text"
              value={draft[field]}
              onChange={(event) => updateField(field, event.target.value)}
              placeholder={placeholder}
              className={inputClasses}
            />
          </label>
        ))}
        <label className="block min-w-0 md:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--blue)]">
            Sommaire exécutif (introduction du rapport)
          </span>
          <textarea
            rows={3}
            value={draft.summary}
            onChange={(event) => updateField('summary', event.target.value)}
            placeholder="Vue d’ensemble : forces principales, écarts majeurs, priorités."
            className={`${inputClasses} leading-6`}
          />
        </label>
      </div>

      {draft.sections.map((section, index) => (
        <div key={section.title} className="border-t border-black/15 pt-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h4 className="text-base font-semibold text-black">
              <span className="mr-2 text-black/35">0{index + 1}</span>
              {section.title}
            </h4>
            <div className="flex items-center gap-1" role="radiogroup" aria-label={`Note de ${section.title}`}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={section.score === value}
                  onClick={() => updateSection(index, 'score', section.score === value ? 0 : value)}
                  className={`h-9 w-9 border text-sm font-semibold transition ${
                    section.score >= value
                      ? 'border-[var(--blue)] bg-[var(--blue)] text-white'
                      : 'border-black/25 text-black/40 hover:border-[var(--blue)] hover:text-[var(--blue)]'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <textarea
              rows={3}
              value={section.findings}
              onChange={(event) => updateSection(index, 'findings', event.target.value)}
              placeholder="Constats : ce qui a été observé."
              className={`${inputClasses} leading-6`}
            />
            <textarea
              rows={3}
              value={section.recommendations}
              onChange={(event) => updateSection(index, 'recommendations', event.target.value)}
              placeholder="Recommandations : quoi faire, dans quel ordre."
              className={`${inputClasses} leading-6`}
            />
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-4 border-t border-black/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-black/65" aria-live="polite">
          {status || 'Notez chaque section (cliquez à nouveau pour effacer la note).'}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Retour à la liste
          </Button>
          <Button type="button" variant="outline" onClick={save} disabled={isSaving}>
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
          <Button type="button" onClick={saveAndPreview} disabled={isSaving}>
            Aperçu du rapport →
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function AuditManager() {
  const [audits, setAudits] = useState([])
  const [editingAudit, setEditingAudit] = useState(null)
  const [previewAudit, setPreviewAudit] = useState(null)
  const [status, setStatus] = useState('Chargement des audits...')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function loadAudits() {
      try {
        const response = await fetch(auditsEndpoint, {
          cache: 'no-store',
          credentials: 'same-origin',
          signal: controller.signal,
        })
        const payload = await response.json().catch(() => ({}))

        if (!isMounted) {
          return
        }

        if (!response.ok) {
          throw new Error(payload.message || 'Impossible de charger les audits.')
        }

        setAudits(Array.isArray(payload.audits) ? payload.audits : [])
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

    loadAudits()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const deleteAudit = async (audit) => {
    if (!window.confirm(`Supprimer l’audit de ${audit.company} ?`)) {
      return
    }

    try {
      const response = await fetch(auditsEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id: audit.id }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'La suppression a échoué.')
      }

      setAudits(Array.isArray(payload.audits) ? payload.audits : [])
      setStatus('Audit supprimé.')
    } catch (deleteError) {
      setStatus(deleteError.message)
    }
  }

  const scoreOf = useMemo(
    () => (audit) => globalScore(Array.isArray(audit.sections) ? audit.sections : []),
    [],
  )

  return (
    <section className="border-t border-black/25 pt-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold leading-tight text-black">
            Rapports d’audit marketing
          </h2>
          <p className="mt-2 text-base leading-7 text-black/60">
            Remplissez vos constats par section, puis générez un rapport PDF professionnel
            aux couleurs de TMG, prêt à envoyer au client.
          </p>
        </div>
        {!editingAudit ? (
          <Button type="button" onClick={() => setEditingAudit(emptyAudit())}>
            + Nouvel audit
          </Button>
        ) : null}
      </div>

      {status ? (
        <p className="mb-6 text-sm leading-6 text-black/65" aria-live="polite">
          {status}
        </p>
      ) : null}

      {editingAudit ? (
        <AuditEditor
          initialAudit={editingAudit}
          onSaved={(nextAudits) => setAudits(nextAudits)}
          onCancel={() => setEditingAudit(null)}
          onPreview={(audit) => setPreviewAudit(audit)}
        />
      ) : isLoading ? (
        <p className="text-sm uppercase text-black/60">Chargement...</p>
      ) : audits.length > 0 ? (
        <div className="space-y-3">
          {audits.map((audit) => {
            const score = scoreOf(audit)

            return (
              <article
                key={audit.id}
                className="flex flex-col gap-3 border border-black/15 bg-white/10 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h4 className="text-lg font-semibold text-black">{audit.company}</h4>
                  <p className="mt-0.5 text-sm text-black/55">
                    Modifié le {formatDate(audit.updated_at)}
                    {audit.consultant ? ` · ${audit.consultant}` : ''}
                    {score !== null ? ` · Note ${score}/5` : ' · Sans note'}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Button type="button" variant="outline" onClick={() => setEditingAudit(audit)}>
                    Modifier
                  </Button>
                  <Button type="button" onClick={() => setPreviewAudit(audit)}>
                    Rapport →
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => deleteAudit(audit)}>
                    Supprimer
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <p className="text-sm leading-6 text-black/60">
          Aucun audit pour le moment. Cliquez sur « + Nouvel audit » pour commencer.
        </p>
      )}

      {previewAudit ? (
        <AuditReport
          audit={previewAudit}
          onClose={() => setPreviewAudit(null)}
          onPlanGenerated={(updatedAudit) => {
            setPreviewAudit(updatedAudit)
            setAudits((current) =>
              current.map((item) => (item.id === updatedAudit.id ? updatedAudit : item)),
            )
          }}
        />
      ) : null}
    </section>
  )
}
