"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Apartment } from "@/lib/data/apartments";

function formatPrice(value: number) {
  return new Intl.NumberFormat("ro-RO").format(value);
}

export function ApartmentShowcase({ apartments }: { apartments: Apartment[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const roomsFilter = searchParams.get("rooms") ?? "all";
  const statusFilter = searchParams.get("status") ?? "all";
  const maxPriceFilter = searchParams.get("maxPrice") ?? "all";
  const minAreaFilter = searchParams.get("minArea") ?? "all";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function resetFilters() {
    router.replace(pathname, { scroll: false });
  }

  const filteredApartments = useMemo(() => {
    return apartments.filter((apartment) => {
      const roomsMatch =
        roomsFilter === "all" || apartment.rooms === Number(roomsFilter);
      const statusMatch =
        statusFilter === "all" || apartment.availability === statusFilter;
      const priceMatch =
        maxPriceFilter === "all" || apartment.priceEur <= Number(maxPriceFilter);
      const areaMatch =
        minAreaFilter === "all" || apartment.areaUseful >= Number(minAreaFilter);

      return roomsMatch && statusMatch && priceMatch && areaMatch;
    });
  }, [apartments, roomsFilter, statusFilter, maxPriceFilter, minAreaFilter]);

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-18 md:py-24">
        <p className="text-xs font-semibold tracking-[0.2em] text-black/45 uppercase">
          Unitati demo
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          Pagini apartamente disponibile
        </h2>
        <div className="mt-6 grid gap-3 rounded-xl border border-black/10 bg-zinc-50 p-4 md:grid-cols-4">
          <select
            value={roomsFilter}
            onChange={(event) => updateFilter("rooms", event.target.value)}
            className="rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-black/30"
          >
            <option value="all">Camere: toate</option>
            <option value="2">2 camere</option>
            <option value="3">3 camere</option>
            <option value="4">4 camere</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => updateFilter("status", event.target.value)}
            className="rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-black/30"
          >
            <option value="all">Status: toate</option>
            <option value="disponibil">Disponibil</option>
            <option value="rezervat">Rezervat</option>
            <option value="vandut">Vândut</option>
          </select>

          <select
            value={maxPriceFilter}
            onChange={(event) => updateFilter("maxPrice", event.target.value)}
            className="rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-black/30"
          >
            <option value="all">Preț maxim: fără limită</option>
            <option value="130000">Până la 130.000 EUR</option>
            <option value="170000">Până la 170.000 EUR</option>
            <option value="190000">Până la 190.000 EUR</option>
          </select>

          <select
            value={minAreaFilter}
            onChange={(event) => updateFilter("minArea", event.target.value)}
            className="rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-black/30"
          >
            <option value="all">Suprafață utilă: orice</option>
            <option value="55">Minim 55 mp</option>
            <option value="70">Minim 70 mp</option>
            <option value="80">Minim 80 mp</option>
          </select>
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm font-medium text-black/75 transition hover:bg-zinc-100 md:col-span-4"
          >
            Reset filtre
          </button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {filteredApartments.map((apartment) => (
            <article
              key={apartment.slug}
              className="rounded-2xl border border-black/10 bg-zinc-50 p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{apartment.title}</h3>
              <p className="mt-2 text-sm text-black/65">
                {apartment.rooms} camere • {apartment.areaUseful} mp utili
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-black/55">
                Status: {apartment.availability}
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
        {filteredApartments.length === 0 ? (
          <p className="mt-6 rounded-lg border border-black/10 bg-zinc-50 px-4 py-3 text-sm text-black/65">
            Nu există apartamente care să corespundă filtrării selectate.
          </p>
        ) : null}
      </div>
    </section>
  );
}
