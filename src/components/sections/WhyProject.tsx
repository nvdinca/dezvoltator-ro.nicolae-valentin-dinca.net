const reasons = [
  {
    title: "Locatie strategica",
    description:
      "Acces rapid la puncte cheie din oras, transport si servicii esentiale.",
  },
  {
    title: "Design orientat pe confort",
    description:
      "Compartimentari eficiente, materiale premium si lumina naturala abundenta.",
  },
  {
    title: "Investitie sustenabila",
    description:
      "Proiect gandit pentru valoare pe termen lung, atat pentru locuire, cat si pentru inchiriere.",
  },
];

export function WhyProject() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-18 md:py-24">
        <p className="text-xs font-semibold tracking-[0.2em] text-black/45 uppercase">
          Pozitionare proiect
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black md:text-5xl">
          De ce acest proiect?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-black/70 md:text-lg">
          Structura este gandita pentru dezvoltatori care doresc sa prezinte clar
          diferentiatorii proiectului si sa creasca increderea potentialilor
          clienti inca din primul scroll.
        </p>
        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="rounded-2xl border border-black/10 bg-zinc-50/80 p-7 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-black md:text-xl">{reason.title}</h3>
              <p className="mt-3 text-sm leading-7 text-black/70 md:text-base">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
