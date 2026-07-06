import { useState } from 'react'
import Button from '../ui/Button'
import DropdownField from './DropdownField'
import TextArea from './TextArea'
import TextInput from './TextInput'

const budgets = [
  { value: 'moins-1000', label: 'Moins de 1 000 $' },
  { value: '1000-3000', label: '1 000 $ - 3 000 $' },
  { value: '3000-7000', label: '3 000 $ - 7 000 $' },
  { value: '7000-15000', label: '7 000 $ - 15 000 $' },
  { value: '15000-plus', label: '15 000 $ et plus' },
  { value: 'a-definir', label: 'À définir ensemble' },
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
    setStatus('Merci. Votre demande est prête; on vous recontacte rapidement.')
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <FormSection number="01" title="Parlez-nous de votre projet">
        <div className="grid gap-6 md:grid-cols-2">
          <TextInput
            label="Votre nom"
            name="name"
            autoComplete="name"
            placeholder="Votre nom"
            required
          />
          <TextInput
            label="Votre courriel"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Votre courriel"
            required
          />
          <TextInput
            label="Votre téléphone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Votre téléphone"
            required
          />
          <TextInput
            label="Votre entreprise"
            name="company"
            autoComplete="organization"
            placeholder="Votre entreprise"
            required
          />
          <DropdownField
            className="md:col-span-2"
            label="Votre budget marketing annuel"
            name="annualMarketingBudget"
            placeholder="Choisir un budget"
            options={budgets}
            required
          />
          <TextArea
            className="md:col-span-2"
            label="Brève description de votre projet"
            name="projectDescription"
            placeholder="Brève description de votre projet"
            rows={5}
          />
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button type="submit" className="w-full sm:w-auto">
            Envoyer la demande
          </Button>
          <p className="text-sm leading-6 text-black/60" aria-live="polite">
            {status || 'Réponse sous 1 à 2 jours ouvrables.'}
          </p>
        </div>
      </FormSection>
    </form>
  )
}
