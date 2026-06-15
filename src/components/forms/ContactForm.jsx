import { useState } from 'react'
import Button from '../ui/Button'
import DropdownField from './DropdownField'
import TextArea from './TextArea'
import TextInput from './TextInput'

const websiteTypes = [
  { value: 'one-pager', label: 'One-pager' },
  { value: 'site-complet', label: 'Site complet' },
  { value: 'croissance', label: 'Croissance web' },
  { value: 'refonte', label: 'Refonte d un site existant' },
]

const goals = [
  { value: 'leads', label: 'Generer des leads qualifies' },
  { value: 'ventes', label: 'Vendre une offre ou un service' },
  { value: 'credibilite', label: 'Renforcer la credibilite' },
  { value: 'communaute', label: 'Mobiliser une communaute' },
]

const budgets = [
  { value: 'moins-1000', label: 'Moins de 1000 $' },
  { value: '1000-3000', label: '1000 $ - 3000 $' },
  { value: '3000-7000', label: '3000 $ - 7000 $' },
  { value: '7000-plus', label: '7000 $ et plus' },
]

const timelines = [
  { value: 'maintenant', label: 'Maintenant' },
  { value: 'ce-mois', label: 'Ce mois-ci' },
  { value: '1-3-mois', label: 'Dans 1 a 3 mois' },
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

export default function ContactForm() {
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    setStatus('Merci. Votre demande est prete; on vous recontacte rapidement.')
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <FormSection number="01" title="Votre projet">
        <div className="grid gap-6 md:grid-cols-2">
          <DropdownField
            label="Type de site"
            name="websiteType"
            placeholder="Choisir un type"
            options={websiteTypes}
            required
          />
          <DropdownField
            label="Objectif principal"
            name="goal"
            placeholder="Choisir un objectif"
            options={goals}
            required
          />
          <DropdownField
            label="Budget"
            name="budget"
            placeholder="Choisir un budget"
            options={budgets}
            required
          />
          <DropdownField
            label="Depart souhaite"
            name="timeline"
            placeholder="Choisir un moment"
            options={timelines}
            required
          />
        </div>
      </FormSection>

      <FormSection number="02" title="Votre organisation">
        <div className="grid gap-6 md:grid-cols-2">
          <TextInput
            label="Secteur"
            name="industry"
            placeholder="Ex: restauration, OBNL, services"
            required
          />
          <TextInput
            label="Site web / social"
            name="website"
            type="url"
            placeholder="https://..."
          />
          <TextArea
            className="md:col-span-2"
            label="Expliquez votre activite"
            name="business"
            placeholder="Dites-nous ce que vous faites, qui vous aidez et ce qui doit changer."
            required
          />
        </div>
      </FormSection>

      <FormSection number="03" title="Vos informations">
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
            label="Entreprise"
            name="company"
            autoComplete="organization"
            placeholder="Optionnel"
          />
          <TextArea
            className="md:col-span-2"
            label="Message"
            name="message"
            placeholder="Ajoutez les details utiles, les contraintes ou les questions."
            rows={5}
          />
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button type="submit" className="w-full sm:w-auto">
            Envoyer la demande
          </Button>
          <p className="text-sm leading-6 text-black/60" aria-live="polite">
            {status || 'Reponse sous 1 a 2 jours ouvrables.'}
          </p>
        </div>
      </FormSection>
    </form>
  )
}
