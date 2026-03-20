import Link from "next/link";
import { apartments } from "@/lib/data/apartments";

function formatPrice(value: number) {
  return new Intl.NumberFormat("ro-RO").format(value);
}

export function ApartmentShowcase() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-18 md:py-24">
        <p className="text-xs font-semibold tracking-[0.2em] text-black/45 uppercase">
          Unitati demo
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          Pagini apartamente disponibile
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {apartments.map((apartment) => (
            <article
              key={apartment.slug}
              className="rounded-2xl border border-black/10 bg-zinc-50 p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{apartment.title}</h3>
              <p className="mt-2 text-sm text-black/65">
                {apartment.rooms} camere • {apartment.areaUseful} mp utili
              </p>
              <p className="mt-3 text-lg font-semibold">
                {formatPrice(apartment.priceEur)} EUR
              </p>
              <Link
                href={`/apartamente/${apartment.slug}`}
                className="mt-5 inline-flex rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Vezi apartamentul
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
