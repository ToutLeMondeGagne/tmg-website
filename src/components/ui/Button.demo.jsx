import Button from './Button'

export default function ButtonDemo() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-12 text-left">
      <div>
        <h1 className="text-3xl font-semibold text-black">Button</h1>
        <p className="mt-2 text-neutral-600">Variantes disponibles</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Lancer un projet</Button>
        <Button variant="secondary">En savoir plus</Button>
        <Button variant="outline">Voir les services</Button>
        <Button variant="ghost">Bouton discret</Button>
        <Button href="/contact">Contact</Button>
      </div>
    </main>
  )
}
