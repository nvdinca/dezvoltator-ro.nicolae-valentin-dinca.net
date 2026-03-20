export default function Home() {
  return (
    <main className="flex flex-1 bg-zinc-50">
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 md:grid-cols-2">
        <div className="space-y-5">
          <p className="text-sm font-medium uppercase tracking-widest text-black/60">
            MVP - Ziua 1
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-black">
            Fundatie proiect portofoliu imobiliar
          </h1>
          <p className="text-base leading-7 text-black/70">
            Aplicatia Next.js este configurata si pregatita pentru urmatorii pasi:
            landing page ansamblu, pagina apartament si campanii de conversie.
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Urmatorii pasi</h2>
          <ul className="space-y-3 text-sm text-black/70">
            <li>1. Construim sectiunile landing page-ului principal</li>
            <li>2. Adaugam ruta pentru pagina unui apartament</li>
            <li>3. Implementam formularul de lead + endpoint API</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
