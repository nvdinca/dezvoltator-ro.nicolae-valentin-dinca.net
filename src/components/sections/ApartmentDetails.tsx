import Link from "next/link";
import type { Apartment } from "@/lib/data/apartments";

function formatPrice(value: number) {
  return new Intl.NumberFormat("ro-RO").format(value);
}

export function ApartmentDetails({ apartment }: { apartment: Apartment }) {
  const statusStyles: Record<Apartment["availability"], string> = {
    disponibil: "bg-emerald-100 text-emerald-800",
    rezervat: "bg-amber-100 text-amber-800",
    vandut: "bg-rose-100 text-rose-800",
  };

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold tracking-[0.2em] text-black/45 uppercase">
          Unitate disponibila
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${statusStyles[apartment.availability]}`}
        >
          {apartment.availability}
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        {apartment.title}
      </h1>
      <p className="mt-3 text-base leading-7 text-black/70">
        {apartment.shortDescription}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-zinc-50 p-4">
          <p className="text-xs text-black/55 uppercase">Pret</p>
          <p className="mt-1 text-xl font-semibold">
            {formatPrice(apartment.priceEur)} EUR
          </p>
        </div>
        <div className="rounded-lg bg-zinc-50 p-4">
          <p className="text-xs text-black/55 uppercase">Camere</p>
          <p className="mt-1 text-xl font-semibold">{apartment.rooms}</p>
        </div>
        <div className="rounded-lg bg-zinc-50 p-4">
          <p className="text-xs text-black/55 uppercase">Suprafata utila</p>
          <p className="mt-1 text-xl font-semibold">{apartment.areaUseful} mp</p>
        </div>
        <div className="rounded-lg bg-zinc-50 p-4">
          <p className="text-xs text-black/55 uppercase">Suprafata construita</p>
          <p className="mt-1 text-xl font-semibold">{apartment.areaBuilt} mp</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/#contact"
          className="rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Programeaza vizionare
        </Link>
        <span className="text-sm text-black/60">Etaj {apartment.floor}</span>
      </div>
    </section>
  );
}
