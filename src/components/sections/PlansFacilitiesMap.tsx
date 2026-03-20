const facilities = [
  "Parcare subterana",
  "Spatii verzi amenajate",
  "Supraveghere video 24/7",
  "Zona fitness si relaxare",
];

export function PlansFacilitiesMap() {
  return (
    <section id="apartamente" className="bg-zinc-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-18 md:py-24">
        <p className="text-xs font-semibold tracking-[0.2em] text-black/45 uppercase">
          Functionalitati cheie
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black md:text-5xl">
          Planuri, facilitati, harta
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-semibold">Planuri 2D / 3D</h3>
            <p className="mt-3 text-sm leading-7 text-black/70 md:text-base">
              Sectiune dedicata pentru evidentierea tipologiilor de apartamente
              si a distributiei spatiului interior.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="group relative overflow-hidden rounded-xl border border-black/10 p-5 text-sm font-semibold">
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: 'url("/images/plans/plan-2-camere.webp")',
                  }}
                />
                <div className="absolute inset-0 bg-white/78" />
                <span className="relative">Plan 2 camere</span>
              </div>
              <div className="group relative overflow-hidden rounded-xl border border-black/10 p-5 text-sm font-semibold">
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: 'url("/images/plans/plan-3-camere.webp")',
                  }}
                />
                <div className="absolute inset-0 bg-white/78" />
                <span className="relative">Plan 3 camere</span>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-semibold">Facilitati</h3>
            <ul className="mt-5 space-y-3 text-sm text-black/75 md:text-base">
              {facilities.map((facility) => (
                <li
                  key={facility}
                  className="rounded-lg border border-black/10 bg-zinc-100 px-4 py-2.5"
                >
                  {facility}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <article className="mt-8 rounded-2xl border border-black/10 bg-white p-7 shadow-sm">
          <h3 className="text-2xl font-semibold">Harta si amplasare</h3>
          <p className="mt-3 text-sm leading-7 text-black/70 md:text-base">
            Pozitionare centrala, conectivitate excelenta si acces rapid la
            punctele de interes.
          </p>
          <div className="relative mt-5 overflow-hidden rounded-xl border border-black/10 p-7">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("/images/map/project-location.webp")',
              }}
            />
            <div className="absolute inset-0 bg-white/84" />
            <p className="relative text-sm font-medium text-black/70 md:text-base">
              Preview locatie proiect. La integrarea finala, aceasta zona va
              include harta interactiva cu puncte de interes (Mapbox/Google Maps).
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
