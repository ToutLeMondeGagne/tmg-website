import { useState } from 'react'
import Button from '../ui/Button'
import DropdownField from './DropdownField'
import TextArea from './TextArea'
import TextInput from './TextInput'

const interests = [
  { value: 'marketing', label: 'Marketing numérique' },
  { value: 'design', label: 'Design / expérience utilisateur' },
  { value: 'contenu', label: 'Création de contenu' },
  { value: 'developpement', label: 'Développement web' },
  { value: 'gestion-projet', label: 'Gestion de projet' },
]

const levels = [
  { value: 'debutant', label: 'Débutant curieux' },
  { value: 'intermediaire', label: 'Intermédiaire' },
  { value: 'avance', label: 'Avancé' },
]

const availability = [
  { value: 'temps-partiel', label: 'Temps partiel' },
  { value: 'temps-plein', label: 'Temps plein' },
  { value: 'flexible', label: 'Flexible' },
]

const durations = [
  { value: '4-8-semaines', label: '4 à 8 semaines' },
  { value: '2-3-mois', label: '2 à 3 mois' },
  { value: '3-6-mois', label: '3 à 6 mois' },
  { value: 'a-definir', label: 'À définir' },
]

function FormSection({ number, title, children }) {
  return (
    <section className="border-b border-black/25 pb-8 last:border-b-0 last:pb-0">
      <h2 className="mb-7 text-2xl font-semibold leading-none text-black">
        <span className="font-medium">{number}</span> | {title}
      </h2>
      {children}
    </section>
  )
}

export default function InternshipForm() {
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    setStatus('Merci. Votre candidature stagiaire est prête à être révisée.')
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <FormSection number="01" title="Votre profil">
        <div className="grid gap-6 md:grid-cols-2">
          <TextInput
            label="Nom complet"
            name="name"
            autoComplete="name"
            placeholder="Votre nom"
            required
          />
          <TextInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.com"
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
            placeholder="Nom de l’école et programme d’études"
            required
          />
        </div>
      </FormSection>

      <FormSection number="02" title="Votre stage">
        <div className="grid gap-6 md:grid-cols-2">
          <DropdownField
            label="Centre d’intérêt"
            name="interest"
            placeholder="Choisir un domaine"
            options={interests}
            required
          />
          <DropdownField
            label="Niveau"
            name="level"
            placeholder="Choisir un niveau"
            options={levels}
            required
          />
          <DropdownField
            label="Disponibilité"
            name="availability"
            placeholder="Choisir une disponibilité"
            options={availability}
            required
          />
          <DropdownField
            label="Durée souhaitée"
            name="duration"
            placeholder="Choisir une durée"
            options={durations}
            required
          />
        </div>
      </FormSection>

      <FormSection number="03" title="Votre motivation">
        <div className="grid gap-6 md:grid-cols-2">
          <TextInput
            label="Portfolio / CV"
            name="portfolio"
            type="url"
            placeholder="Lien vers CV, portfolio ou LinkedIn"
          />
          <TextInput
            label="Date de début"
            name="startDate"
            type="text"
            placeholder="Ex: septembre, dès maintenant"
          />
          <TextArea
            className="md:col-span-2"
            label="Pourquoi TMG"
            name="motivation"
            placeholder="Expliquez ce que vous voulez apprendre et pourquoi ce stage vous intéresse."
            required
          />
          <TextArea
            className="md:col-span-2"
            label="Compétences à pratiquer"
            name="skills"
            placeholder="Marketing, design, contenu, développement, outils, recherche, stratégie..."
            rows={4}
            required
          />
          <TextArea
            className="md:col-span-2"
            label="Message"
            name="message"
            placeholder="Ajoutez les contraintes d’horaire, objectifs scolaires ou détails utiles."
            rows={4}
          />
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button type="submit" className="w-full sm:w-auto">
            Envoyer la candidature
          </Button>
          <p className="text-sm leading-6 text-black/60" aria-live="polite">
            {status || 'Ce formulaire est réservé aux candidatures de stage.'}
          </p>
        </div>
      </FormSection>
    </form>
  )
}
