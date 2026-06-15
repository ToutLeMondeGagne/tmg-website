import { useState } from 'react'
import Button from '../ui/Button'
import DropdownField from './DropdownField'
import TextArea from './TextArea'
import TextInput from './TextInput'

const interests = [
  { value: 'marketing', label: 'Marketing numerique' },
  { value: 'design', label: 'Design / experience utilisateur' },
  { value: 'contenu', label: 'Creation de contenu' },
  { value: 'developpement', label: 'Developpement web' },
  { value: 'gestion-projet', label: 'Gestion de projet' },
]

const levels = [
  { value: 'debutant', label: 'Debutant curieux' },
  { value: 'intermediaire', label: 'Intermediaire' },
  { value: 'avance', label: 'Avance' },
]

const availability = [
  { value: 'temps-partiel', label: 'Temps partiel' },
  { value: 'temps-plein', label: 'Temps plein' },
  { value: 'flexible', label: 'Flexible' },
]

const durations = [
  { value: '4-8-semaines', label: '4 a 8 semaines' },
  { value: '2-3-mois', label: '2 a 3 mois' },
  { value: '3-6-mois', label: '3 a 6 mois' },
  { value: 'a-definir', label: 'A definir' },
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
    setStatus('Merci. Votre candidature stagiaire est prete a etre revisee.')
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
            label="Telephone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Optionnel"
          />
          <TextInput
            label="Ville"
            name="city"
            autoComplete="address-level2"
            placeholder="Montreal, Laval, etc."
          />
          <TextInput
            className="md:col-span-2"
            label="Ecole / programme"
            name="program"
            placeholder="Nom de l ecole et programme d etudes"
            required
          />
        </div>
      </FormSection>

      <FormSection number="02" title="Votre stage">
        <div className="grid gap-6 md:grid-cols-2">
          <DropdownField
            label="Centre d interet"
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
            label="Disponibilite"
            name="availability"
            placeholder="Choisir une disponibilite"
            options={availability}
            required
          />
          <DropdownField
            label="Duree souhaitee"
            name="duration"
            placeholder="Choisir une duree"
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
            label="Date de debut"
            name="startDate"
            type="text"
            placeholder="Ex: septembre, des maintenant"
          />
          <TextArea
            className="md:col-span-2"
            label="Pourquoi TMG"
            name="motivation"
            placeholder="Expliquez ce que vous voulez apprendre et pourquoi ce stage vous interesse."
            required
          />
          <TextArea
            className="md:col-span-2"
            label="Competences a pratiquer"
            name="skills"
            placeholder="Marketing, design, contenu, developpement, outils, recherche, strategie..."
            rows={4}
            required
          />
          <TextArea
            className="md:col-span-2"
            label="Message"
            name="message"
            placeholder="Ajoutez les contraintes d horaire, objectifs scolaires ou details utiles."
            rows={4}
          />
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button type="submit" className="w-full sm:w-auto">
            Envoyer la candidature
          </Button>
          <p className="text-sm leading-6 text-black/60" aria-live="polite">
            {status || 'Ce formulaire est reserve aux candidatures de stage.'}
          </p>
        </div>
      </FormSection>
    </form>
  )
}
