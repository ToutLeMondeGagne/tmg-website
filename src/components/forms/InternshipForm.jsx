import { useState } from 'react'
import Button from '../ui/Button'
import DropdownField from './DropdownField'
import FileField from './FileField'
import TextArea from './TextArea'
import TextInput from './TextInput'

const contactEndpoint = '/api/contact.php'

const interests = [
  { value: 'consultation marketing', label: 'Consultation marketing' },
  { value: 'consultation en stratégie', label: 'Consultation en stratégie' },
  { value: 'consultation en développement', label: 'Consultation en développement' },
]



function FormSection({ number, title, children }) {
  return (
    <section className="border-b border-black/25 pb-8 last:border-b-0 last:pb-0">
      <h3 className="mb-7 text-2xl font-semibold leading-none text-black">
        <span className="font-medium">{number}</span> | {title}
      </h3>
      {children}
    </section>
  )
}

export default function InternshipForm() {
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append('form_type', 'internship')

    setIsSubmitting(true)
    setStatus('Envoi de ta candidature...')

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        body: formData,
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'L’envoi de la candidature a échoué.')
      }

      form.reset()
      setStatus('Merci. Ta candidature a bien été envoyée à l’équipe TMG.')
    } catch (submitError) {
      setStatus(`${submitError.message} Réessaie ou écris-nous directement par courriel.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <FormSection number="01" title="Ton profil">
        <div className="grid gap-6 md:grid-cols-2">
          <TextInput
            label="Nom complet"
            name="name"
            autoComplete="name"
            placeholder="Ton nom"
            required
          />
          <TextInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="toi@exemple.com"
            required
          />
          <TextInput
            label="Téléphone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Optionnel"
          />
          <TextInput
            label="Ville"
            name="city"
            autoComplete="address-level2"
            placeholder="Montréal, Laval, etc."
          />
          <TextInput
            className="md:col-span-2"
            label="École / programme"
            name="program"
            placeholder="Nom de ton école et programme d’études"
            required
          />
        </div>
      </FormSection>

      <FormSection number="02" title="Ton stage">
        <div className="grid gap-6 md:grid-cols-2">
          <DropdownField
            label="Centre d’intérêt"
            name="interest"
            placeholder="Choisir un domaine"
            options={interests}
            required
          />
          
         
        </div>
      </FormSection>

      <FormSection number="03" title="Ta motivation">
        <div className="grid gap-6 md:grid-cols-2">
          <FileField
            className="md:col-span-2"
            label="CV"
            name="cv"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            hint="Téléverse ton CV — formats acceptés : PDF, DOC, DOCX (5 Mo maximum)."
          />

          <TextArea
            className="md:col-span-2"
            label="Pourquoi TMG"
            name="motivation"
            placeholder="Explique ce que tu veux apprendre et pourquoi ce stage t’intéresse."
            required
          />
          <TextArea
            className="md:col-span-2"
            label="Message"
            name="message"
            placeholder="Ajoute tes contraintes d’horaire, objectifs scolaires ou détails utiles."
            rows={4}
          />
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi...' : 'Envoyer la candidature'}
          </Button>
          <p className="text-sm leading-6 text-black/60" aria-live="polite">
            {status || 'Ce formulaire est réservé aux candidatures de stage.'}
          </p>
        </div>
      </FormSection>
    </form>
  )
}
