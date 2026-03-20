import Link from "next/link";
import { campaigns } from "@/lib/data/campaigns";

export function CampaignShowcase() {
  return (
    <section className="bg-zinc-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-18 md:py-24">
        <p className="text-xs font-semibold tracking-[0.2em] text-black/45 uppercase">
          Campanii demo
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          Structura pagini campanii
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-black/70">
          Template-uri rapide, optimizate pentru conversii, cu formular simplu si
          call-to-action clar.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {campaigns.map((campaign) => (
            <article
              key={campaign.slug}
              className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm"
            >
              <h3 className="text-2xl font-semibold tracking-tight">
                {campaign.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-black/70 md:text-base">
                {campaign.subtitle}
              </p>
              <p className="mt-4 inline-flex rounded-full border border-black/15 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black/65">
                {campaign.offerLabel}
              </p>

              <Link
                href={`/campanii/${campaign.slug}`}
                className="mt-6 inline-flex rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Vezi pagina campaniei
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
