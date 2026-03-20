"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/analytics/track";

const heroImages = [
  {
    label: "Randare exterioara",
    url: "/images/hero/variants/hero-01-1200.webp",
    quality: 78,
  },
  {
    label: "Zona verde privata",
    url: "/images/hero/variants/hero-02-1200.webp",
    quality: 76,
  },
  {
    label: "Interior premium",
    url: "/images/hero/variants/hero-03-800.webp",
    quality: 74,
  },
  {
    label: "Spatii comune",
    url: "/images/hero/variants/hero-04-800.webp",
    quality: 72,
  },
];

export function HeroProject() {
  return (
    <section
      id="proiect"
      className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-900 text-white"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-18 md:grid-cols-2 md:py-26">
        <div className="space-y-7">
          <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
            Ansamblu rezidential premium
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Locuinte moderne pentru stilul de viata urban
          </h1>
          <p className="max-w-xl text-base leading-8 text-white/80 md:text-lg">
            Pagina de prezentare este construita pentru dezvoltatori imobiliari
            care vor un mix clar de impact vizual, informatie utila si conversie
            rapida in lead-uri calificate.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#contact"
              onClick={() =>
                trackEvent("cta_primary_click", {
                  location: "hero",
                  cta: "Programeaza o discutie",
                })
              }
              className="rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-black/25 transition hover:bg-zinc-200"
            >
              Programeaza o discutie
            </a>
            <a
              href="#apartamente"
              onClick={() =>
                trackEvent("cta_secondary_click", {
                  location: "hero",
                  cta: "Vezi planuri si facilitati",
                })
              }
              className="rounded-md border border-white/35 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Vezi planuri si facilitati
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {heroImages.map((image, index) => (
            <div
              key={image.label}
              className="group relative h-44 overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/30 sm:h-56"
            >
              <Image
                src={image.url}
                alt={image.label}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
                priority={index === 0}
                quality={image.quality}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/15" />
              <p className="absolute bottom-3 left-3 text-sm font-medium text-white/90">
                {image.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
